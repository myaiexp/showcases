// legendgroup: traces that share a group show and hide together
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const a = 'rgb(164, 194, 244)';
  const b = 'rgb(142, 124, 195)';

  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [2, 1, 3], legendgroup: 'group', marker: { color: a, size: 10 }, mode: 'markers', name: 'first legend group', type: 'scatter' },
      { x: [1, 2, 3], y: [2, 2, 2], legendgroup: 'group', line: { color: a }, mode: 'lines', name: 'first legend group - average', type: 'scatter' },
      { x: [1, 2, 3], y: [4, 9, 2], legendgroup: 'group2', marker: { color: b, size: 10 }, mode: 'markers', name: 'second legend group', type: 'scatter' },
      { x: [1, 2, 3], y: [5, 5, 5], legendgroup: 'group2', line: { color: b }, mode: 'lines', name: 'second legend group - average', type: 'scatter' },
    ],
    { template: stage.template, legend: { tracegroupgap: 20 } } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) slider(stage.bar, 'legend.tracegroupgap', [0, 60, 2], 20, (v) => void relayout(stage.div, { 'legend.tracegroupgap': v }));
  // Cards cannot click: they hide a group the way a legend click does, by restyling visible.
  if (stage.preview) {
    stage.every(1200, (i) => {
      const hidden = [[], [2, 3], [0, 1], []][i % 4] as number[];
      void restyle(stage.div, { visible: true }, [0, 1, 2, 3]);
      if (hidden.length) void restyle(stage.div, { visible: 'legendonly' }, hidden);
    });
  }
  return () => stage.dispose();
};

export default mount;
