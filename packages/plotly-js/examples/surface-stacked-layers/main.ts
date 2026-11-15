// Three translucent surface traces stacked in one scene, with offset and opacity sliders
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const Z1 = [
  [8.83, 8.89, 8.81, 8.87, 8.9, 8.87],
  [8.89, 8.94, 8.85, 8.94, 8.96, 8.92],
  [8.84, 8.9, 8.82, 8.92, 8.93, 8.91],
  [8.79, 8.85, 8.79, 8.9, 8.94, 8.92],
  [8.79, 8.88, 8.81, 8.9, 8.95, 8.92],
  [8.8, 8.82, 8.78, 8.91, 8.94, 8.92],
  [8.75, 8.78, 8.77, 8.91, 8.95, 8.92],
  [8.8, 8.8, 8.77, 8.91, 8.95, 8.94],
  [8.74, 8.81, 8.76, 8.93, 8.98, 8.99],
  [8.89, 8.99, 8.92, 9.1, 9.13, 9.11],
  [8.97, 8.97, 8.91, 9.09, 9.11, 9.11],
  [9.04, 9.08, 9.05, 9.25, 9.28, 9.27],
  [9, 9.01, 9, 9.2, 9.23, 9.2],
  [8.99, 8.99, 8.98, 9.18, 9.2, 9.19],
  [8.93, 8.97, 8.97, 9.18, 9.2, 9.18],
];

const layers = (gap: number): Data[] => [
  { type: 'surface', z: Z1 },
  { type: 'surface', z: Z1.map((r) => r.map((v) => v + gap)), showscale: false, opacity: 0.9 },
  { type: 'surface', z: Z1.map((r) => r.map((v) => v - gap)), showscale: false, opacity: 0.9 },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const layout = { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.9, y: 1.6, z: 0.8 } } } };
  await Plotly.newPlot(stage.div, layers(1), layout, stage.config);

  if (stage.bar) {
    slider(stage.bar, 'layer gap', [0, 2, 0.1], 1, (g) => void Plotly.react(stage.div, layers(g), layout, stage.config));
    slider(stage.bar, 'opacity of outer layers', [0.1, 1, 0.1], 0.9, (v) => void restyle(stage.div, { opacity: v }, [1, 2]));
  } else {
    // Cards breathe the gap in and out.
    stage.every(120, (i) => void Plotly.react(stage.div, layers(1 + 0.8 * Math.sin(i / 8)), layout, stage.config));
  }
  orbit(stage, { radius: 2.5, height: 0.9 });
  return () => stage.dispose();
};

export default mount;
