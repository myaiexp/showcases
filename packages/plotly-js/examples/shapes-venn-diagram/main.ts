// Two overlapping circle shapes plus a text trace for the region names
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const quiet = { showticklabels: false, showgrid: false, zeroline: false, range: [-0.5, 4] as [number, number] };
  const circles = (gap: number): Partial<Plotly.Shape>[] => [
    { opacity: 0.4, xref: 'x', yref: 'y', fillcolor: '#60a5fa', x0: 0, y0: 0, x1: 2, y1: 2, type: 'circle', line: { color: '#60a5fa' } },
    { opacity: 0.4, xref: 'x', yref: 'y', fillcolor: '#f59e0b', x0: gap, y0: 0, x1: gap + 2, y1: 2, type: 'circle', line: { color: '#f59e0b' } },
  ];

  await Plotly.newPlot(
    stage.div,
    [{ x: [0.6, 1.75, 2.9], y: [1, 1, 1], type: 'scatter', mode: 'text', text: ['A', 'A+B', 'B'], textfont: { size: stage.preview ? 12 : 18, family: 'Arial' } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Venn Diagram with Circle Shapes' },
      xaxis: { ...quiet },
      yaxis: { ...quiet, range: [-0.5, 2.5] as [number, number], scaleanchor: 'x' },
      shapes: circles(1.5),
      margin: stage.preview ? undefined : { l: 20, r: 20, b: 40 },
    },
    stage.config,
  );
  if (stage.bar) slider(stage.bar, 'second circle x0', [0.5, 3, 0.05], 1.5, (v) => void relayout(stage.div, { 'shapes[1].x0': v, 'shapes[1].x1': v + 2 }));
  if (stage.preview) stage.every(100, (i) => void relayout(stage.div, { 'shapes[1].x0': 1.5 + Math.sin(i / 10) * 0.7, 'shapes[1].x1': 3.5 + Math.sin(i / 10) * 0.7 }));
  return () => stage.dispose();
};

export default mount;
