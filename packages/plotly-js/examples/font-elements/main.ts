// Fonts set one text element at a time: title, axis titles, ticks, legend, hover label
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const k0 = stage.preview ? 0.6 : 1;
  const sizes = (k: number): Partial<Plotly.Layout> => ({
    title: { text: 'Each element, its own font', font: { family: 'Georgia, serif', size: 24 * k, color: '#f59e0b' } },
    xaxis: {
      title: { text: 'x axis title', font: { family: 'Courier New, monospace', size: 16 * k, color: '#34d399' } },
      tickfont: { family: 'Arial, sans-serif', size: 12 * k, color: '#f472b6' },
    },
    yaxis: {
      title: { text: 'y axis title', font: { family: 'Impact, fantasy', size: 16 * k, color: '#60a5fa' } },
      tickfont: { family: 'Courier New, monospace', size: 14 * k, color: '#a78bfa' },
    },
    legend: { font: { family: 'Georgia, serif', size: 14 * k, color: '#facc15' } },
    hoverlabel: { font: { family: 'Courier New, monospace', size: 14 * k } },
  });

  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3, 4], y: [2, 4, 3, 5], name: 'first', mode: 'lines+markers' },
      { x: [1, 2, 3, 4], y: [4, 2, 4, 1], name: 'second', mode: 'lines+markers' },
    ],
    { template: stage.template, ...sizes(k0) },
    stage.config,
  );

  // One multiplier for every font size, so the whole figure scales together.
  if (stage.bar) slider(stage.bar, 'size multiplier', [0.5, 2, 0.1], 1, (k) => void Plotly.relayout(stage.div, sizes(k) as never));
  else stage.every(900, (i) => void Plotly.relayout(stage.div, sizes(0.45 + 0.2 * (1 + Math.sin(i / 2))) as never));
  return () => stage.dispose();
};

export default mount;
