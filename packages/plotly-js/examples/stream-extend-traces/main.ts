// Plotly.extendTraces appends a point per tick; maxPoints bounds the trace so it can run forever
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });

  await Plotly.newPlot(
    stage.div,
    [{ y: [1, 2, 3].map(Math.random), mode: 'lines', line: { color: '#80CAF6' } }],
    { template: stage.template, yaxis: { range: [0, 1] } },
    stage.config,
  );

  // The docs stop after 100 ticks; maxPoints (the 4th argument) lets the stream keep going.
  stage.every(300, () => void Plotly.extendTraces(stage.div, { y: [[Math.random()]] }, [0], 100).catch(() => {}));

  return () => stage.dispose();
};

export default mount;
