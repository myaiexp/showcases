// Clouds: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { clouds } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: 0x2a4a78, distance: 4.6 });

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      density: range(0.5, 0, 1),
      opacity: range(1, 0, 1),
      color: rgb(0xffffff),
      subcolor: rgb(0xa0a0b0),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, density: 0.62, opacity: 1, color: 16777215, subcolor: 10526896, seed: 0 },
        { scale: 3.84, density: 0.95, opacity: 0.15, color: 0, subcolor: 16772864, seed: 8318 },
        { scale: 1.48, density: 0.79, opacity: 0.22, color: 16711680, subcolor: 16711909, seed: 8318 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = clouds({
    scale: u.scale,
    density: u.density,
    opacity: u.opacity,
    color: u.color,
    subcolor: u.subcolor,
    seed: u.seed,
  });
  // The alpha comes from the companion clouds.opacity(), which has no colours.
  material.transparent = true;
  material.opacity = 1;
  material.side = THREE.DoubleSide;
  material.opacityNode = clouds.opacity({
    scale: u.scale,
    density: u.density,
    opacity: u.opacity,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
