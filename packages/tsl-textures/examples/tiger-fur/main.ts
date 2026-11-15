// Tiger fur: tiger stripes with blur, line length and fine hairs
import * as THREE from 'three/webgpu';
import { tigerFur } from 'tsl-textures';
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
      scale: range(2, 0, 4),
      lengths: range(4, 0, 20),
      blur: range(0.3, 0, 1),
      strength: range(0.3, 0, 1),
      hairs: range(0.5, 0, 1),
      color: rgb(0xffaa00),
      bottomColor: rgb(0xffffee),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, lengths: 4, blur: 0.3, strength: 0.3, hairs: 0.5, color: 16755200, bottomColor: 16777198, seed: 0 },
        { scale: 4, lengths: 16, blur: 0.3, strength: 0, hairs: 0.65, color: 14523136, bottomColor: 16513511, seed: 0 },
        { scale: 1.28, lengths: 1.8, blur: 0, strength: 0.3, hairs: 0.02, color: 16777215, bottomColor: 16041852, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = tigerFur({
    scale: u.scale,
    lengths: u.lengths,
    blur: u.blur,
    strength: u.strength,
    hairs: u.hairs,
    color: u.color,
    bottomColor: u.bottomColor,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
