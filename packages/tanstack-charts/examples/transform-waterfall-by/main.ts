// waterfall by: a separate bridge and total for each team
import { barY, defineChart, mountChart, waterfall } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const steps = [
  { team: 'Web', step: 'Sales', change: 80 },
  { team: 'Web', step: 'Costs', change: -30 },
  { team: 'Web', step: 'Grants', change: 20 },
  { team: 'Mobile', step: 'Sales', change: 50 },
  { team: 'Mobile', step: 'Costs', change: -45 },
  { team: 'Mobile', step: 'Grants', change: 35 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const bridge = waterfall(steps, { value: 'change', by: 'team', total: true });
  const definition = defineChart({
    marks: [barY(bridge, { x: (row) => `${row.team} ${row.kind === 'total' ? 'total' : row.step}`, y1: 'start', y2: 'end', color: 'kind' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.15), axis: { tickLabels: { rotate: -35 } } },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    color: { domain: ['increase', 'decrease', 'total'], range: ['#4ade80', '#f87171', '#60a5fa'] },
    margin: { bottom: 70 },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Bridges per team' }));
  readoutPanel(stage)(tableText(bridge, ['team', 'step', 'delta', 'start', 'end', 'kind'], 10));
  stage.say("waterfall({ by: 'team', total: true }): each team runs from zero to its own total");
  return () => stage.dispose();
};

export default mount;
