// fixedrange per axis: the docs' x-only and both-axes variants plus y-only, one select
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { select } from '../../shared/controls.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['none fixed', 'x fixed', 'y fixed', 'both fixed'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('2014_apple_stock.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 400 });

  await Plotly.newPlot(
    stage.div,
    [{ x: unpack(rows, 'AAPL_x'), y: unpackNum(rows, 'AAPL_y'), type: 'scatter', mode: 'lines' }],
    {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'Plotting CSV data from AJAX call' },
      xaxis: { fixedrange: true },
      yaxis: { fixedrange: false },
      annotations: [{ text: '', xref: 'paper', yref: 'paper', x: 0.02, y: 0.06, xanchor: 'left', showarrow: false, font: { size: stage.preview ? 11 : 14, color: '#f59e0b' } }],
    },
    stage.config,
  );

  const apply = (m: Mode): void => {
    const x = m === 'x fixed' || m === 'both fixed';
    const y = m === 'y fixed' || m === 'both fixed';
    void relayout(stage.div, {
      'xaxis.fixedrange': x,
      'yaxis.fixedrange': y,
      'annotations[0].text': `xaxis.fixedrange: ${x}   yaxis.fixedrange: ${y}`,
    });
  };
  apply('x fixed');
  if (stage.bar) select(stage.bar, 'fixedrange', MODES, 'x fixed', apply);
  // Cards have no pointer to drag with, so they only walk the four settings.
  if (stage.preview) stage.every(1100, (i) => apply(at(MODES, i)));

  return () => stage.dispose();
};

export default mount;
