// xaxis.unifiedhovertitle.text: the header of a unified hover label, d3-time-format inside
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const TITLES = ['<b>%{x|%A, %B %d, %Y}</b>', '%{x|%b %Y}', 'Month %{x|%m} of %{x|%Y}', 'Week %{x|%U}: %{x|%d/%m/%y}'] as const;
const DAYS = ['2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: DAYS, y: [150.25, 165.5, 142.75, 178.9], mode: 'lines+markers', name: 'Stock A', type: 'scatter' },
      { x: DAYS, y: [85.3, 92.15, 88.45, 95.2], mode: 'lines+markers', name: 'Stock B', type: 'scatter' },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Stock Prices with Custom Unified Hover Title' },
      hovermode: 'x unified',
      xaxis: { title: { text: stage.preview ? '' : 'Date' }, unifiedhovertitle: { text: TITLES[0] } },
      yaxis: { title: { text: stage.preview ? '' : 'Price (USD)' }, tickprefix: '$' },
    } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'unifiedhovertitle.text', TITLES, TITLES[0], (v) => void relayout(stage.div, { 'xaxis.unifiedhovertitle.text': v }));
  if (stage.preview) {
    stage.every(1100, (i) => {
      void relayout(stage.div, { 'xaxis.unifiedhovertitle.text': TITLES[i % TITLES.length] });
      Fx.hover(stage.div, { xval: DAYS[(i + 1) % DAYS.length] });
    });
  }
  return () => stage.dispose();
};

export default mount;
