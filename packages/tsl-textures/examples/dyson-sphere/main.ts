// Dyson sphere: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { dysonSphere } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // complexity is documented as [0, 4], but snapshot 3 uses 6, so the range is [0, 6]. The source's
  // `variation` default is not read by the texture, so it is left out.

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      complexity: range(2, 0, 6),
      color: rgb(0xc0d0ff),
      background: rgb(0x000000),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, complexity: 2, color: 14542335, background: 0, seed: 0 },
        { scale: 0, complexity: 1, color: 42555, background: 15400938, seed: 0 },
        { scale: 0, complexity: 6, color: 13489576, background: 9437297, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = dysonSphere({
    scale: u.scale,
    complexity: u.complexity,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
