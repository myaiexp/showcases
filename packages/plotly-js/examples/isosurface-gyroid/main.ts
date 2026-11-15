// An isosurface of a generated gyroid field, with the isomin and isomax shell as sliders
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { linspace, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = ['Portland', 'Viridis', 'Electric', 'RdBu'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const axis = linspace(-Math.PI, Math.PI, stage.preview ? 14 : 20);
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];
  const value: number[] = [];
  for (const pz of axis) {
    for (const py of axis) {
      for (const px of axis) {
        x.push(px);
        y.push(py);
        z.push(pz);
        // sin x cos y + sin y cos z + sin z cos x: zero on the gyroid surface.
        value.push(Math.sin(px) * Math.cos(py) + Math.sin(py) * Math.cos(pz) + Math.sin(pz) * Math.cos(px));
      }
    }
  }
  await Plotly.newPlot(
    stage.div,
    [{ type: 'isosurface', x, y, z, value, isomin: -0.6, isomax: 0.6, surface: { count: 3 }, colorscale: 'Portland', caps: { x: { show: false }, y: { show: false }, z: { show: false } }, showscale: !stage.preview }],
    { template: stage.template, margin: margin3d(stage), scene: { aspectmode: 'cube', camera: { eye: { x: 1.6, y: 1.6, z: 1 } } } },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'isomin', [-1.5, 1.5, 0.05], -0.6, (v) => void restyle(stage.div, { isomin: v }));
    slider(stage.bar, 'isomax', [-1.5, 1.5, 0.05], 0.6, (v) => void restyle(stage.div, { isomax: v }));
    slider(stage.bar, 'surface.count', [1, 6, 1], 3, (v) => void restyle(stage.div, { 'surface.count': v }));
    select(stage.bar, 'colorscale', SCALES, 'Portland', (s) => void restyle(stage.div, { colorscale: s }));
  } else {
    stage.every(150, (i) => {
      const half = 0.25 + 0.55 * Math.abs(Math.sin(i / 14));
      void restyle(stage.div, { isomin: -half, isomax: half });
    });
  }
  orbit(stage, { radius: 2.6, height: 1 });
  return () => stage.dispose();
};

export default mount;
