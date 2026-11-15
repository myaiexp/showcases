// Turbulent smoke: animated smoke whose details is an int iteration count
import * as THREE from 'three/webgpu';
import { turbulentSmoke } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { int, params, range } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges (seed and any range the docs omit are my pick).
  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      speed: range(0, -2, 2),
      details: int(5, 1, 10),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, speed: 0, details: 5, seed: 0 },
        { scale: 0, speed: 0, details: 5, seed: 8728 },
        { scale: 4, speed: 1.164, details: 1, seed: 8728 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = turbulentSmoke({
    scale: u.scale,
    speed: u.speed,
    details: u.details,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
