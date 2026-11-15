// A heatmap whose x and y are cell edges of uneven size, drawn under a golden spiral
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { linspace } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const scales = ['Viridis', 'Plasma', 'Jet', 'Earth', 'Portland'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 560 });

  // The spiral: r = a·exp(-b·theta), shifted so its start sits at the origin.
  const th = linspace(-Math.PI / 13, 2 * Math.PI * 2, 1000);
  const xs = th.map((t) => 1.120529 * Math.exp(-0.306349 * t) * Math.cos(t));
  const ys = th.map((t) => 1.120529 * Math.exp(-0.306349 * t) * Math.sin(t));
  const yShift = (1.6 - (Math.max(...ys) - Math.min(...ys))) / 2;

  // Heatmap x and y with one more entry than z has columns/rows: they are the cell edges.
  const phi = (1 + Math.sqrt(5)) / 2;
  const xe = [0, 1, 1 + 1 / phi ** 4, 1 + 1 / phi ** 3, phi];
  const ye = [0, 1 / phi ** 3, 1 / phi ** 3 + 1 / phi ** 4, 1 / phi ** 2, 1];

  const axis = { range: [0, 1.6] as [number, number], autorange: false as const, showgrid: false, zeroline: false, showticklabels: false, ticks: '' as const };

  await Plotly.newPlot(
    stage.div,
    [
      { x: xs.map((x) => -x + (xs[0] ?? 0)), y: ys.map((y) => y - (ys[0] ?? 0) + yShift), type: 'scatter', line: { color: 'white', width: 3 } },
      {
        x: xe,
        y: ye.map((y) => y + yShift),
        z: [
          [13, 3, 3, 5],
          [13, 2, 1, 5],
          [13, 10, 11, 12],
          [13, 8, 8, 8],
        ],
        type: 'heatmap',
        colorscale: 'Viridis',
        showscale: !stage.preview,
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Heatmap with unequal block sizes' },
      xaxis: { ...axis, scaleanchor: 'y' },
      yaxis: axis,
      showlegend: false,
    },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'colorscale', scales, 'Viridis', (v) => void restyle(stage.div, { colorscale: v }, [1]));
  else {
    let k = 0;
    stage.every(1300, () => void restyle(stage.div, { colorscale: scales[++k % scales.length] }, [1]));
  }

  return () => stage.dispose();
};

export default mount;
