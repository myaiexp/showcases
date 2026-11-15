// Plotly.newPlot: one trace of x and y values drawn into an empty div
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });

  // newPlot takes the div (or its id), the data, and an optional layout.
  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5], y: [1, 2, 4, 8, 16] }],
    { template: stage.template, margin: { t: stage.preview ? 10 : 20 } },
    stage.config,
  );

  return () => stage.dispose();
};

export default mount;
