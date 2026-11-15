// Gas giant: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { gasGiant } from 'tsl-textures';
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
      turbulence: range(0.3, 0, 1),
      blur: range(0.6, 0, 1),
      colorA: rgb(0xfff8f0),
      colorB: rgb(0xf0e8b0),
      colorC: rgb(0xafa0d0),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1.28, turbulence: 0.53, blur: 0.6, colorA: 16775408, colorB: 16777215, colorC: 15715786, seed: 1756 },
        { scale: 0, turbulence: 1, blur: 0.59, colorA: 16777215, colorB: 16774079, colorC: 13697024, seed: 831 },
        { scale: 0.4, turbulence: 0.35, blur: 1, colorA: 11652607, colorB: 8900052, colorC: 16711680, seed: 7109 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = gasGiant({
    scale: u.scale,
    turbulence: u.turbulence,
    blur: u.blur,
    colorA: u.colorA,
    colorB: u.colorB,
    colorC: u.colorC,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
