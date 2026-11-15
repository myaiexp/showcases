// Vizzu example: chart.feature('logging', true) makes the library write to the browser console
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Logging is switched on in this view: watch the browser console.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // Logging goes to the console, so only the full view turns it on, and cleanup turns it off again.
  const pre = stage.side();
  if (pre) {
    const report = (on: boolean): void => {
      pre.textContent = [
        `chart.feature('logging', ${on})`,
        '',
        'Open the browser console while the story plays.',
        '',
        'In the vizzu 0.18.0 npm build this gallery loads,',
        'the console stayed empty with logging on: the',
        'switch is there, but the build writes no lines.',
      ].join('\n');
    };
    chart.feature('logging', true);
    report(true);
    stage.onDispose(() => {
      chart.feature('logging', false);
    });
    stage.button('Logging off', () => {
      chart.feature('logging', false);
      report(false);
    });
    stage.button('Logging on', () => {
      chart.feature('logging', true);
      report(true);
    });
  }

  await chart.animate({
    data: musicData,
    config: {
      title: stage.preview ? 'Logging is on in the full view only' : 'Logging on: see the console',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'Kinds side by side, with logging on in the full view',
      run: (c) => c.animate({ config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }),
    },
    {
      say: 'Stacked again',
      run: (c) => c.animate({ config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
