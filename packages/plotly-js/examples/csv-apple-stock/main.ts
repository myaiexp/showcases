// d3.csv-style loading: the 2014 Apple stock rows read from CSV text and plotted
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { readout, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['lines', 'lines+markers', 'markers'] as const;

const mount: Mount = async (el, ctx) => {
  // The docs' d3.csv(url, callback) is a request; here the vendored file is imported, so
  // the rows arrive as strings exactly as d3 returns them.
  const rows = await csv('2014_apple_stock.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 400 });
  const x = unpack(rows, 'AAPL_x');
  const y = unpackNum(rows, 'AAPL_y');
  const out = stage.preview ? null : readout(el);
  if (out) out.textContent = `${rows.length} rows; first row ${JSON.stringify(rows[0])}`;

  await Plotly.newPlot(
    stage.div,
    [{ x: stage.preview ? x.slice(0, 2) : x, y: stage.preview ? y.slice(0, 2) : y, line: { color: '#60a5fa' } }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Plotting CSV data from AJAX call' }, xaxis: { range: [x[0]!, x.at(-1)!] }, yaxis: { range: [Math.min(...y) - 2, Math.max(...y) + 2] } },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'mode', MODES, 'lines', (m) => void Plotly.restyle(stage.div, { mode: m }));
  else {
    // The rows "arrive" a few at a time, the way a slow response fills the plot.
    stage.every(80, (i) => {
      const n = Math.min(y.length, 2 + ((i * 6) % (y.length + 40)));
      void Plotly.restyle(stage.div, { x: [x.slice(0, n)], y: [y.slice(0, n)] });
    });
  }
  return () => {
    out?.remove();
    stage.dispose();
  };
};

export default mount;
