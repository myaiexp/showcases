// A mesh3d tetrahedron: four vertices, four triangles named by i, j, k, coloured by intensity
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'mesh3d',
        x: [0, 1, 2, 0],
        y: [0, 0, 1, 2],
        z: [0, 2, 0, 1],
        i: [0, 0, 0, 1],
        j: [1, 2, 3, 2],
        k: [2, 3, 1, 3],
        intensity: [0, 0.33, 0.66, 1],
        colorscale: [
          [0, 'rgb(255, 0, 0)'],
          [0.5, 'rgb(0, 255, 0)'],
          [1, 'rgb(0, 0, 255)'],
        ],
        showscale: false,
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.7, y: 1.7, z: 1 } } } },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'flatshading', false, (on) => void restyle(stage.div, { flatshading: on }));
  else stage.every(1800, (i) => void restyle(stage.div, { flatshading: i % 2 === 1 }));
  orbit(stage, { radius: 2.8 });
  return () => stage.dispose();
};

export default mount;
