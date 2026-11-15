// An HTML table built from the same rows gives exact values outside the chart
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'The table is not part of the chart: it is plain HTML from the same data.' });
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Monthly revenue', ariaDescription: 'The table under the chart lists every value.' }));
  if (!stage.preview) {
    const table = document.createElement('table');
    table.className = 'tc-readout';
    table.style.borderCollapse = 'collapse';
    const caption = table.createCaption();
    caption.textContent = 'Monthly revenue (USD)';
    const head = table.createTHead().insertRow();
    for (const h of ['Month', 'Revenue']) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = h;
      th.style.textAlign = 'left';
      head.append(th);
    }
    const body = table.createTBody();
    for (const r of revenue) {
      const tr = body.insertRow();
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = r.month;
      th.style.textAlign = 'left';
      tr.append(th, Object.assign(document.createElement('td'), { textContent: r.revenue.toLocaleString('en-US') }));
    }
    stage.root.append(table);
  } else stage.say('chart plus a table of exact values');
  return () => stage.dispose();
};

export default mount;
