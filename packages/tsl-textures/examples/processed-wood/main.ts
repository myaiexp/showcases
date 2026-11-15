// Processed wood: engineered-wood fibres with length, strength and angle
import * as THREE from 'three/webgpu';
import { processedWood } from 'tsl-textures';
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
      scale: range(2, 1, 4),
      lengths: range(4, 0, 20),
      strength: range(0.3, 0, 1),
      angle: range(0, -90, 90),
      color: rgb(0x702020),
      background: rgb(0xf0d0a0),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, lengths: 4, strength: 0.3, angle: 0, color: 7348256, background: 15782048, seed: 0 },
        { scale: 2.54, lengths: 19, strength: 0.48, angle: 90, color: 12295838, background: 15984599, seed: 6631 },
        { scale: 1.08, lengths: 20, strength: 0.64, angle: 45, color: 11374978, background: 0, seed: 561 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = processedWood({
    scale: u.scale,
    lengths: u.lengths,
    strength: u.strength,
    angle: u.angle,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
