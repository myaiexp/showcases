// Rough clay: clay strokes as a normal map on a plain coloured material
import * as THREE from 'three/webgpu';
import { roughClay } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges (seed and any range the docs omit are my pick).
  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      bump: range(0.5, -2, 2),
      curvature: range(0.2, 0, 1),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1.676, bump: 1.96, curvature: 0.12, seed: 0 },
        { scale: 3.56, bump: 0.58, curvature: 1, seed: 0 },
        { scale: 1.916, bump: 1.02, curvature: 0.56, seed: 2834 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // roughClay() is a normal map only, so the material needs its own visible colour.
  material.color = new THREE.Color(0xc08a64);
  material.normalNode = roughClay({
    scale: u.scale,
    bump: u.bump,
    curvature: u.curvature,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
