// Reticular veins: leaf venation as a net of veins with cell organelles
import * as THREE from 'three/webgpu';
import { reticularVeins } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges (seed and any range the docs omit are my pick).
  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      reticulation: range(5, 2, 10),
      strength: range(0.2, 0, 1),
      organelles: range(0.2, 0, 1),
      color: rgb(0xfffff0),
      background: rgb(0x208020),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 0, reticulation: 5, strength: 0.2, organelles: 0.2, color: 16777200, background: 2129952, seed: 8680 },
        { scale: 0, reticulation: 10, strength: 1, organelles: 0.45, color: 16774656, background: 14917792, seed: 2075 },
        { scale: 0, reticulation: 3.84, strength: 0.22, organelles: 0.25, color: 21940, background: 11394517, seed: 4039 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = reticularVeins({
    scale: u.scale,
    reticulation: u.reticulation,
    strength: u.strength,
    organelles: u.organelles,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
