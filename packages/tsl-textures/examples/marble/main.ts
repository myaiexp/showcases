// Marble: threads through stone on a colorNode, tuned live
import * as THREE from 'three/webgpu';
import { marble } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges, each one a uniform.
  const { u } = params(
    stage,
    {
      scale: range(1.2, 0, 4),
      thinness: range(5, 0, 10),
      noise: range(0.3, 0, 1),
      color: rgb(0x4545d3),
      background: rgb(0xf0f8ff),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1.2, thinness: 5, noise: 0.3, color: 4539859, background: 15792383 },
        { scale: 1.564, thinness: 6.5, noise: 1, color: 15523058, background: 4215133 },
        { scale: 0.616, thinness: 6.3, noise: 1, color: 16772864, background: 7378466 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = marble({
    scale: u.scale,
    thinness: u.thinness,
    noise: u.noise,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
