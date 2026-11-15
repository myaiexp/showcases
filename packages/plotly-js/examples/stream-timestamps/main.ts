// x values are Date objects stamped when the point arrives
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });

  await Plotly.newPlot(
    stage.div,
    [{ x: [new Date()], y: [Math.random()], mode: 'lines', line: { color: '#80CAF6' } }],
    { template: stage.template, yaxis: { range: [0, 1] } },
    stage.config,
  );

  stage.every(stage.preview ? 400 : 1000, () => void Plotly.extendTraces(stage.div, { x: [[new Date()]], y: [[Math.random()]] }, [0], 60).catch(() => {}));

  return () => stage.dispose();
};

export default mount;
