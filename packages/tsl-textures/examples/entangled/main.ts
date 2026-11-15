// Entangled: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { entangled } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, int, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      density: int(10, 1, 20),
      color: rgb(0x002040),
      background: rgb(0xffffff),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 0.72, density: 10, color: 3500473, background: 16777215, seed: 0 },
        { scale: 0.64, density: 6, color: 16645629, background: 6274431, seed: 0 },
        { scale: 2.4, density: 16, color: 16772096, background: 14614528, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = entangled({
    scale: u.scale,
    density: u.density,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
