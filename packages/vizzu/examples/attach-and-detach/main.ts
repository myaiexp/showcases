// Vizzu example: attach adds a series to a channel, detach removes one
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
    config: { channels: { x: { set: null }, y: { set: ['Genres', 'Popularity'] } } },
  });

  stage.story(chart, [
    {
      say: 'y: detach Popularity, x: attach Popularity',
      run: (c) =>
        c.animate({
          config: {
            channels: {
              y: { detach: ['Popularity'] },
              x: { attach: ['Popularity'] },
            },
          },
        }),
    },
    {
      say: 'color: attach Kinds adds a series without touching the others',
      run: (c) => c.animate({ config: { channels: { color: { attach: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;

