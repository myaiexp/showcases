// A surface from 2D x, y and z arrays: a torus whose tube radius you can change
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { linspace, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

function torus(tube: number, n: number): { x: number[][]; y: number[][]; z: number[][]; c: number[][] } {
  const us = linspace(0, 2 * Math.PI, n);
  const vs = linspace(0, 2 * Math.PI, n);
  const x: number[][] = [];
  const y: number[][] = [];
  const z: number[][] = [];
  const c: number[][] = [];
  for (const v of vs) {
    x.push(us.map((u) => (2 + tube * Math.cos(v)) * Math.cos(u)));
    y.push(us.map((u) => (2 + tube * Math.cos(v)) * Math.sin(u)));
    z.push(us.map(() => tube * Math.sin(v)));
    c.push(us.map((u) => Math.sin(3 * u + v)));
  }
  return { x, y, z, c };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const n = stage.preview ? 36 : 64;
  const build = (r: number) => {
    const t = torus(r, n);
    return [{ type: 'surface' as const, x: t.x, y: t.y, z: t.z, surfacecolor: t.c, colorscale: 'Portland', showscale: false }];
  };
  const layout = {
    template: stage.template,
    margin: margin3d(stage),
    scene: { aspectmode: 'data' as const, camera: { eye: { x: 1.6, y: 1.6, z: 1.1 } } },
  };
  await Plotly.newPlot(stage.div, build(0.8), layout, stage.config);

  if (stage.bar) {
    slider(stage.bar, 'tube radius', [0.2, 1.4, 0.05], 0.8, (r) => void Plotly.react(stage.div, build(r), layout, stage.config));
  } else {
    stage.every(120, (i) => void Plotly.react(stage.div, build(0.8 + 0.45 * Math.sin(i / 7)), layout, stage.config));
  }
  orbit(stage, { radius: 3, height: 1.4 });
  return () => stage.dispose();
};

export default mount;
