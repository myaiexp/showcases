// Vizzu example: set with null on x and two series on y makes one stacked column
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
    config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] } } },
  });

  stage.story(chart, [
    {
      say: 'x: set null, y: set Genres and Popularity',
      run: (c) =>
        c.animate({
          config: {
            channels: {
              x: { set: null },
              y: { set: ['Genres', 'Popularity'] },
            },
          },
        }),
      hold: 2200,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
