// Brain: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { brain } from 'tsl-textures';
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
      smooth: range(0.5, 0, 1),
      wave: range(0.5, 0, 1),
      speed: range(2.5, 0, 10),
      color: rgb(0xffd0d0),
      background: rgb(0x500000),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 0.8, smooth: 1, wave: 0.5, speed: 2.5, color: 16765136, background: 5242880, seed: 0 },
        { scale: 1, smooth: 0.63, wave: 0.56, speed: 9.3, color: 6053215, background: 11315967, seed: 0 },
        { scale: 4, smooth: 1, wave: 0.15, speed: 10, color: 16711680, background: 16645888, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // brain.md assigns brain() to normalNode, but brain() is the colour and ignores wave, speed
  // and time. brain.normal() is the animated normal, so it goes on normalNode.
  material.colorNode = brain({
    scale: u.scale,
    smooth: u.smooth,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  material.normalNode = brain.normal({
    scale: u.scale,
    smooth: u.smooth,
    wave: u.wave,
    speed: u.speed,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
