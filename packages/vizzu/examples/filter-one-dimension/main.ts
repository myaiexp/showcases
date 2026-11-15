// Vizzu example: data.filter with a callback on Genres
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The tutorial's setup_c state, written out in full (plus whatever this step starts from).
  await chart.animate({
    data: musicData,
    config: {
      title: 'Filter by one dimension',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'filter: Pop or Metal',
      run: (c) =>
        c.animate({
          data: { filter: (record) => record.Genres === 'Pop' || record.Genres === 'Metal' },
        }),
      hold: 2800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
