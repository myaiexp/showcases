// addTraces and deleteTraces: growing and shrinking the data array
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const layout: Partial<Layout> = { template: stage.template, showlegend: !stage.preview, yaxis: { range: [0, 9] }, xaxis: { range: [-0.2, 2.2] } };
  await Plotly.newPlot(stage.div, [{ y: [3, 4, 3], name: 'first' }], layout, stage.config);

  let n = 1;
  const steps: [string, () => Promise<unknown>][] = [
    // add a single trace to an existing graphDiv
    ['add one', () => Plotly.addTraces(stage.div, { y: [2, 1, 2], name: `added ${n++}` })],
    // add two traces
    ['add two', () => Plotly.addTraces(stage.div, [{ y: [6, 5, 7], name: `added ${n++}` }, { y: [8, 7, 8], name: `added ${n++}` }])],
    // add a trace at the beginning of the data array
    ['add at index 0', () => Plotly.addTraces(stage.div, { y: [1, 5, 7], name: `at 0 (${n++})` }, 0)],
    // remove the first trace
    ['delete trace 0', () => Plotly.deleteTraces(stage.div, 0)],
    // remove the last two traces
    ['delete [-2, -1]', () => Plotly.deleteTraces(stage.div, [-2, -1])],
  ];

  const guarded = (fn: () => Promise<unknown>) => () => {
    // deleteTraces throws on an index that is not there: keep at least one trace.
    if (fn === steps[3]![1] && stage.div.data.length < 2) return;
    if (fn === steps[4]![1] && stage.div.data.length < 3) return;
    void fn();
  };
  if (stage.bar) for (const [label, fn] of steps) button(stage.bar, label, guarded(fn));
  if (stage.preview) stage.every(1100, (i) => guarded(steps[(i - 1) % steps.length]![1])());

  return () => stage.dispose();
};

export default mount;
