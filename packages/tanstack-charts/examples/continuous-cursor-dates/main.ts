// continuousCursor with a Date x value: labels format the date under the pointer
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { continuousCursor, type ContinuousCursorChange, type ContinuousCursorPosition } from '@tanstack/charts/interaction/cursor';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { trail, visit } from '../../shared/interact-drive.ts';
import { traffic } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

type Position = ContinuousCursorPosition<Date, number>;
type Change = ContinuousCursorChange<Date, number>;
const rows = traffic.filter((r) => r.series === 'Web');
const first = rows[0]!.date;
const last = rows[rows.length - 1]!.date;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move across the months: the label is the date under the pointer.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  show('move over the plot');

  const definition = defineChart({
    marks: [lineY(rows, { x: 'date', y: 'value', key: 'id', points: true })],
    scales: {
      x: { scale: scaleUtc().domain([first, last]) },
      y: { scale: scaleLinear().domain([40, 120]), grid: true, axis: { label: 'Requests (k)' } },
    },
    controls: [
      continuousCursor({
        position: controlledSignal<Position | null, Change>(null, (next) => show(next ? `${next.x.toISOString().slice(0, 10)}  value ${next.y.toFixed(1)}` : 'cursor left the plot')),
        xLabel: { background: '#334155', color: '#f8fafc', format: (d) => d.toISOString().slice(0, 10) },
        yLabel: { background: '#334155', color: '#f8fafc', format: (v) => v.toFixed(0) },
      }),
    ],
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Requests by month with a date cursor' }));
  if (stage.preview) visit(stage, trail((t) => [0.1 + 0.8 * (t < 0.5 ? t * 2 : 2 - t * 2), 0.3 + 0.3 * Math.sin(t * 9)], 48), 130, { target: () => stage.box.querySelector('[data-chart-cursor]') });
  return () => stage.dispose();
};

export default mount;
