// Voronoi cells: Worley noise cells with facet and colour variation
import * as THREE from 'three/webgpu';
import { voronoiCells } from 'tsl-textures';
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
      variation: range(0, 0, 1),
      facet: range(0, 0, 1),
      color: rgb(0x000000),
      background: rgb(0xc0d0ff),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, variation: 0, facet: 0, color: 0, background: 12636415, seed: 0 },
        { scale: 1.4, variation: 0.6, facet: 1, color: 16711680, background: 15466431, seed: 0 },
        { scale: 1.28, variation: 0, facet: 0, color: 16777215, background: 34360, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = voronoiCells({
    scale: u.scale,
    variation: u.variation,
    facet: u.facet,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
