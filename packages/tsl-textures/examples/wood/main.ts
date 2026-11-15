// Wood: tree rings and fibres at an angle
import * as THREE from 'three/webgpu';
import { wood } from 'tsl-textures';
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
      scale: range(2.5, 1, 4),
      rings: range(4.5, 1, 10),
      lengths: range(1, 1, 10),
      angle: range(0, -90, 90),
      fibers: range(0.3, 0, 1),
      fibersDensity: range(10, 2, 15),
      color: rgb(0xe7aa00),
      background: rgb(0xaa5900),
      seed: range(0, 0, 10000, 1),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2.5, rings: 4.5, lengths: 1, angle: 0, fibers: 0.3, fibersDensity: 10, color: 15182336, background: 11163904, seed: 0 },
        { scale: 1.959, rings: 4.689, lengths: 1, angle: 0, fibers: 0.26, fibersDensity: 2.002, color: 16573123, background: 12165528, seed: 5249 },
        { scale: 3.519, rings: 4.059, lengths: 3.339, angle: -88.2, fibers: 0, fibersDensity: 2, color: 12883080, background: 15717796, seed: 5412 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = wood({
    scale: u.scale,
    rings: u.rings,
    lengths: u.lengths,
    angle: u.angle,
    fibers: u.fibers,
    fibersDensity: u.fibersDensity,
    color: u.color,
    background: u.background,
    seed: u.seed,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
