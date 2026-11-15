// Rust: rust on colorNode with a matching opacity layer on opacityNode
import * as THREE from 'three/webgpu';
import { rust } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { int, params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges (seed and any range the docs omit are my pick).
  const { u } = params(
    stage,
    {
      scale: range(2, 0, 14),
      iterations: int(8, 4, 10),
      amount: range(-0.3, -1, 1),
      opacity: range(0.5, 0, 1),
      noise: range(0.5, 0, 1),
      noiseScale: range(0.5, 0, 1),
      color: rgb(0xc08000),
      background: rgb(0x000020),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, iterations: 8, amount: -0.3, opacity: 0.5, noise: 0.5, noiseScale: 0.5, color: 12615680, background: 32, seed: 0 },
        { scale: 10.5, iterations: 7, amount: -0.18, opacity: 0.26, noise: 0, noiseScale: 0.27, color: 8148992, background: 15988468, seed: 0 },
        { scale: 0, iterations: 9, amount: -0.38, opacity: 0.26, noise: 0.41, noiseScale: 0.87, color: 15005691, background: 3297165, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // One options object feeds every slot, as the docs' code example does.
  const options = {
    scale: u.scale,
    iterations: u.iterations,
    amount: u.amount,
    opacity: u.opacity,
    noise: u.noise,
    noiseScale: u.noiseScale,
    color: u.color,
    background: u.background,
    seed: u.seed,
  };
  material.colorNode = rust(options);
  // The docs' second layer: rust.opacity() reads only the shape parameters, and the
  // material must be transparent (and double-sided) for opacityNode to show through.
  material.transparent = true;
  material.opacity = 1;
  material.side = THREE.DoubleSide;
  material.opacityNode = rust.opacity(options);
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
