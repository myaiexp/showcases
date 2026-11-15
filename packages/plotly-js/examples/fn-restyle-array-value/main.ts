// restyle: an array wrapped in another array is one trace's value, not one per trace
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { y: [1, 3, 2], mode: 'markers', marker: { size: 18, color: '#6b7280' }, xaxis: 'x', yaxis: 'y' },
      { type: 'heatmap', z: [[1, 2, 3], [2, 1, 2], [1, 1, 1]], xaxis: 'x2', yaxis: 'y2', showscale: false },
      { type: 'heatmap', z: [[3, 1, 2], [1, 2, 3], [2, 3, 1]], xaxis: 'x3', yaxis: 'y3', showscale: false },
    ],
    { template: stage.template, grid: { rows: 1, columns: 3, pattern: 'independent' }, showlegend: false },
    stage.config,
  );

  const colours = async (): Promise<void> => {
    // update the color attribute of the first trace so that the markers within the same
    // trace have different colors
    await Plotly.restyle(stage.div, { 'marker.color': [['red', 'green', '#60a5fa']] }, [0]);
  };
  const grids = async (flip: boolean): Promise<void> => {
    // update two traces with new z data: one grid per trace, so one extra level of nesting
    const a = [[1, 2, 3], [2, 1, 2], [1, 1, 1]];
    const b = [[0, 1, 1], [0, 2, 1], [3, 2, 1]];
    // The types read z as one trace's value, so the per-trace list needs a cast.
    await Plotly.restyle(stage.div, { z: flip ? [b, a] : [a, b] } as unknown as Plotly.DataUpdate, [1, 2]);
  };

  if (stage.bar) {
    button(stage.bar, "marker.color: [['red', 'green', …]]", () => void colours());
    button(stage.bar, 'z: [grid1, grid2] for traces [1, 2]', () => void grids(true));
    button(stage.bar, 'reset', () => void Plotly.restyle(stage.div, { 'marker.color': '#6b7280' }, [0]).then(() => grids(false)));
  }
  if (stage.preview) stage.every(1400, (i) => {
    if (i % 2) void colours().then(() => grids(true));
    else void Plotly.restyle(stage.div, { 'marker.color': '#6b7280' }, [0]).then(() => grids(false));
  });

  return () => stage.dispose();
};

export default mount;
