// mesh3d.vertexcolor: one colour per vertex, blended across each triangle
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  // An octahedron: six vertices, eight faces.
  const x = [1, -1, 0, 0, 0, 0];
  const y = [0, 0, 1, -1, 0, 0];
  const z = [0, 0, 0, 0, 1, -1];
  const vertexcolor = ['#ef4444', '#22d3ee', '#22c55e', '#f472b6', '#facc15', '#6366f1'];
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'mesh3d',
        x,
        y,
        z,
        i: [0, 0, 0, 0, 1, 1, 1, 1],
        j: [2, 3, 2, 3, 2, 3, 2, 3],
        k: [4, 4, 5, 5, 4, 4, 5, 5],
        vertexcolor,
        flatshading: false,
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.6, y: 1.6, z: 1 } } } },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'flatshading', false, (on) => void restyle(stage.div, { flatshading: on }));
  orbit(stage, { radius: 2.6 });
  return () => stage.dispose();
};

export default mount;
