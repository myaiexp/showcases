// A trisurf helper: vertices plus triangle indices and one facecolor per triangle
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

type Tri = [number, number, number];

/** The docs' trisurf(Tri, X, Y, Z, C): a mesh3d with i, j, k read from the triangle list. */
function trisurf(tri: Tri[], x: number[], y: number[], z: number[], facecolor: string[]) {
  return {
    type: 'mesh3d' as const,
    x,
    y,
    z,
    i: tri.map((f) => f[0]),
    j: tri.map((f) => f[1]),
    k: tri.map((f) => f[2]),
    facecolor,
    flatshading: true,
  };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const tetra = trisurf(
    [
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 1],
      [1, 2, 3],
    ],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    ['rgb(60, 60, 60)', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'],
  );
  await Plotly.newPlot(
    stage.div,
    [tetra],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.7, y: 1.7, z: 1.1 } } } },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'flatshading', true, (on) => void restyle(stage.div, { flatshading: on }));
  orbit(stage, { radius: 2.8 });
  return () => stage.dispose();
};

export default mount;
