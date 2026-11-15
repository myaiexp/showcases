// Polka dots: dots on a Fibonacci lattice over a sphere, sized and blurred live
import * as THREE from 'three/webgpu';
import { polkaDots } from 'tsl-textures';
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
      count: range(2, 1, 4),
      size: range(0.5, 0, 1),
      blur: range(0.25, 0, 1),
      color: rgb(0x000000),
      background: rgb(0xffffff),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { count: 2, size: 0.57, blur: 0.25, color: 0, background: 16777215 },
        { count: 1.359, size: 0.75, blur: 0.25, color: 15986920, background: 48128 },
        { count: 2.619, size: 0.53, blur: 0.7, color: 16580271, background: 15728640 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = polkaDots({
    count: u.count,
    size: u.size,
    blur: u.blur,
    color: u.color,
    background: u.background,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
