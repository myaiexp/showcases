// Runny eggs: colour, normal and roughness functions of runny eggs on one material
import * as THREE from 'three/webgpu';
import { runnyEggs } from 'tsl-textures';
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
      scale: range(1, 0, 4),
      sizeYolk: range(0.2, 0, 1),
      sizeWhite: range(0.7, 0, 1),
      colorYolk: rgb(0xffa500),
      colorWhite: rgb(0xffffff),
      colorBackground: rgb(0xd3d3d3),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 0.8, sizeYolk: 0.2, sizeWhite: 0.7, colorYolk: 16753920, colorWhite: 16777215, colorBackground: 13882323, seed: 0 },
        { scale: 0.6, sizeYolk: 0.41, sizeWhite: 0.7, colorYolk: 16753920, colorWhite: 16777215, colorBackground: 47183, seed: 4733 },
        { scale: 2.64, sizeYolk: 0.24, sizeWhite: 0.43, colorYolk: 0, colorWhite: 12007, colorBackground: 12238581, seed: 4733 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // One options object feeds every slot, as the docs' code example does.
  const options = {
    scale: u.scale,
    sizeYolk: u.sizeYolk,
    sizeWhite: u.sizeWhite,
    colorYolk: u.colorYolk,
    colorWhite: u.colorWhite,
    colorBackground: u.colorBackground,
    seed: u.seed,
  };
  material.colorNode = runnyEggs(options);
  // The normal and roughness functions read the same parameters; the vertex tangent
  // they need comes from the geometry (see tangents below).
  material.normalNode = runnyEggs.normal(options);
  material.roughnessNode = runnyEggs.roughness(options);
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
