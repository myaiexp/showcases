// Vizzu example: coordSystem: 'cartesian' undoes polar
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
      title: "Polar coordinates",
      channels: {
        y: { set: ['Kinds'], range: { min: '-30%' } },
        x: { set: ['Popularity'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
      coordSystem: 'polar',
    },
  });

  stage.story(chart, [
    {
      say: "coordSystem cartesian",
      run: (c) => c.animate({
        config: { title: 'Back to cartesian coordinates', coordSystem: 'cartesian' },
      }),
      hold: 2800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
