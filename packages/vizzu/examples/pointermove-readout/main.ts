// Vizzu example: a pointermove handler prints the marker under the pointer and the pointer position
import Vizzu, { Events } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, {
    hint: 'Move the pointer over the chart: the panel follows it.',
  });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  const pre = stage.side();
  if (pre) pre.textContent = 'pointermove\n\n(move the pointer over the chart)';
  const moveHandler = (event: Events.PointerEvent): void => {
    if (!pre) return;
    const { x, y } = event.detail.position;
    const target = event.target;
    pre.textContent = [
      'pointermove',
      '',
      `position  ${x.toFixed(0)}, ${y.toFixed(0)}`,
      `target    ${target ? target.tagName : '(none)'}`,
      ...(target && 'categories' in target
        ? [`marker    ${JSON.stringify((target as Events.Marker).categories)}`]
        : []),
      ...(target && 'value' in target ? [`value     ${String((target as Events.TextElement).value)}`] : []),
    ].join('\n');
  };
  chart.on('pointermove', moveHandler);

  await chart.animate({
    data: musicData,
    config: {
      title: stage.preview ? 'Needs a pointer: open the full view' : 'Pointer move read-out',
      channels: {
        y: { set: ['Popularity', 'Kinds'] },
        x: { set: ['Genres'] },
        color: { set: ['Kinds'] },
        label: { set: ['Popularity'] },
      },
    },
  });

  // The chart keeps moving between stacked and grouped, so the pointer can follow the markers.
  stage.story(chart, [
    {
      say: stage.preview ? 'Card: no pointer here. The full view reads pointermove' : 'Kinds side by side',
      run: (c) => c.animate({ config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }),
    },
    {
      say: stage.preview ? 'Card: no pointer here. The full view reads pointermove' : 'Kinds stacked again',
      run: (c) => c.animate({ config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
