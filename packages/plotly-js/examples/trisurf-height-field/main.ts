// A function z = f(x, y) triangulated by hand into mesh3d, each triangle coloured by height
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const n = stage.preview ? 16 : 28;
  const gx: number[] = [];
  const gy: number[] = [];
  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) {
      gx.push((c / (n - 1)) * 6 - 3);
      gy.push((r / (n - 1)) * 6 - 3);
    }
  }
  const i: number[] = [];
  const j: number[] = [];
  const k: number[] = [];
  for (let r = 0; r < n - 1; r += 1) {
    for (let c = 0; c < n - 1; c += 1) {
      const a = r * n + c;
      i.push(a, a + 1);
      j.push(a + 1, a + n + 1);
      k.push(a + n, a + n);
    }
  }
  const height = (freq: number, phase: number): number[] => gx.map((x, m) => Math.sin(freq * Math.hypot(x, gy[m]!) - phase) / (1 + Math.hypot(x, gy[m]!)));
  // One colour per triangle: the mean height of its corners, mapped to a blue-to-amber ramp.
  const faces = (z: number[]): string[] =>
    i.map((_, t) => {
      const h = (z[i[t]!]! + z[j[t]!]! + z[k[t]!]!) / 3;
      const u = Math.max(0, Math.min(1, (h + 0.6) / 1.2));
      return `hsl(${Math.round(215 - 175 * u)}, 80%, ${40 + 20 * u}%)`;
    });

  const z0 = height(2, 0);
  await Plotly.newPlot(
    stage.div,
    [{ type: 'mesh3d', x: gx, y: gy, z: z0, i, j, k, facecolor: faces(z0), flatshading: true }],
    { template: stage.template, margin: margin3d(stage), scene: { aspectmode: 'manual', aspectratio: { x: 1, y: 1, z: 0.5 }, camera: { eye: { x: 1.6, y: 1.6, z: 0.8 } } } },
    stage.config,
  );

  let freq = 2;
  const draw = (phase: number): void => {
    const z = height(freq, phase);
    void restyle(stage.div, { z: [z], facecolor: [faces(z)] });
  };
  if (stage.bar) slider(stage.bar, 'frequency', [0.5, 5, 0.1], freq, (v) => { freq = v; draw(0); });
  // The ripple travels outward, in cards and the full view.
  stage.every(110, (t) => draw(t / 3));
  orbit(stage, { radius: 2.5, height: 0.9 });
  return () => stage.dispose();
};

export default mount;
