// Vizzu example: the constructor's second parameter draws the first state at once
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The second parameter is a chart state: it is applied with a duration of 0.
  const chart = stage.own(
    new Vizzu(stage.element, {
      data: musicData,
      config: {
        channels: { y: { set: ['Popularity'] }, x: { set: ['Genres'] }, color: { set: ['Genres'] } },
        title: 'Drawn by the constructor',
      },
      style: darkStyle,
    }),
  );
  // No animate() call before this: the chart is already on screen.
  await chart.initializing;

  stage.story(chart, [
    {
      say: 'The first state was drawn instantly; this one is animated',
      run: (c) =>
        c.animate({
          config: {
            channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } },
            title: 'Animated by animate()',
          },
        }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
