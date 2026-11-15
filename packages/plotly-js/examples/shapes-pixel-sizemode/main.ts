// xsizemode and ysizemode 'pixel': x0 and y0 are the anchor, x1 and y1 offsets in pixels
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = [1, 2, 3, 4, 5, 6];
  await Plotly.newPlot(
    stage.div,
    [{ x, y: [2, 4, 3, 5, 3, 4], mode: 'lines+markers', marker: { size: 10 } }],
    {
      template: stage.template,
      xaxis: { range: [0, 7] },
      yaxis: { range: [0, 7] },
      shapes: [
        { type: 'rect', xref: 'x', yref: 'y', xsizemode: 'pixel', ysizemode: 'pixel', xanchor: 3, yanchor: 3, x0: -30, x1: 30, y0: -20, y1: 20, fillcolor: 'rgba(244, 114, 182, 0.45)', line: { color: '#f472b6', width: 2 }, layer: 'above' },
      ],
      showlegend: false,
    } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'half width (px)', [5, 120, 5], 30, (v) => void relayout(stage.div, { 'shapes[0].x0': -v, 'shapes[0].x1': v }));
    select(stage.bar, 'layer', ['above', 'below', 'between'] as const, 'above', (v) => void relayout(stage.div, { 'shapes[0].layer': v }));
    select(stage.bar, 'x range', ['0 to 7', '2 to 4'] as const, '0 to 7', (v) => void relayout(stage.div, { 'xaxis.range': v === '0 to 7' ? [0, 7] : [2, 4] }));
  }
  // Zooming moves the data under the box, but the box stays 60 by 40 pixels.
  if (stage.preview) stage.every(100, (i) => void relayout(stage.div, { 'xaxis.range': [Math.abs(Math.sin(i / 30)) * 2, 7 - Math.abs(Math.sin(i / 30)) * 2.5], 'shapes[0].layer': i % 40 < 20 ? 'above' : 'below' }));
  return () => stage.dispose();
};

export default mount;
