// Vizzu example: set puts series on the x and y channels, replacing what was there
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
      channels: {
        y: { set: ['Popularity'] },
        x: { set: ['Genres'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'x: set Kinds replaces Genres',
      run: (c) => c.animate({ config: { channels: { x: { set: ['Kinds'] } } } }),
    },
    {
      say: 'x: set Genres and Kinds, both at once',
      run: (c) => c.animate({ config: { channels: { x: { set: ['Genres', 'Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
