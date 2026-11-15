// Fordite: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { fordite } from 'tsl-textures';
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
      color: rgb(0x000000),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, color: 0, seed: 0 },
        { scale: 0.96, color: 13549056, seed: 0 },
        { scale: 0, color: 13500619, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = fordite({
    scale: u.scale,
    color: u.color,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
