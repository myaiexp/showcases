// Protozoa: organisms that drift as the view turns, through the matcap coordinate
import * as THREE from 'three/webgpu';
import { protozoa } from 'tsl-textures';
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
      scale: range(1.5, 0, 4),
      fat: range(0.7, 0, 1),
      amount: range(0.4, 0, 1),
      color: rgb(0xa0a0a0),
      subcolor: rgb(0xe0e8ff),
      background: rgb(0xf0f8ff),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1.5, fat: 0.7, amount: 0.4, color: 10526880, subcolor: 14739711, background: 15792383, seed: 0 },
        { scale: 0.16, fat: 0.92, amount: 0.93, color: 16777215, subcolor: 0, background: 15859697, seed: 6352 },
        { scale: 2.44, fat: 0.55, amount: 0.1, color: 16645888, subcolor: 16580608, background: 6881280, seed: 6352 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = protozoa({
    scale: u.scale,
    fat: u.fat,
    amount: u.amount,
    color: u.color,
    subcolor: u.subcolor,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
