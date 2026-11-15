// error_y types on one scatter trace: data, percent, constant and sqrt
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = ['data', 'percent', 'constant', 'sqrt'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: [0, 1, 2],
        y: [6, 10, 2],
        type: 'scatter',
        // type picks what the other keys mean: array (data), value as % (percent), value (constant)
        error_y: { type: 'data', array: [1, 2, 3], value: 20, visible: true },
        error_x: { type: 'percent', value: 10, visible: false },
      },
    ],
    { template: stage.template, xaxis: { range: [-0.5, 2.5] }, yaxis: { range: [-4, 16] } },
    stage.config,
  );

  const setType = (t: (typeof TYPES)[number]): void => {
    // `value` is read as a percent for 'percent' and as plain units for 'constant'.
    void Plotly.restyle(stage.div, { 'error_y.type': t, 'error_y.value': t === 'constant' ? 2 : 20 });
  };
  if (stage.bar) {
    select(stage.bar, 'error_y.type', TYPES, 'data', setType);
    toggle(stage.bar, 'error_x too', false, (v) => void Plotly.restyle(stage.div, { 'error_x.visible': v }));
  } else {
    stage.every(1300, (i) => setType(TYPES[i % TYPES.length] ?? 'data'));
  }

  return () => stage.dispose();
};

export default mount;
