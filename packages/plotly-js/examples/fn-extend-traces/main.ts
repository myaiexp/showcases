// extendTraces appends points to two traces, keeping at most a fixed number
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  let maxPoints = stage.preview ? 30 : 60;
  let a = 0;
  let b = 0;
  const rand = (): number => Math.random() - 0.5;

  await Plotly.newPlot(stage.div, [{ y: [0], name: 'walk A' }, { y: [0], name: 'walk B' }], { template: stage.template, showlegend: !stage.preview }, stage.config);

  if (stage.bar) slider(stage.bar, 'max points per trace', [10, 200, 10], maxPoints, (v) => (maxPoints = v));
  stage.every(120, () => {
    a += rand();
    b += rand();
    // extend multiple traces up to a maximum of maxPoints points per trace
    void Plotly.extendTraces(stage.div, { y: [[a], [b]] }, [0, 1], maxPoints);
  });

  return () => stage.dispose();
};

export default mount;
