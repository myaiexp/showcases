// A mesh3d cube coloured by intensity per vertex or per triangle (intensitymode)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['vertex', 'cell'] as const;
// Eight vertices, twelve triangles: the intensity array has one entry per vertex or per cell.
const VERTEX = [0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1];
const CELL = Array.from({ length: 12 }, (_, i) => i / 11);

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
        i: [7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j: [3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k: [0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        intensity: VERTEX,
        intensitymode: 'vertex',
        colorscale: [
          [0, 'rgb(255, 0, 255)'],
          [0.5, 'rgb(0, 255, 0)'],
          [1, 'rgb(0, 0, 255)'],
        ],
        showscale: false,
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.7, y: 1.7, z: 1.1 } } } },
    stage.config,
  );

  const apply = (m: (typeof MODES)[number]): void =>
    void restyle(stage.div, { intensitymode: m, intensity: [m === 'vertex' ? VERTEX : CELL] });
  if (stage.bar) select(stage.bar, 'intensitymode', MODES, 'vertex', apply);
  else stage.every(1800, (i) => apply(MODES[i % 2]!));
  orbit(stage, { radius: 2.8 });
  return () => stage.dispose();
};

export default mount;
