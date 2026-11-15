// Darth Maul: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { darthMaul } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb, xyz } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The docs give no range for shift or distance; these cover the snapshots. balance is documented as
  // [0, 1] but snapshot 2 uses 2, so its range is [0, 2].

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      shift: xyz(0, 0, 0, [-5, -40, -5], [5, 40, 5]),
      complexity: range(0, 0, 1),
      angle: range(60, 0, 90),
      distance: range(1.9, -4, 4),
      color: rgb(0xf04040),
      background: rgb(0x000000),
      balance: range(0, 0, 2),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, shift: [0,-21.6,0.75], complexity: 0.43, angle: 60, distance: 0.06, color: 15745088, background: 0, balance: 0.16, seed: 4106 },
        { scale: 2, shift: [0,-21.6,0.75], complexity: 1, angle: 70.2, distance: -2.1, color: 16777215, background: 7340283, balance: 2, seed: 4106 },
        { scale: 0, shift: [0,-29.6,-4], complexity: 1, angle: 72, distance: -2.46, color: 5651776, background: 14606046, balance: 0.9999, seed: 4106 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = darthMaul({
    scale: u.scale,
    shift: u.shift,
    complexity: u.complexity,
    angle: u.angle,
    distance: u.distance,
    color: u.color,
    background: u.background,
    balance: u.balance,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
