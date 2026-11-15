// Crumpled fabric: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { crumpledFabric } from 'tsl-textures';
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
      pinch: range(0.5, 0, 1),
      color: rgb(0xb0f0ff),
      subcolor: rgb(0x4040f0),
      background: rgb(0x003000),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, pinch: 0.5, color: 11596031, subcolor: 4210928, background: 12288, seed: 0 },
        { scale: 1.32, pinch: 0.67, color: 16774833, subcolor: 15745088, background: 12288, seed: 0 },
        { scale: 3.372, pinch: 0.278, color: 16777215, subcolor: 45463, background: 2791077, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = crumpledFabric({
    scale: u.scale,
    pinch: u.pinch,
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
