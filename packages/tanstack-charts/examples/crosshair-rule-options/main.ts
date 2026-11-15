// crosshair options on a scatter: x and y rules, labels, marker, dash, and a per-axis override
import { crosshair, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { scatter } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(24, 19);
interface Parts {
  x: boolean;
  y: boolean;
  labels: boolean;
  marker: boolean;
  dashed: boolean;
}
const combos: readonly Parts[] = [
  { x: true, y: true, labels: false, marker: false, dashed: false },
  { x: true, y: true, labels: true, marker: false, dashed: false },
  { x: true, y: true, labels: true, marker: true, dashed: true },
  { x: false, y: true, labels: true, marker: true, dashed: false },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a dot and switch the parts of the crosshair.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let parts = combos[1]!;

  const options = () => ({
    definition: defineChart({
      marks: [
        dot(rows, { x: 'x', y: 'y', key: 'id', r: 4, color: 'group' }),
        crosshair({
          // Shared rule options apply to both axes; the y axis object overrides the colour.
          ...(parts.dashed ? { strokeDasharray: '4 4' } : {}),
          strokeOpacity: 0.6,
          x: parts.x ? { label: parts.labels ? { format: (v: number) => `x ${v}` } : false } : false,
          y: parts.y ? { stroke: '#fbbf24', label: parts.labels ? { format: (v: number) => `y ${v}`, offset: 10 } : false } : false,
          marker: parts.marker ? { radius: 6, strokeWidth: 2.5 } : false,
        }),
      ],
      scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      tooltip,
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Scatter with a crosshair',
  });
  const host = stage.own(mountChart(stage.box, options()));

  if (stage.bar) {
    for (const key of ['x', 'y', 'labels', 'marker', 'dashed'] as const) {
      checkbox(stage.bar, key, parts[key], (v) => {
        parts = { ...parts, [key]: v };
        host.update(options());
      });
    }
  } else {
    stage.cycle(combos, 2400, (c) => {
      parts = c;
      host.update(options());
      stage.say(`x ${c.x ? 'on' : 'off'}, y ${c.y ? 'on' : 'off'}${c.labels ? ', labels' : ''}${c.marker ? ', marker' : ''}${c.dashed ? ', dashed' : ''}`);
    });
    stage.ghost((t) => [0.15 + 0.7 * t, 0.3 + 0.4 * Math.abs(Math.sin(t * 5))]);
  }
  return () => stage.dispose();
};

export default mount;
