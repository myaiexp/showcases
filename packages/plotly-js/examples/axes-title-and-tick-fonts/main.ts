// Axis labels: title font, tickfont, tickangle and exponentformat on Apple volume
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const FORMATS = ['none', 'e', 'E', 'power', 'SI', 'B'] as const;

const mount: Mount = async (el, ctx) => {
  const rows = await csv('finance-charts-apple.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });
  const font = { family: 'Arial, sans-serif', size: stage.preview ? 11 : 18, color: '#a6acb8' };
  const tickfont = { family: 'Old Standard TT, serif', size: stage.preview ? 10 : 14, color: '#e6e8ee' };

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter', mode: 'lines', name: 'AAPL Volume', x: unpack(rows, 'Date'), y: unpackNum(rows, 'AAPL.Volume'), line: { color: 'grey' } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Volume of Apple Shares Traded' },
      xaxis: { title: { text: 'AXIS TITLE', font }, showticklabels: true, tickangle: 'auto', tickfont, exponentformat: 'e', showexponent: 'all' },
      yaxis: { title: { text: 'AXIS TITLE', font }, showticklabels: true, tickangle: 45, tickfont, exponentformat: 'e', showexponent: 'all' },
    },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'yaxis.tickangle', [-90, 90, 15], 45, (v) => void relayout(stage.div, { 'yaxis.tickangle': v }));
    select(stage.bar, 'yaxis.exponentformat', FORMATS, 'e', (v) => void relayout(stage.div, { 'yaxis.exponentformat': v }));
  }
  if (stage.preview) {
    stage.every(1300, (i) => void relayout(stage.div, { 'yaxis.tickangle': [45, 0, -45, 90][i % 4], 'yaxis.exponentformat': FORMATS[i % FORMATS.length] }));
  }
  return () => stage.dispose();
};

export default mount;
