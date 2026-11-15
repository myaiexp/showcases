// Instead of extendTraces: keep the array yourself, drop the head, push the tail, send it all
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const roll = (): number => Math.round(Math.random() * 10) + 1;
  let values = Array.from({ length: 30 }, roll);

  await Plotly.newPlot(
    stage.div,
    [{ y: values, mode: 'lines', line: { color: '#80CAF6' } }],
    { template: stage.template, yaxis: { range: [0, 12] } },
    stage.config,
  );

  stage.every(stage.preview ? 500 : 1000, () => {
    values = values.concat(roll());
    values.splice(0, 1);
    void Plotly.update(stage.div, { y: [values] }, {}).catch(() => {});
  });

  return () => stage.dispose();
};

export default mount;
