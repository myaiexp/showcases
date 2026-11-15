// Several layout.images at once: paper or axis coordinates, sizes, opacity and layer
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { badge } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  // Four canvas-drawn badges stand in for the docs' language logos, which are URLs.
  const [py, js, r, ml] = [badge('Py', 215), badge('JS', 50), badge('R', 205), badge('M', 20)];
  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter', x: [1, 2, 3], y: [1, 2, 3], line: { color: '#60a5fa' } }],
    {
      template: stage.template,
      images: [
        // paper coordinates: a share of the plotting area, whatever the axes show
        { source: py, xref: 'paper', yref: 'paper', x: 0, y: 1, sizex: 0.2, sizey: 0.2, xanchor: 'right', yanchor: 'bottom' },
        // data coordinates: it moves with the zoom
        { source: js, xref: 'x', yref: 'y', x: 1.5, y: 2, sizex: 1, sizey: 1, xanchor: 'right', yanchor: 'bottom' },
        // stretched to fill its box, translucent, and below the trace
        { source: r, xref: 'x', yref: 'y', x: 1, y: 3, sizex: 2, sizey: 2, sizing: 'stretch', opacity: 0.4, layer: 'below' },
        // x in data units and y in paper units
        { source: ml, xref: 'x', yref: 'paper', x: 3, y: 0, sizex: 0.5, sizey: 1, opacity: 1, xanchor: 'right', yanchor: 'middle' },
      ],
    },
    stage.config,
  );

  const move = (x: number): void => void Plotly.relayout(stage.div, { 'xaxis.range': [x, x + 3], 'yaxis.range': [0.5 + x / 3, 3.5 + x / 3] });
  if (stage.bar) slider(stage.bar, 'pan the axes: image 2 and 3 follow, 1 and 4 stay', [-1, 2, 0.1], 0, move);
  else stage.every(100, (i) => move(0.8 + 0.8 * Math.sin(i / 8)));
  return () => stage.dispose();
};

export default mount;
