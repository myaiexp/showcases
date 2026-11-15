// One extendTraces call with [[a], [b]] and [0, 1] grows two traces in step
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });

  await Plotly.newPlot(
    stage.div,
    [
      { y: [1, 2, 3].map(Math.random), mode: 'lines', line: { color: '#80CAF6' } },
      { y: [1, 2, 3].map(Math.random), mode: 'lines', line: { color: '#DF56F1' } },
    ],
    { template: stage.template, showlegend: false, yaxis: { range: [0, 1] } },
    stage.config,
  );

  stage.every(300, () => void Plotly.extendTraces(stage.div, { y: [[Math.random()], [Math.random()]] }, [0, 1], 100).catch(() => {}));

  return () => stage.dispose();
};

export default mount;
