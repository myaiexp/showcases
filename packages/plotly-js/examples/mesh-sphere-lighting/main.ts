// A triangulated sphere in mesh3d with lighting sliders and flat or smooth shading
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

/** A lat/long sphere: vertices on rings, two triangles per quad. */
function sphere(rings: number, segs: number) {
  const x: number[] = [];
  const y: number[] = [];
  const z: number[] = [];
  for (let r = 0; r <= rings; r += 1) {
    const phi = (Math.PI * r) / rings;
    for (let s = 0; s < segs; s += 1) {
      const th = (2 * Math.PI * s) / segs;
      x.push(Math.sin(phi) * Math.cos(th));
      y.push(Math.sin(phi) * Math.sin(th));
      z.push(Math.cos(phi));
    }
  }
  const i: number[] = [];
  const j: number[] = [];
  const k: number[] = [];
  for (let r = 0; r < rings; r += 1) {
    for (let s = 0; s < segs; s += 1) {
      const a = r * segs + s;
      const b = r * segs + ((s + 1) % segs);
      const c = a + segs;
      const d = b + segs;
      i.push(a, b);
      j.push(c, d);
      k.push(b, c);
    }
  }
  return { x, y, z, i, j, k };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const m = sphere(stage.preview ? 10 : 18, stage.preview ? 16 : 28);
  await Plotly.newPlot(
    stage.div,
    [{ type: 'mesh3d', ...m, intensity: m.z, colorscale: 'Portland', showscale: false, flatshading: true, lighting: { ambient: 0.5, diffuse: 0.8, specular: 0.3, roughness: 0.5 } }],
    { template: stage.template, margin: margin3d(stage), scene: { aspectmode: 'data', camera: { eye: { x: 1.6, y: 1.4, z: 0.7 } } } },
    stage.config,
  );

  if (stage.bar) {
    const bar = stage.bar;
    toggle(bar, 'flatshading', true, (on) => void restyle(stage.div, { flatshading: on }));
    for (const key of ['ambient', 'diffuse', 'specular', 'roughness', 'fresnel'] as const) {
      slider(bar, `lighting.${key}`, [0, key === 'fresnel' ? 5 : 1, 0.05], { ambient: 0.5, diffuse: 0.8, specular: 0.3, roughness: 0.5, fresnel: 0.2 }[key], (v) => void restyle(stage.div, { [`lighting.${key}`]: v }));
    }
  } else {
    stage.every(1500, (i) => void restyle(stage.div, { flatshading: i % 2 === 0 }));
  }
  orbit(stage, { radius: 2.4, height: 0.6 });
  return () => stage.dispose();
};

export default mount;
