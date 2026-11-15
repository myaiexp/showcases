// legend, legend2 and titleclick/titledoubleclick on a legend title
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const ACTIONS = ['toggle', 'toggleothers', 'false'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [2, 1, 3], name: 'Trace 1', type: 'scatter' },
      { x: [1, 2, 3], y: [1, 3, 2], name: 'Trace 2', type: 'scatter' },
      { x: [1, 2, 3], y: [3, 2, 1], name: 'Trace 3', legend: 'legend2', type: 'scatter' },
      { x: [1, 2, 3], y: [2, 3, 1], name: 'Trace 4', legend: 'legend2', type: 'scatter' },
    ],
    {
      template: stage.template,
      legend: { title: { text: 'First Legend' }, titleclick: 'toggleothers', titledoubleclick: 'toggle' },
      legend2: { title: { text: 'Second Legend' }, titleclick: 'toggleothers', titledoubleclick: 'toggle', y: 0.5 },
    } as Partial<Layout>,
    stage.config,
  );
  const act = (v: string): unknown => (v === 'false' ? false : v);
  if (stage.bar) {
    select(stage.bar, 'legend.titleclick', ACTIONS, 'toggleothers', (v) => void relayout(stage.div, { 'legend.titleclick': act(v), 'legend2.titleclick': act(v) }));
    select(stage.bar, 'legend.titledoubleclick', ACTIONS, 'toggle', (v) => void relayout(stage.div, { 'legend.titledoubleclick': act(v), 'legend2.titledoubleclick': act(v) }));
  }
  // A card plays what clicking a title does: hide the other entries, or the whole legend.
  if (stage.preview) {
    stage.every(1300, (i) => {
      void restyle(stage.div, { visible: true }, [0, 1, 2, 3]);
      const hidden = [[], [1], [2, 3], [0, 1, 2], []][i % 5] as number[];
      if (hidden.length) void restyle(stage.div, { visible: 'legendonly' }, hidden);
    });
  }
  return () => stage.dispose();
};

export default mount;
