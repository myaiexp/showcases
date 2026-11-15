// Stars: a starry sky with density and hue variation
import * as THREE from 'three/webgpu';
import { stars } from 'tsl-textures';
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
      density: range(2, 0, 5),
      variation: range(0, 0, 1),
      color: rgb(0xfff5f0),
      background: rgb(0x000060),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, density: 2, variation: 0, color: 16774640, background: 96, seed: 0 },
        { scale: 2.44, density: 3, variation: 0, color: 16777215, background: 4697817, seed: 0 },
        { scale: 2.56, density: 3, variation: 1, color: 0, background: 16776674, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = stars({
    scale: u.scale,
    density: u.density,
    variation: u.variation,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
