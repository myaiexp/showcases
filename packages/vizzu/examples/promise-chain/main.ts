// Vizzu example: animate() returns a promise, so states chain with .then()
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
      say: 'Three animate() calls chained: stacked, grouped, plain columns',
      run: (c) =>
        // Each .then() runs only after the previous animation has completed.
        c
          .animate({
            config: {
              channels: { y: { set: ['Popularity', 'Kinds'] }, color: { set: ['Kinds'] } },
            },
          })
          .then(() => {
            stage.say('Stacked is done, so .then() starts the grouped state');
            return c.animate({
              config: { channels: { y: { set: ['Popularity'] }, x: { set: ['Genres', 'Kinds'] } } },
            });
          })
          .then(() => {
            stage.say('Grouped is done, so the last .then() goes back to plain columns');
            return c.animate({
              config: { channels: { x: { set: ['Genres'] }, y: { set: ['Popularity'] }, color: { set: null } } },
            });
          }),
      hold: 1800,
    },
  ]);
  return () => stage.dispose();
};

export default mount;

