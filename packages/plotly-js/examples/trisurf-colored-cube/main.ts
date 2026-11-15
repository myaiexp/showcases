// mesh3d.facecolor on a unit cube: two triangles per face, one colour per face
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { button } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const FACES = ['rgb(50, 200, 200)', 'rgb(100, 200, 255)', 'rgb(150, 200, 115)', 'rgb(200, 200, 50)', 'rgb(230, 200, 10)', 'rgb(255, 140, 0)'];
/** Each face colour twice: the docs' facecolor2. Shifting the palette moves the colours around the cube. */
const pairs = (shift: number): string[] => FACES.flatMap((_, n) => [FACES[(n + shift) % 6]!, FACES[(n + shift) % 6]!]);

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'mesh3d',
        x: [0, 0, 1, 1, 0, 0, 1, 1],
        y: [0, 1, 1, 0, 0, 1, 1, 0],
        z: [0, 0, 0, 0, 1, 1, 1, 1],
        i: [7, 0, 0, 0, 4, 4, 2, 6, 4, 0, 3, 7],
        j: [3, 4, 1, 2, 5, 6, 5, 5, 0, 1, 2, 2],
        k: [0, 7, 2, 3, 6, 7, 1, 2, 5, 5, 7, 6],
        facecolor: pairs(0),
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.7, y: 1.7, z: 1 } } } },
    stage.config,
  );

  let shift = 0;
  const next = (): void => void restyle(stage.div, { facecolor: [pairs(++shift)] });
  if (stage.bar) button(stage.bar, 'Shift the face colours', next);
  else stage.every(1100, next);
  orbit(stage, { radius: 2.8 });
  return () => stage.dispose();
};

export default mount;
