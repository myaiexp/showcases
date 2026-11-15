// Vizzu example: config.angle rotates the plot area, an experimental option
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
    data: musicData,
    config: {
      title: 'Polar chart, angle 0',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
      coordSystem: 'polar',
      angle: 0,
    },
  });

  stage.story(chart, [
    {
      say: 'angle: 1 radian',
      run: (c) => c.animate({ config: { title: 'angle: 1 (radians)', angle: 1 } }),
      hold: 2600,
    },
    {
      say: 'angle: back to 0',
      run: (c) => c.animate({ config: { title: 'angle: 0', angle: 0 } }),
      hold: 2000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
