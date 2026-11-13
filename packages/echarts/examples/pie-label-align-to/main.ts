// Outside labels with label.alignTo: none, labelLine (end-aligned) or edge (aligned to the chart sides)
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const data = [
  { name: 'Rent and utilities', value: 1250 },
  { name: 'Groceries', value: 540 },
  { name: 'Transport', value: 210 },
  { name: 'Subscriptions and memberships', value: 95 },
  { name: 'Savings', value: 700 },
  { name: 'Leisure', value: 330 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { alignTo: 'edge', edgeDistance: 10, bleedMargin: 10, distance: 5 };
  const apply = (): void => {
    chart.setOption({
      series: [
        {
          type: 'pie',
          radius: ['30%', '55%'],
          center: ['50%', ctx.preview ? '50%' : '46%'],
          label: {
            position: 'outside',
            formatter: '{b}\n{c}',
            fontSize: ctx.preview ? 10 : 12,
            // 'none': fixed-length guide lines. 'labelLine': text lines up at the end of the guide lines,
            // the shortest horizontal part set by labelLine.length2. 'edge': text lines up near the chart sides.
            alignTo: look.alignTo,
            // alignTo 'edge': gap between the text and the left or right side (pixels or percent).
            edgeDistance: look.edgeDistance,
            // alignTo 'none' or 'labelLine': gap between the text and the side before it is cut with '...'.
            bleedMargin: look.bleedMargin,
            // Gap between the guide line and its text.
            distanceToLabelLine: look.distance,
          },
          labelLine: { length: 12, length2: 20 },
          data,
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    const modes = ['edge', 'labelLine', 'none'];
    let n = 0;
    stop = every(1800, () => {
      n += 1;
      look.alignTo = modes[n % modes.length]!;
      apply();
    });
  } else {
    select(bar!, 'alignTo', ['edge', 'labelLine', 'none'], (v) => { look.alignTo = v; apply(); });
    slider(bar!, 'edgeDistance', [0, 120, 5], look.edgeDistance, (v) => { look.edgeDistance = v; apply(); });
    slider(bar!, 'bleedMargin', [0, 120, 5], look.bleedMargin, (v) => { look.bleedMargin = v; apply(); });
    slider(bar!, 'distanceToLabelLine', [0, 30, 1], look.distance, (v) => { look.distance = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
