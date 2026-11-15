// surface.surfacecolor paints the surface with a second variable, apart from its height
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { linspace, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = {
  'height (default)': (x: number, y: number) => Math.exp(-(x * x + y * y) / 4) * 3,
  'distance from the x axis': (_x: number, y: number) => Math.abs(y),
  'ripples': (x: number, y: number) => Math.sin(4 * Math.hypot(x, y)),
  'angle': (x: number, y: number) => Math.atan2(y, x),
} as const;
type Colouring = keyof typeof COLORS;
const NAMES = Object.keys(COLORS) as Colouring[];
const SCALES = ['Viridis', 'RdBu', 'Earth', 'Electric'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const axis = linspace(-4, 4, stage.preview ? 40 : 70);
  const z = axis.map((y) => axis.map((x) => Math.exp(-(x * x + y * y) / 4) * 3));
  const colourBy = (k: Colouring): number[][] => axis.map((y) => axis.map((x) => COLORS[k](x, y)));

  await Plotly.newPlot(
    stage.div,
    [{ type: 'surface', x: axis, y: axis, z, surfacecolor: colourBy('ripples'), colorscale: 'Viridis', showscale: !stage.preview }],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.7, y: 1.7, z: 0.9 } } } },
    stage.config,
  );

  const paint = (k: Colouring): void => void restyle(stage.div, { surfacecolor: [colourBy(k)] });
  if (stage.bar) {
    select(stage.bar, 'surfacecolor', NAMES, 'ripples', paint);
    select(stage.bar, 'colorscale', SCALES, 'Viridis', (s) => void restyle(stage.div, { colorscale: s }));
  } else {
    stage.every(1500, (i) => {
      paint(NAMES[i % NAMES.length]!);
      void restyle(stage.div, { colorscale: SCALES[i % SCALES.length]! });
    });
  }
  orbit(stage, { radius: 2.6 });
  return () => stage.dispose();
};

export default mount;
