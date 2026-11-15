// Isolayers: a procedural texture on a node material, tuned live
import * as THREE from 'three/webgpu';
import { isolayers } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, int, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      layers: int(10, 3, 30),
      edge: range(0.5, 0, 1),
      darkness: range(0, 0, 1),
      color: rgb(0xfffff0),
      background: rgb(0xff4040),
      seed: range(0, 0, 100, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, layers: 10, edge: 0.5, darkness: 0, color: 16777200, background: 16728128, seed: 0 },
        { scale: 2.28, layers: 4, edge: 0.5, darkness: 1, color: 16777215, background: 13618123, seed: 0 },
        { scale: 3, layers: 10, edge: 1, darkness: 0.03, color: 16776170, background: 8136192, seed: 0 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = isolayers({
    scale: u.scale,
    layers: u.layers,
    edge: u.edge,
    darkness: u.darkness,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
