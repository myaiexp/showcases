// Vizzu example: a treemap built by emptying x and y and putting dimension and measure on size
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
      title: "Column chart",
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
      say: "x and y empty, Genres and Popularity on size",
      run: (c) => c.animate({
        config: {
          title: 'Treemap',
          channels: {
            y: { set: null },
            x: { set: null },
            size: { attach: ['Genres', 'Popularity'] },
          },
        },
      }),
      hold: 3000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
