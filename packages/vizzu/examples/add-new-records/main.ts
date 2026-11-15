// Vizzu example: data.records adds records to a chart that is already showing data
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate({
    data: { ...musicData, filter: (record) => record.Genres !== 'Soul' },
    config: {
      title: 'Adding new records',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  // Records added to a chart stay in it, and the story's rewind only restores config, style
  // and the data filter. So the records are added once per mount; the story rewinds to a
  // filter that hides Soul, and later passes only switch that filter off. The data stays at
  // 15 records however long the page is open.
  let added = false;
  stage.story(chart, [
    {
      say: 'Add three Soul records and switch the filter off',
      run: (c) => {
        if (added) return c.animate({ data: { filter: null } });
        added = true;
        return c.animate({
          data: {
            filter: null,
            records: [
              ['Soul', 'Hard', 91],
              ['Soul', 'Smooth', 57],
              ['Soul', 'Experimental', 115],
            ],
          },
        });
      },
      hold: 3000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
