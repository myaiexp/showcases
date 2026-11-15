// Vizzu example: data.filter: null shows every record again
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
    data: {
      ...musicData,
      filter: (record) => (record.Genres === 'Pop' || record.Genres === 'Metal') && record.Kinds === 'Smooth',
    },
    config: {
      title: 'Filter by two dimensions',
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
      say: 'filter: null',
      run: (c) =>
        c.animate({
          config: { title: 'Filter off' },
          data: { filter: null },
        }),
      hold: 2800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
