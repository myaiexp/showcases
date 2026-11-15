// Slider steps are button commands: 'update' shows one trace and retitles the plot
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const FREQS = Array.from({ length: 11 }, (_, i) => i * 0.5);
const x = Array.from({ length: 200 }, (_, i) => (i / 199) * 10);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const steps = FREQS.map((f, i) => ({
    label: f.toFixed(1),
    method: 'update',
    args: [{ visible: FREQS.map((_, k) => k === i) }, { title: { text: `Slider: frequency ${f.toFixed(1)}` } }],
  }));

  await Plotly.newPlot(
    stage.div,
    FREQS.map((f, i) => ({ x, y: x.map((v) => Math.sin(f * v)), type: 'scatter' as const, mode: 'lines' as const, visible: i === 3, line: { color: '#60a5fa', width: 3 } })),
    {
      template: stage.template,
      yaxis: { range: [-1.2, 1.2] },
      title: stage.preview ? undefined : { text: 'Slider: frequency 1.5' },
      margin: stage.preview ? { l: 34, r: 12, t: 10, b: 70 } : { b: 100 },
      sliders: [{ active: 3, pad: { t: stage.preview ? 20 : 40 }, currentvalue: { prefix: 'frequency: ', font: { size: 16, color: '#f59e0b' } }, ticklen: 8, tickwidth: 2, minorticklen: 3, len: 0.9, x: 0.05, steps }],
    } as unknown as Partial<Layout>,
    stage.config,
  );

  if (stage.bar) {
    const bar = stage.bar;
    slider(bar, 'ticklen', [0, 20, 1], 8, (v) => void Plotly.relayout(stage.div, { 'sliders[0].ticklen': v }));
    slider(bar, 'borderwidth', [0, 6, 1], 1, (v) => void Plotly.relayout(stage.div, { 'sliders[0].borderwidth': v }));
    select(bar, 'bgcolor', ['#171a21', '#1e3a5f', '#4a2038'], '#171a21', (v) => void Plotly.relayout(stage.div, { 'sliders[0].bgcolor': v }));
  }
  if (stage.preview) {
    stage.every(500, (i) => {
      const k = (i * 2) % FREQS.length;
      void Plotly.relayout(stage.div, { 'sliders[0].active': k });
      void restyle(stage.div, { visible: FREQS.map((_, j) => j === k) });
    });
  }

  return () => stage.dispose();
};

export default mount;
