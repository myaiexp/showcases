// Vizzu example: split: false puts split components back into one stack
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
      title: 'Split stacked values = show side-by-side',
      channels: {
        y: { set: ['Kinds'] },
        x: { set: ['Genres', 'Popularity'], split: true },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'x: split false',
      run: (c) =>
        c.animate({
          config: { title: 'Merge', x: { split: false } },
        }),
      hold: 2800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
