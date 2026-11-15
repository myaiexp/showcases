// Base64-encoded typed arrays (bdata, dtype, shape) as trace data
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  // x is float64, y is float32, z is uint16 in two rows of three: each array is bytes in a string.
  const x = 'VVVVVVVV1b8AAAAAAAAAAFVVVVVVVdU/';
  const y = 'q6qqPquqqr4=';
  const z = 'AABkAMgALAGQAfQB';

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: { bdata: x, dtype: 'f8' },
        y: { bdata: y, dtype: 'f4' },
        z: { bdata: z, dtype: 'u2', shape: '2,3' },
        type: 'surface',
      },
    ] as unknown as Plotly.Data[],
    { template: stage.template, scene: { camera: { eye: { x: 1.6, y: 1.6, z: 1 } } } },
    stage.config,
  );
  stage.every(60, (i) => {
    const a = i / 40;
    void Plotly.relayout(stage.div, { 'scene.camera.eye': { x: 1.9 * Math.cos(a), y: 1.9 * Math.sin(a), z: 1 } }).catch(() => {});
  });
  return () => stage.dispose();
};

export default mount;
