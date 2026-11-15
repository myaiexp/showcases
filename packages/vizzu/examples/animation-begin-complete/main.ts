// Vizzu example: animation-begin and animation-complete handlers log every animation
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import { overlay } from '../../shared/overlay.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The full view logs each event in the side panel; the card has a counter in the corner.
  const pre = stage.side();
  const show = overlay(stage.element);
  const log: string[] = [];
  let begun = 0;
  let completed = 0;
  const note = (what: string): void => {
    log.unshift(`${(performance.now() / 1000).toFixed(2)}s  ${what}`);
    log.length = Math.min(log.length, 14);
    if (pre) pre.textContent = `animation events\n\n${log.join('\n')}`;
    show(`begun ${begun}  completed ${completed}`);
  };
  const beginHandler = (): void => {
    begun++;
    note('animation-begin');
  };
  const completeHandler = (): void => {
    completed++;
    note('animation-complete');
  };
  chart.on('animation-begin', beginHandler);
  chart.on('animation-complete', completeHandler);
  note('handlers registered');

  await chart.animate({
    data: musicData,
    config: {
      title: 'Begin and complete events',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });

  stage.story(chart, [
    {
      say: 'Kinds side by side: one animation, one begin and one complete',
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
