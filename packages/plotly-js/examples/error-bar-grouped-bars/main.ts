// Error bars on grouped bar traces: Control and Experimental over three trials
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const x = ['Trial 1', 'Trial 2', 'Trial 3'];
const MODES = ['group', 'stack', 'overlay'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [3, 6, 4], name: 'Control', error_y: { type: 'data', array: [1, 0.5, 1.5], visible: true }, type: 'bar' },
      { x, y: [4, 7, 3], name: 'Experimental', error_y: { type: 'data', array: [0.5, 1, 2], visible: true }, type: 'bar' },
    ],
    { template: stage.template, barmode: 'group' },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'barmode', MODES, 'group', (v) => void Plotly.relayout(stage.div, { barmode: v }));
    toggle(stage.bar, 'error bars', true, (v) => void Plotly.restyle(stage.div, { 'error_y.visible': v }));
  } else {
    stage.every(1000, (i) => {
      const grow = i % 2 === 0;
      void Plotly.restyle(stage.div, { 'error_y.array': [grow ? [2, 1.5, 2.5] : [1, 0.5, 1.5], grow ? [1.5, 2, 1] : [0.5, 1, 2]] });
    });
  }

  return () => stage.dispose();
};

export default mount;
