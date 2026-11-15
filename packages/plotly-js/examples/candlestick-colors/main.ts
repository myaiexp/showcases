// Candlestick colours: increasing.line.color and decreasing.line.color
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

// The docs use black and red; black vanishes on a dark page, so white stands in for it.
const PALETTES: Record<string, [string, string]> = {
  'white / red': ['#e6e8ee', 'red'],
  'green / red': ['#34d399', '#fb7185'],
  'cyan / grey': ['#17BECF', '#7F7F7F'],
  'gold / violet': ['#facc15', '#a78bfa'],
};

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [{ x: d.x, open: d.open, high: d.high, low: d.low, close: d.close, increasing: { line: { color: '#e6e8ee' } }, decreasing: { line: { color: 'red' } }, type: 'candlestick', xaxis: 'x', yaxis: 'y' }],
    {
      template: stage.template,
      dragmode: 'zoom',
      showlegend: false,
      xaxis: { title: { text: stage.preview ? '' : 'Date' }, range: ['2016-06-01 12:00', '2017-01-01 12:00'], rangeslider: { visible: false } },
      yaxis: { autorange: true },
    },
    stage.config,
  );

  const paint = (name: string): void => {
    const [up, down] = PALETTES[name] ?? ['#e6e8ee', 'red'];
    void Plotly.restyle(stage.div, { 'increasing.line.color': up, 'decreasing.line.color': down });
  };
  if (stage.bar) select(stage.bar, 'colours (up / down)', Object.keys(PALETTES), 'white / red', paint);
  else stage.every(1300, (i) => paint(Object.keys(PALETTES)[i % 4] ?? ''));

  return () => stage.dispose();
};

export default mount;
