// Dalmatian spots: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { dalmatianSpots } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      density: range(0.6, 0, 1),
      color: rgb(0xffffff),
      background: rgb(0x000000),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, density: 0.6, color: 16777215, background: 0, seed: 0 },
        { scale: 0.384, density: 0.852, color: 16777215, background: 0, seed: 1307 },
        { scale: 1.564, density: 0.748, color: 15129522, background: 16777215, seed: 1307 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = dalmatianSpots({
    scale: u.scale,
    density: u.density,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
