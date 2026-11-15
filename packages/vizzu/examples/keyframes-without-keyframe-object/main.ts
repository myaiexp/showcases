// Vizzu example: an array of targets is an array of keyframes, with no { target } wrapper
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
      title: "You don't have to use the keyframe object",
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  stage.story(
    chart,
    [
      {
        say: 'Two keyframes in one animate() call, each just a config',
        run: (c) =>
          c.animate([
            {
              // target: {
              x: 'Kinds',
              y: ['Genres', 'Popularity'],
              // }
            },
            {
              // target: {
              x: ['Genres', 'Popularity'],
              y: 'Kinds',
              // }
            },
          ]),
      },
    ],
    { hold: 1200 },
  );
  return () => stage.dispose();
};

export default mount;
