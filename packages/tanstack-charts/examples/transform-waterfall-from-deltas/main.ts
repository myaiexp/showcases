// rollingWindow + delta makes the contributions; waterfall turns them into a bridge
import { barY, defineChart, delta, mountChart, rollingWindow, waterfall } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const observations = [100, 112, 108, 121, 117, 130].map((price, i) => ({ year: 2018 + i, price }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each bar is one year-over-year change; the last bar is their sum.' });

  const changes = rollingWindow(observations, {
    orderBy: 'year',
    size: 2,
    partial: false,
    outputs: { delta: { value: 'price', reduce: delta } },
  });
  const bridge = waterfall(changes, { value: 'delta', orderBy: 'year', total: true });
  const definition = defineChart({
    marks: [barY(bridge, { x: (row) => (row.kind === 'total' ? 'Total' : String(row.year)), y1: 'start', y2: 'end', color: 'kind' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Change in price' } } },
    color: { domain: ['increase', 'decrease', 'total'], range: ['#4ade80', '#f87171', '#60a5fa'] },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Year-over-year price changes' }));
  readoutPanel(stage)(tableText(changes, ['year', 'price', 'delta']) + '\n\n' + tableText(bridge, ['year', 'delta', 'start', 'end', 'kind']));
  return () => stage.dispose();
};

export default mount;
