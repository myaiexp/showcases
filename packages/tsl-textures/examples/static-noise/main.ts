// Static noise: screen-space noise that refreshes with time, multiplied onto a colour
import * as THREE from 'three/webgpu';
import { color } from 'three/tsl';
import { staticNoise } from 'tsl-textures';
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
      balance: range(0, -3, 3),
      contrast: range(0, -2, 2),
      delay: range(0, 0, 1),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, balance: 0, contrast: 0, delay: 0, seed: 0 },
        { scale: 0.92, balance: 0.54, contrast: 0.4, delay: 0, seed: 0 },
        { scale: 3.08, balance: -0.78, contrast: 2, delay: 0, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // The docs call this an additional layer, not a diffuse colour: here it darkens a base colour.
  material.colorNode = staticNoise({
    scale: u.scale,
    balance: u.balance,
    contrast: u.contrast,
    delay: u.delay,
    seed: u.seed,
  }).mul(color(0x7aa2f7));
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
