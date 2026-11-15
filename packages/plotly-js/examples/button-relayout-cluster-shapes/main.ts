// relayout buttons set layout.shapes: args: ['shapes', [...]] draws or clears the cluster rings
import Plotly from 'plotly.js';
import type { Layout, Shape } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { applyButton, at } from '../../shared/events-kit.ts';
import type { Btn } from '../../shared/events-kit.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['#835AF1', '#7FA6EE', '#B8F7D4'];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('normal-clusters.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });
  const xs = [0, 1, 2].map((k) => unpackNum(rows, `x${k}`));
  const ys = [0, 1, 2].map((k) => unpackNum(rows, `y${k}`));

  const ring = (k: number): Partial<Shape> => ({
    type: 'circle', xref: 'x', yref: 'y',
    x0: Math.min(...xs[k]!), y0: Math.min(...ys[k]!), x1: Math.max(...xs[k]!), y1: Math.max(...ys[k]!),
    opacity: 0.25, line: { color: COLORS[k]! }, fillcolor: COLORS[k]!,
  });
  const buttons: Btn[] = [
    { args: ['shapes', []], label: 'None', method: 'relayout' },
    { args: ['shapes', [ring(0)]], label: 'Cluster 0', method: 'relayout' },
    { args: ['shapes', [ring(1)]], label: 'Cluster 1', method: 'relayout' },
    { args: ['shapes', [ring(2)]], label: 'Cluster 2', method: 'relayout' },
    { args: ['shapes', [ring(0), ring(1), ring(2)]], label: 'All', method: 'relayout' },
  ];

  await Plotly.newPlot(
    stage.div,
    [0, 1, 2].map((k) => ({ x: xs[k], y: ys[k], mode: 'markers' as const, type: 'scatter' as const, marker: { color: COLORS[k], size: stage.preview ? 5 : 7 } })),
    {
      template: stage.template,
      showlegend: false,
      margin: stage.preview ? undefined : { t: 90 },
      updatemenus: stage.preview ? [] : [{ buttons, direction: 'left', pad: { r: 10, t: 10 }, showactive: true, type: 'buttons', x: 0.1, xanchor: 'left', y: 1.2, yanchor: 'top' }],
    } as unknown as Partial<Layout>,
    stage.config,
  );

  if (stage.preview) stage.every(1000, (i) => void applyButton(stage.div, at(buttons, i)));

  return () => stage.dispose();
};

export default mount;
