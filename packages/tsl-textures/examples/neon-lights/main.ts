// Neon lights: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { neonLights } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // mode is 0 for additive and 1 for subtractive blending (the docs give no range). Its layout input
  // is a float, so a float uniform is right.

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      thinness: range(0.8, 0, 1),
      mode: range(0, 0, 1, 1),
      colorA: rgb(0xff0000),
      colorB: rgb(0x00ff00),
      colorC: rgb(0x0000ff),
      background: rgb(0x000000),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2.5, thinness: 0.8, mode: 0, colorA: 16711680, colorB: 65280, colorC: 255, background: 0, seed: 0 },
        { scale: 3.16, thinness: 0.66, mode: 0, colorA: 15198183, colorB: 16711895, colorC: 903374, background: 29183, seed: 0 },
        { scale: 2.56, thinness: 0.92, mode: 1, colorA: 13069677, colorB: 8378056, colorC: 852066, background: 16709611, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = neonLights({
    scale: u.scale,
    thinness: u.thinness,
    mode: u.mode,
    colorA: u.colorA,
    colorB: u.colorB,
    colorC: u.colorC,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
