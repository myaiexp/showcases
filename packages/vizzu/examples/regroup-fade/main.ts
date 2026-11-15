// Vizzu example: regroupStrategy: 'fade' on an animation that swaps one dimension for another
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
      title: 'Changing dimensions with fading',
      channels: {
        y: { set: ['Popularity'] },
        x: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(chart, [
    {
      say: 'x: Kinds out, Genres in, regroupStrategy fade',
      run: (c) =>
        c.animate(
          {
            config: {
              channels: { x: { detach: ['Kinds'], attach: ['Genres'] } },
            },
          },
          { regroupStrategy: 'fade' },
        ),
      hold: 3000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
