// boxRows: eager summary and outlier rows, printed beside the chart that draws the same data
import { boxRows, boxY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = groupedObservations({ Low: [20, 5, 40], Mid: [35, 9, 40], High: [50, 15, 40] }, 6);
const prepared = boxRows(rows, { category: 'group', value: 'value' });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  if (!stage.preview) {
    const lines = prepared.map((r) =>
      r.kind === 'summary'
        ? `${r.category.padEnd(5)} q1 ${r.q1.toFixed(1)}  median ${r.median.toFixed(1)}  q3 ${r.q3.toFixed(1)}  whiskers ${r.whiskerLow.toFixed(1)} to ${r.whiskerHigh.toFixed(1)}  n=${r.count}`
        : `${r.category.padEnd(5)} outlier ${r.value.toFixed(1)} (source row ${r.sourceIndexes[0]})`,
    );
    stage.readout().textContent = lines.join('\n');
  }

  const definition = defineChart({
    marks: [boxY(rows, { x: 'group', y: 'value', fill: '#4ade80', fillOpacity: 0.3, stroke: '#4ade80' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.4) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Boxplots drawn from the same data as the readout' }));
  return () => stage.dispose();
};

export default mount;
