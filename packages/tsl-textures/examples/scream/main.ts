// Scream: swirling curves after The Scream, with a hue variety
import * as THREE from 'three/webgpu';
import { scream } from 'tsl-textures';
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
      variety: range(1, 0, 1),
      color: rgb(0xf0f060),
      background: rgb(0xd09090),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1.5, variety: 1, color: 15790176, background: 13668496, seed: 0 },
        { scale: 1.592, variety: 0, color: 16777215, background: 5490660, seed: 0 },
        { scale: 1.5, variety: 1, color: 12386262, background: 15858153, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = scream({
    scale: u.scale,
    variety: u.variety,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
