// Water drops: water drops or frost as a normal map, with density and bump
import * as THREE from 'three/webgpu';
import { waterDrops } from 'tsl-textures';
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
      scale: range(1.4, 0, 4),
      density: range(0.5, 0, 1),
      bump: range(0.6, 0, 1),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1, density: 0.5, bump: 0.6, seed: 0 },
        { scale: 0, density: 0.82, bump: 0.6, seed: 4223 },
        { scale: 3.68, density: 0.77, bump: 0.29, seed: 4223 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // waterDrops() is a normal map only, so the material needs its own visible colour.
  material.color = new THREE.Color(0x9fc4e8);
  material.normalNode = waterDrops({
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
