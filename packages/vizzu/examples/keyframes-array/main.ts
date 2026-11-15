// Vizzu example: animate([{ target, options }, ...]) bundles keyframes into one animation
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
      title: 'Using keyframes',
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
      say: 'two keyframes in one animate() call: 1 s, then 2 s',
      run: (c) =>
        c.animate([
          {
            target: { config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } },
            options: { duration: 1 },
          },
          {
            target: { config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } },
            options: { duration: 2 },
          },
        ]),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
