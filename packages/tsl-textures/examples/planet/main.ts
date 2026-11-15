// Planet: six terrain bands from deep sea to snow, with an int iteration count
import * as THREE from 'three/webgpu';
import { planet } from 'tsl-textures';
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
      scale: range(2, 0, 4),
      iterations: int(5, 0, 10),
      levelSea: range(0.3, 0, 1),
      levelMountain: range(0.7, 0, 1),
      balanceWater: range(0.3, 0, 1),
      balanceSand: range(0.2, 0, 1),
      balanceSnow: range(0.8, 0, 1),
      colorDeep: rgb(0x4b839f),
      colorShallow: rgb(0xc0e8f6),
      colorBeach: rgb(0xfffde8),
      colorGrass: rgb(0x85dab2),
      colorForest: rgb(0x007800),
      colorSnow: rgb(0xf8ffff),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 1.72, iterations: 5, levelSea: 0.3, levelMountain: 0.464, balanceWater: 0.344, balanceSand: 0.2, balanceSnow: 0.8, colorDeep: 4948895, colorShallow: 12642550, colorBeach: 16776680, colorGrass: 8772274, colorForest: 30720, colorSnow: 16318463, seed: 6235 },
        { scale: 1.72, iterations: 5, levelSea: 0.3, levelMountain: 0.464, balanceWater: 0.344, balanceSand: 0.2, balanceSnow: 0.8, colorDeep: 15790320, colorShallow: 11842740, colorBeach: 16777215, colorGrass: 16777215, colorForest: 16777215, colorSnow: 16777215, seed: 7632 },
        { scale: 1.8, iterations: 7, levelSea: 0.147, levelMountain: 0.464, balanceWater: 0.628, balanceSand: 0.409, balanceSnow: 0.803, colorDeep: 16774656, colorShallow: 14640426, colorBeach: 0, colorGrass: 10427420, colorForest: 16621056, colorSnow: 16770304, seed: 2450 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = planet({
    scale: u.scale,
    iterations: u.iterations,
    levelSea: u.levelSea,
    levelMountain: u.levelMountain,
    balanceWater: u.balanceWater,
    balanceSand: u.balanceSand,
    balanceSnow: u.balanceSnow,
    colorDeep: u.colorDeep,
    colorShallow: u.colorShallow,
    colorBeach: u.colorBeach,
    colorGrass: u.colorGrass,
    colorForest: u.colorForest,
    colorSnow: u.colorSnow,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
