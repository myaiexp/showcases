// Waves: animated waves with foam, plus an opacity layer
import * as THREE from 'three/webgpu';
import { waves } from 'tsl-textures';
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
      speed: range(0, -2, 2),
      level: range(-0.4, -1, 1),
      rough: range(10, 1, 15),
      height: range(0.5, 0, 1),
      foamSize: range(0.2, 0, 1),
      foamEdge: range(0.5, 0, 1),
      color: rgb(0xffffff),
      background: rgb(0x2060ff),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, speed: 0, level: -0.4, rough: 10, height: 0.5, foamSize: 0.2, foamEdge: 0.5, color: 16777215, background: 2121983, seed: 0 },
        { scale: 0.88, speed: -0.16, level: -0.02, rough: 1, height: 0.5, foamSize: 0, foamEdge: 1, color: 16711680, background: 16769781, seed: 0 },
        { scale: 2.36, speed: -0.16, level: -0.26, rough: 14, height: 1, foamSize: 0.83, foamEdge: 0, color: 11141120, background: 16641536, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // One options object feeds every slot, as the docs' code example does.
  const options = {
    scale: u.scale,
    speed: u.speed,
    level: u.level,
    rough: u.rough,
    height: u.height,
    foamSize: u.foamSize,
    foamEdge: u.foamEdge,
    color: u.color,
    background: u.background,
    seed: u.seed,
  };
  material.colorNode = waves(options);
  // The docs' second layer: waves.opacity() reads only the shape parameters, and the
  // material must be transparent (and double-sided) for opacityNode to show through.
  material.transparent = true;
  material.opacity = 1;
  material.side = THREE.DoubleSide;
  material.opacityNode = waves.opacity(options);
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
