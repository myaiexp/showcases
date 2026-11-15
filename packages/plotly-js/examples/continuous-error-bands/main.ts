// Continuous error bands: two hidden lines filled with tonexty around a line
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { gauss, rng } from '../../shared/stat-data.ts';

const days = Array.from({ length: 50 }, (_, i) => new Date(Date.UTC(2001, 1, 1 + i)).toISOString().slice(0, 10));

/** A wandering measurement with a variable-width band; the docs fill three random series instead. */
function series(seed: number): { lower: number[]; mid: number[]; upper: number[] } {
  const normal = gauss(rng(seed));
  const mid: number[] = [];
  let v = 12;
  for (let i = 0; i < days.length; i++) mid.push((v = Math.min(20, Math.max(4, v + normal() * 1.2))));
  const spread = mid.map((_, i) => 1.5 + 1.2 * Math.abs(Math.sin(i / 7)));
  return { lower: mid.map((m, i) => m - (spread[i] ?? 0)), mid, upper: mid.map((m, i) => m + (spread[i] ?? 0)) };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const s = series(4);

  await Plotly.newPlot(
    stage.div,
    [
      { x: days, y: s.lower, line: { width: 0 }, marker: { color: '#aaa' }, mode: 'lines', name: 'Lower Bound', type: 'scatter' },
      { x: days, y: s.mid, fill: 'tonexty', fillcolor: 'rgba(160, 170, 190, 0.3)', line: { color: 'rgb(31, 119, 180)' }, mode: 'lines', name: 'Measurement', type: 'scatter' },
      { x: days, y: s.upper, fill: 'tonexty', fillcolor: 'rgba(160, 170, 190, 0.3)', line: { width: 0 }, marker: { color: '#aaa' }, mode: 'lines', name: 'Upper Bound', type: 'scatter' },
    ],
    {
      template: stage.template,
      showlegend: false,
      title: { text: stage.preview ? '' : 'Continuous, variable value error bars<br>Notice the hover text!' },
      yaxis: { title: { text: stage.preview ? '' : 'Wind speed (m/s)' } },
    },
    stage.config,
  );

  // Each trace fills to the one before it (tonexty), so the three lines must stay in this order.
  const apply = (seed: number): void => {
    const n = series(seed);
    void Plotly.restyle(stage.div, { y: [n.lower, n.mid, n.upper] });
  };
  if (stage.bar) slider(stage.bar, 'seed', [1, 40, 1], 4, apply);
  else stage.every(1800, (i) => apply(4 + i));

  return () => stage.dispose();
};

export default mount;
