// Gaussian splatting chapter: a splat plaza and a sky for wide-angle scenes
import * as pc from 'playcanvas';
import { emptyCloud, hue, rng, type SplatCloud } from './gsplat.ts';
import { daySky, equirectTexture } from './pbr.ts';

/** A checkered ground disc with a ring of tall pillars, seen best from its middle. */
export function plazaCloud(count = 26000, radius = 9, seed = 2): SplatCloud {
  const cloud = emptyCloud(count);
  const r = rng(seed);
  const ground = Math.floor(count * 0.7);
  for (let i = 0; i < count; i++) {
    let x: number;
    let y: number;
    let z: number;
    let size: number;
    let col: [number, number, number];
    if (i < ground) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * radius;
      x = Math.cos(a) * d;
      z = Math.sin(a) * d;
      y = -1.4;
      const check = (Math.floor(x * 0.5) + Math.floor(z * 0.5)) & 1;
      col = check ? [0.85, 0.82, 0.74] : [0.22, 0.26, 0.34];
      size = 0.1 + d * 0.006;
    } else {
      const k = (i - ground) % 10;
      const a = (k / 10) * Math.PI * 2;
      x = Math.cos(a) * 5.5 + (r() - 0.5) * 0.45;
      z = Math.sin(a) * 5.5 + (r() - 0.5) * 0.45;
      y = -1.4 + r() * 4.2;
      col = hue(k / 10, 0.6, 1);
      size = 0.075;
    }
    cloud.positions.set([x, y, z], i * 3);
    cloud.colors.set([...col, 1], i * 4);
    cloud.scales.fill(size, i * 3, i * 3 + 3);
  }
  return cloud;
}

/** A sky cubemap the scene can use as its skybox. The caller destroys it. */
export function skyCubemap(device: pc.GraphicsDevice, size = 256): pc.Texture {
  const source = equirectTexture(device, daySky({ sun: 1, panels: false, zenith: [0.15, 0.35, 0.85], horizon: [0.95, 0.85, 0.7] }));
  const cube = pc.EnvLighting.generateSkyboxCubemap(source, size);
  source.destroy();
  return cube;
}
