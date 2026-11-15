// A unit cube's vertices stretched to a box: one slider per axis rescales x, y and z
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const X = [0, 0, 1, 1, 0, 0, 1, 1];
const Y = [0, 1, 1, 0, 0, 1, 1, 0];
const Z = [0, 0, 0, 0, 1, 1, 1, 1];
const FACES = ['rgb(50, 200, 200)', 'rgb(100, 200, 255)', 'rgb(150, 200, 115)', 'rgb(200, 200, 50)', 'rgb(230, 200, 10)', 'rgb(255, 140, 0)'];

/** The docs' rectangle(): each 0 or 1 vertex coordinate picks the low or high end of a range. */
const stretch = (v: number[], range: [number, number]): number[] => v.map((e) => range[e]!);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const half = { x: 2, y: 3, z: 1 };
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'mesh3d',
        x: stretch(X, [-half.x, half.x]),
        y: stretch(Y, [-half.y, half.y]),
        z: stretch(Z, [-half.z, half.z]),
        i: [7, 0, 0, 0, 4, 4, 2, 6, 4, 0, 3, 7],
        j: [3, 4, 1, 2, 5, 6, 5, 5, 0, 1, 2, 2],
        k: [0, 7, 2, 3, 6, 7, 1, 2, 5, 5, 7, 6],
        facecolor: FACES.flatMap((c) => [c, c]),
      },
    ],
    {
      template: stage.template,
      margin: margin3d(stage),
      scene: { aspectmode: 'data', camera: { eye: { x: 1.5, y: 1.5, z: 1 } } },
    },
    stage.config,
  );

  const set = (axis: 'x' | 'y' | 'z', h: number): void => {
    const src = { x: X, y: Y, z: Z }[axis];
    void restyle(stage.div, { [axis]: [stretch(src, [-h, h])] });
  };
  if (stage.bar) {
    slider(stage.bar, 'x half-range', [0.5, 4, 0.25], half.x, (v) => set('x', v));
    slider(stage.bar, 'y half-range', [0.5, 4, 0.25], half.y, (v) => set('y', v));
    slider(stage.bar, 'z half-range', [0.5, 4, 0.25], half.z, (v) => set('z', v));
  } else {
    stage.every(120, (i) => set('z', 1.4 + 1.1 * Math.sin(i / 6)));
  }
  orbit(stage, { radius: 3.4, height: 1.2 });
  return () => stage.dispose();
};

export default mount;
