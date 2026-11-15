// Bricks: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { bricks } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb, xyz } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // The docs give no range for brickSize or jointSize, and jointSpan's [0, 0.2] excludes its own
  // default 0.5, so those ranges are picked to cover the snapshots.

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      brickSize: xyz(2, 1, 2, 0.25, 4),
      brickShift: range(2, 1, 4),
      jointSize: range(0.05, 0, 0.2),
      jointSpan: range(0.5, 0, 1),
      jointJitter: range(0.5, 0, 1),
      jointBlur: range(0.03, 0, 1),
      noiseSize: range(0.5, 0, 1),
      noiseStrength: range(0.2, 0, 1),
      colorShade: range(0.5, 0, 1),
      color: rgb(0xff4000),
      additional: rgb(0xd0a030),
      background: rgb(0xaaaaaa),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, brickSize: [2,1,2], brickShift: 2, jointSize: 0.05, jointSpan: 0.5, jointJitter: 0.5, jointBlur: 0.03, noiseSize: 0.5, noiseStrength: 0.2, colorShade: 0.5, color: 16728064, additional: 13672496, background: 11184810, seed: 0 },
        { scale: 1.76, brickSize: [3.762,1,2], brickShift: 2.919, jointSize: 0.0804, jointSpan: 0, jointJitter: 0, jointBlur: 0.03, noiseSize: 0.5, noiseStrength: 0, colorShade: 0, color: 13579520, additional: 13579520, background: 16777215, seed: 0 },
        { scale: 2.04, brickSize: [1,1,1], brickShift: 1, jointSize: 0, jointSpan: 0, jointJitter: 0, jointBlur: 0.2, noiseSize: 0.43, noiseStrength: 0, colorShade: 0, color: 15006719, additional: 12180735, background: 16777215, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = bricks({
    scale: u.scale,
    brickSize: u.brickSize,
    brickShift: u.brickShift,
    jointSize: u.jointSize,
    jointSpan: u.jointSpan,
    jointJitter: u.jointJitter,
    jointBlur: u.jointBlur,
    noiseSize: u.noiseSize,
    noiseStrength: u.noiseStrength,
    colorShade: u.colorShade,
    color: u.color,
    additional: u.additional,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material, { shape: 'cube' });

  stage.start();
  return stage.dispose;
};

export default mount;
