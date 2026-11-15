// cursor mode: 'free' on a scatter: crosshair with labels and marker, values read from the controller
import { crosshair, defineChart, dot, mountChart } from '@tanstack/charts';
import { createChartCursor, cursorHost } from '@tanstack/charts/cursor';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { scatter } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(40, 4);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the plot: the cursor is not snapped to any dot.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  show('cursor: none');

  const freeCursor = createChartCursor<number, number>();
  stage.onDispose(
    freeCursor.subscribe(() => {
      const v = freeCursor.getState()?.value;
      show(v ? `cursor x = ${v.x?.toFixed(1)}, y = ${v.y?.toFixed(1)}` : 'cursor: none');
    }),
  );

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', color: 'group', r: 3 }), crosshair({ x: { label: true }, y: { label: true }, marker: true })],
    scales: {
      x: { scale: scaleLinear().domain([0, 100]), axis: { label: 'x' } },
      y: { scale: scaleLinear().domain([0, 100]), grid: true, axis: { label: 'y' } },
    },
    cursor: { use: cursorHost, controller: freeCursor, mode: 'free' },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with a free cursor' }));
  if (stage.preview) stage.ghost((t) => [0.2 + 0.6 * Math.abs(Math.sin(t * 3)), 0.2 + 0.6 * Math.abs(Math.cos(t * 4))]);
  return () => stage.dispose();
};

export default mount;
