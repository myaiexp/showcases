// Filled shapes in the legend: swatch outlines follow each shape's line.dash
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DASHES = ['solid', 'dot', 'dash', 'longdashdot'] as const;
const COLOURS = ['#60a5fa', '#f59e0b', '#34d399', '#f472b6'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const shapes = (shift: number) =>
    DASHES.map((dash, i) => ({
      type: (i % 2 ? 'circle' : 'rect') as 'rect' | 'circle',
      x0: i * 1.2,
      x1: i * 1.2 + 1,
      y0: 0.2 + 0.25 * Math.sin(shift + i),
      y1: 1.2 + 0.25 * Math.sin(shift + i),
      line: { dash: DASHES[(i + Math.round(shift)) % DASHES.length], color: COLOURS[i], width: 3 },
      fillcolor: `${COLOURS[i]}33`,
      showlegend: true,
      name: `${i % 2 ? 'circle' : 'rect'}, dash: ${DASHES[(i + Math.round(shift)) % DASHES.length]}`,
    }));
  const layout = (shift: number): Partial<Plotly.Layout> => ({
    template: stage.template,
    shapes: shapes(shift) as Partial<Plotly.Shape>[],
    xaxis: { range: [-0.3, 5], visible: false },
    yaxis: { range: [-0.3, 1.8], visible: false },
    legend: { font: { size: stage.preview ? 9 : 12 } },
  });

  // No traces: the legend is made of shapes alone.
  await Plotly.newPlot(stage.div, [], layout(0), stage.config);
  if (stage.preview) stage.every(1500, (i) => void Plotly.relayout(stage.div, { shapes: shapes(i) as Partial<Plotly.Shape>[] }));

  return () => stage.dispose();
};

export default mount;
