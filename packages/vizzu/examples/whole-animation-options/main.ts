// Vizzu example: options.duration and options.easing apply to the animation as a whole
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const toGrouped = { config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } };
  const toStacked = { config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } };

  await chart.animate({
    data: musicData,
    config: {
      title: 'Custom options for the whole animation',
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
      say: 'duration: 4, easing: "linear"',
      run: (c) => c.animate(toGrouped, { duration: 4, easing: 'linear' }),
    },
    { say: 'duration: 0.5', run: (c) => c.animate(toStacked, { duration: 0.5 }) },
  ]);
  return () => stage.dispose();
};

export default mount;
