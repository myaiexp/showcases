// Camouflage: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { camouflage } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      colorA: rgb(0xc2bea8),
      colorB: rgb(0x9c895e),
      colorC: rgb(0x92a375),
      colorD: rgb(0x717561),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, colorA: 12762792, colorB: 10258782, colorC: 9610101, colorD: 7435617, seed: 0 },
        { scale: 0.72, colorA: 15519740, colorB: 6910716, colorC: 16662773, colorD: 10456237, seed: 0 },
        { scale: 3.24, colorA: 16772864, colorB: 16711680, colorC: 65393, colorD: 0, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = camouflage({
    scale: u.scale,
    colorA: u.colorA,
    colorB: u.colorB,
    colorC: u.colorC,
    colorD: u.colorD,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
