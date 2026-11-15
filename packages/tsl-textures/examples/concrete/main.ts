// Concrete: a grain bump map on normalNode
import * as THREE from 'three/webgpu';
import { concrete } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      density: range(0.5, 0, 1),
      bump: range(0.5, -2, 2),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, density: 0.5, bump: 1.72, seed: 0 },
        { scale: 0, density: 0.63, bump: 2, seed: 0 },
        { scale: 2.6, density: 0.14, bump: -2, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.8, metalness: 0 });
  // A normal-only texture: it shades a surface, so the material needs its own base colour.
  material.color = new THREE.Color(0xb4b0aa);
  material.normalNode = concrete({
    scale: u.scale,
    density: u.density,
    bump: u.bump,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
