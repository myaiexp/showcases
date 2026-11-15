// continuousCursor: rules, marker and axis labels at an arbitrary position, with preview proposals read back
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { continuousCursor, type ContinuousCursorChange, type ContinuousCursorPosition } from '@tanstack/charts/interaction/cursor';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { trail, visit } from '../../shared/interact-drive.ts';
import { scatter } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

type Position = ContinuousCursorPosition<number, number>;
type Change = ContinuousCursorChange<number, number>;
const rows = scatter(40, 6);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the plot: the cursor is free, not snapped to a dot.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  show('move over the plot');

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', color: 'group', r: 3 })],
    scales: {
      x: { scale: scaleLinear().domain([0, 100]), axis: { label: 'x' } },
      y: { scale: scaleLinear().domain([0, 100]), grid: true, axis: { label: 'y' } },
    },
    controls: [
      continuousCursor({
        position: controlledSignal<Position | null, Change>(null, (next, { reason }) => {
          show(`${reason.type} (${reason.source}, ${reason.cause}): ${next ? `${next.x.toFixed(1)}, ${next.y.toFixed(1)}` : 'null'}`);
        }),
        xLabel: { background: '#334155', color: '#f8fafc', format: (v) => `x ${v.toFixed(1)}` },
        yLabel: { background: '#334155', color: '#f8fafc', format: (v) => `y ${v.toFixed(1)}` },
      }),
    ],
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with a continuous cursor' }));
  if (stage.preview) {
    const path = trail((t) => [0.15 + 0.7 * Math.abs(Math.sin(t * 3)), 0.2 + 0.6 * Math.abs(Math.cos(t * 4))], 48);
    visit(stage, path, 130, { target: () => stage.box.querySelector('[data-chart-cursor]') });
  }
  return () => stage.dispose();
};

export default mount;
