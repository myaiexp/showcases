// A volume trace of two gaussian blobs, with opacityscale deciding which values show
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { linspace, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const SCALES = ['uniform', 'extremes', 'min', 'max'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const axis = linspace(-2, 2, stage.preview ? 12 : 18);
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
        const a = Math.exp(-((px - 0.7) ** 2 + (py - 0.4) ** 2 + (pz + 0.3) ** 2));
        const b = 0.7 * Math.exp(-((px + 0.8) ** 2 + (py + 0.6) ** 2 + (pz - 0.5) ** 2) * 1.5);
        value.push(a + b);
      }
    }
  }
  await Plotly.newPlot(
    stage.div,
    [{ type: 'volume', x, y, z, value, isomin: 0.1, isomax: 1, opacity: 0.2, surface: { count: 14 }, opacityscale: 'uniform', colorscale: 'Viridis', showscale: !stage.preview }],
    { template: stage.template, margin: margin3d(stage), scene: { aspectmode: 'cube', camera: { eye: { x: 1.6, y: 1.5, z: 0.9 } } } },
    stage.config,
  );

  const scale = (s: string): void => void restyle(stage.div, { opacityscale: s });
  if (stage.bar) {
    select(stage.bar, 'opacityscale', SCALES, 'uniform', scale);
    slider(stage.bar, 'opacity', [0.02, 0.6, 0.02], 0.2, (v) => void restyle(stage.div, { opacity: v }));
    slider(stage.bar, 'surface.count', [2, 30, 1], 14, (v) => void restyle(stage.div, { 'surface.count': v }));
  } else {
    stage.every(1600, (i) => scale(SCALES[i % SCALES.length]!));
  }
  orbit(stage, { radius: 2.5 });
  return () => stage.dispose();
};

export default mount;
