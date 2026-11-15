// scattergl in text mode over a heatmap, panned along a long strip with a slider
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const rand = rng(77);
  const n = 250;
  const t = 12;
  const letters = ['A', 'T', 'G', 'C'];
  const x: number[] = [];
  const y: number[] = [];
  const text: string[] = [];
  const z: number[][] = [];
  for (let j = 0; j < t; j++) {
    const row: number[] = [];
    for (let i = 0; i < n; i++) {
      x.push(i);
      y.push(j);
      row.push(Math.floor(rand() * 10));
      text.push(letters[Math.floor(rand() * 4)] as string);
    }
    z.push(row);
  }
  const steps = Array.from({ length: n - 30 }, (_, e) => ({ label: e % 20 === 0 ? String(e) : '', value: String(e), method: 'relayout', args: ['xaxis.range', [-0.5 + e, 30.5 + e]] }));

  await Plotly.newPlot(
    stage.div,
    [
      { x, y, mode: 'text', text, type: 'scattergl', textfont: { size: stage.preview ? 12 : 20, color: '#f1f5f9' } },
      { z, type: 'heatmap', showscale: false, colorscale: 'Viridis' },
    ],
    {
      template: stage.template,
      showlegend: false,
      sliders: stage.preview ? undefined : [{ active: 0, steps, pad: { t: 40 }, currentvalue: { prefix: 'first column: ' } }],
      xaxis: { range: [-0.5, 30.5], showline: false, zeroline: false, showgrid: false },
      yaxis: { showline: false, zeroline: false, showgrid: false },
    } as Partial<Layout>,
    stage.config,
  );
  if (stage.preview) stage.every(80, (i) => void relayout(stage.div, { 'xaxis.range': [-0.5 + (i % 200), 30.5 + (i % 200)] }));
  return () => stage.dispose();
};

export default mount;
