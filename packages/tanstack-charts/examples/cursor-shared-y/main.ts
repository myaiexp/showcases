// Cursor controller with match: 'y': two barX charts follow the same product row
import { barX, crosshair, defineChart, mountChart } from '@tanstack/charts';
import { createChartCursor, cursorHost } from '@tanstack/charts/cursor';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { products } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar in either chart: the same product lights up in both.' });

  const shared = createChartCursor<number, string>();
  const cursor = { use: cursorHost, controller: shared, mode: 'focus' as const, match: 'y' as const };
  const y = { scale: () => scaleBand<string>().padding(0.25) };

  const revenue = defineChart({
    marks: [crosshair({ x: false, y: { band: { fill: '#94a3b8', fillOpacity: 0.2 } } }), barX(products, { x: 'revenue', y: 'product', key: 'id' })],
    scales: { x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue ($k)' } }, y },
    focus: 'nearest-y',
    tooltip,
    cursor,
  });
  const units = defineChart({
    marks: [crosshair({ x: false, y: { band: { fill: '#94a3b8', fillOpacity: 0.2 } } }), barX(products, { x: 'units', y: 'product', key: 'id', fill: '#fb923c' })],
    scales: { x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Units' } }, y },
    focus: 'nearest-y',
    tooltip,
    cursor,
  });

  stage.own(mountChart(stage.box, { definition: revenue, height: stage.height, initialWidth: 420, ariaLabel: 'Revenue by product' }));
  stage.own(mountChart(stage.addBox(), { definition: units, height: stage.height, initialWidth: 420, ariaLabel: 'Units by product' }));
  if (stage.preview) stage.ghost((t) => [0.6, 0.1 + 0.8 * (t < 0.5 ? t * 2 : 2 - t * 2)]);
  return () => stage.dispose();
};

export default mount;
