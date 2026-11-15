// Circles: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { circles } from 'tsl-textures';
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
      variety: range(1, 0, 1),
      color: rgb(0xf0e0d0),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, variety: 1, color: 15786192, seed: 0 },
        { scale: 3.6, variety: 1, color: 16759040, seed: 0 },
        { scale: 2.112, variety: 0.12, color: 16772864, seed: 7431 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = circles({
    scale: u.scale,
    variety: u.variety,
    color: u.color,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
