// Vizzu example: control.store() keeps the animation; chart.animate(stored) plays it again
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import type { CAnimation } from 'vizzu';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const toGrouped = { config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } };
  const toStacked = { config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } };
  let stored: CAnimation | null = null;

  await chart.animate({
    data: musicData,
    config: {
      title: 'Store and replay an animation',
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
      say: 'animate() grouped, and control.store() keeps the animation',
      run: (c) => {
        const animation = c.animate(toGrouped, { duration: 2 });
        animation.activated.then((control) => {
          stored = control.store();
        });
        return animation;
      },
    },
    { say: 'stacked again by an ordinary animate()', run: (c) => c.animate(toStacked, { duration: 1 }) },
    {
      say: 'animate(stored) plays the first animation again',
      run: (c) => (stored ? c.animate(stored) : undefined),
      hold: 1500,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
