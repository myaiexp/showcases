// A generated vortex field: a ring of `starts` points whose radius you can change
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { linspace, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const axis = linspace(-3, 3, stage.preview ? 9 : 13);
  const zs = linspace(0, 6, stage.preview ? 9 : 13);
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];
  const u: number[] = [];
  const v: number[] = [];
  const w: number[] = [];
  // Swirl around the z axis, with an updraft that is strongest near the axis.
  for (const pz of zs) {
    for (const py of axis) {
      for (const px of axis) {
        const r2 = px * px + py * py;
        x.push(px);
        y.push(py);
        z.push(pz);
        u.push(-py);
        v.push(px);
        w.push(1.5 * Math.exp(-r2 / 4));
      }
    }
  }
  const ring = (radius: number) => {
    const t = linspace(0, 2 * Math.PI, 9).slice(0, 8);
    return { x: t.map((a) => radius * Math.cos(a)), y: t.map((a) => radius * Math.sin(a)), z: t.map(() => 0) };
  };
  await Plotly.newPlot(
    stage.div,
    [{ type: 'streamtube', x, y, z, u, v, w, starts: ring(1.5), sizeref: 0.4, colorscale: 'Electric', showscale: false, maxdisplayed: 2000 }],
    { template: stage.template, margin: margin3d(stage), scene: { aspectmode: 'data', camera: { eye: { x: 1.6, y: 1.6, z: 0.7 } } } },
    stage.config,
  );

  const setRadius = (r: number): void => {
    const s = ring(r);
    void restyle(stage.div, { 'starts.x': [s.x], 'starts.y': [s.y], 'starts.z': [s.z] });
  };
  if (stage.bar) slider(stage.bar, 'starts radius', [0.3, 3, 0.1], 1.5, setRadius);
  else stage.every(130, (i) => setRadius(1.6 + 1.2 * Math.sin(i / 8)));
  orbit(stage, { radius: 2.6, height: 0.8 });
  return () => stage.dispose();
};

export default mount;
