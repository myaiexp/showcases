// Vizzu example: a wheel handler receives the scroll delta over the chart
import Vizzu, { Events } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Scroll the mouse wheel over the chart.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  const pre = stage.side();
  let total = 0;
  let count = 0;
  if (pre) pre.textContent = 'wheel\n\n(scroll over the chart)';
  const wheelHandler = (event: Events.WheelEvent): void => {
    total += event.detail.delta;
    count++;
    if (pre) pre.textContent = `wheel\n\ndelta   ${event.detail.delta}\nevents  ${count}\ntotal   ${total}`;
  };
  chart.on('wheel', wheelHandler);

  await chart.animate({
    data: musicData,
    config: {
      title: stage.preview ? 'Needs a wheel: open the full view' : 'Wheel event read-out',
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
      say: stage.preview ? 'Card: no wheel here. The full view reads wheel deltas' : 'Only Popularity on y',
      run: (c) => c.animate({ config: { channels: { y: { detach: ['Kinds'] }, x: { attach: ['Kinds'] } } } }),
    },
    {
      say: stage.preview ? 'Card: no wheel here. The full view reads wheel deltas' : 'Stacked again',
      run: (c) => c.animate({ config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
