// A heatmap with one annotation per cell, text colour chosen for the cell behind it
import Plotly from 'plotly.js';
import type { Annotation } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const xValues = ['A', 'B', 'C', 'D', 'E'];
const yValues = ['W', 'X', 'Y', 'Z'];
const zValues = [
  [0.0, 0.0, 0.75, 0.75, 0.0],
  [0.0, 0.0, 0.75, 0.75, 0.0],
  [0.75, 0.75, 0.75, 0.75, 0.75],
  [0.0, 0.0, 0.0, 0.75, 0.0],
];

/** One annotation per cell, in the cell's own coordinates. */
function labels(z: number[][], size: number): Partial<Annotation>[] {
  return yValues.flatMap((y, i) =>
    xValues.map((x, j) => ({
      xref: 'x' as const,
      yref: 'y' as const,
      x,
      y,
      text: String(z[i]?.[j] ?? ''),
      showarrow: false,
      font: { color: (z[i]?.[j] ?? 0) !== 0 ? 'white' : '#cfe8d9', size },
    })),
  );
}
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const fontSize = stage.preview ? 9 : 14;

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'heatmap',
        colorscale: [
          [0, '#3D9970'],
          [1, '#001f3f'],
        ],
        showscale: false,
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Annotated heatmap' },
      annotations: labels(zValues, fontSize),
      xaxis: { ticks: '', side: 'top' },
      yaxis: { ticks: '', ticksuffix: ' ', autorange: 'reversed' },
    },
    stage.config,
  );

  // The annotations are separate from the trace: changing z recolours the cells, not the text,
  // so a new matrix needs both restyle and relayout.
  const flip = (i: number): void => {
    const z = zValues.map((row) => row.map((v) => (i % 2 ? 0.75 - v : v)));
    void restyle(stage.div, { z: [z] }, [0]);
    void Plotly.relayout(stage.div, { annotations: labels(z, fontSize) } as never).catch(() => {});
  };
  if (stage.bar) {
    let n = 0;
    button(stage.bar, 'Invert the cells', () => flip(++n));
  } else stage.every(1500, flip);

  return () => stage.dispose();
};

export default mount;
