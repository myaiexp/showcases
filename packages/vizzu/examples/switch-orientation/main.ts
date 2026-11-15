// Vizzu example: moving the measure from the y-axis to the x-axis
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
      title: "Switch the orientation = arrange by other axis",
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
      say: "Popularity: off y, onto x",
      run: (c) => c.animate({
        config: {
          channels: { y: { detach: ['Popularity'] }, x: { attach: ['Popularity'] } },
        },
      }),
      hold: 2800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
