// A free cursor with pin: true: click to fix it in place, click again to clear it
import { crosshair, defineChart, dot, mountChart } from '@tanstack/charts';
import { createChartCursor, cursorHost } from '@tanstack/charts/cursor';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { visit } from '../../shared/interact-drive.ts';
import { scatter } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(30, 12);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the plot to pin the cursor, click again to release it.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  show('cursor: none');

  const freeCursor = createChartCursor<number, number>();
  stage.onDispose(
    freeCursor.subscribe(() => {
      const s = freeCursor.getState();
      show(s ? `${s.pinned ? 'pinned' : 'moving'} (source ${s.source}) at ${s.value?.x?.toFixed(1)}, ${s.value?.y?.toFixed(1)}` : 'cursor: none');
    }),
  );

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', r: 3, fillOpacity: 0.6 }), crosshair({ x: { label: true }, y: { label: true }, marker: true })],
    scales: {
      x: { scale: scaleLinear().domain([0, 100]) },
      y: { scale: scaleLinear().domain([0, 100]), grid: true },
    },
    cursor: { use: cursorHost, controller: freeCursor, mode: 'free', pin: true },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Scatter with a pinnable cursor' }));
  if (stage.bar) button(stage.bar, 'Clear programmatically', () => freeCursor.setState(null));
  else visit(stage, [[0.3, 0.4], [0.3, 0.4], [0.7, 0.6], [0.7, 0.6]], 1400, { click: () => true });
  return () => stage.dispose();
};

export default mount;
