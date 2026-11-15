// An isosurface through eight scattered values: isomin and isomax pick the shell to draw
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = ['Reds', 'Blues', 'Viridis', 'Portland', 'YlGnBu'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'isosurface',
        x: [0, 0, 0, 0, 1, 1, 1, 1],
        y: [0, 1, 0, 1, 0, 1, 0, 1],
        z: [1, 1, 0, 0, 1, 1, 0, 0],
        value: [1, 2, 3, 4, 5, 6, 7, 8],
        isomin: 2,
        isomax: 6,
        colorscale: 'Reds',
        showscale: !stage.preview,
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.88, y: -2.12, z: 0.96 } } } },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'isomin', [1, 8, 0.5], 2, (v) => void restyle(stage.div, { isomin: v }));
    slider(stage.bar, 'isomax', [1, 8, 0.5], 6, (v) => void restyle(stage.div, { isomax: v }));
    select(stage.bar, 'colorscale', SCALES, 'Reds', (s) => void restyle(stage.div, { colorscale: s }));
  } else {
    stage.every(1000, (i) => void restyle(stage.div, { isomin: 1 + (i % 4), isomax: 5 + (i % 4) }));
  }
  orbit(stage, { radius: 2.6, height: 0.96, start: -0.7 });
  return () => stage.dispose();
};

export default mount;
