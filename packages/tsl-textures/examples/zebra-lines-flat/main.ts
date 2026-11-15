// Zebra lines on a plane: the flat flag draws the lines for a plane
import * as THREE from 'three/webgpu';
import { zebraLines } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { flag, params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The docs' parameters with their documented ranges (seed and any range the docs omit are my pick).
  const { u } = params(
    stage,
    {
      scale: range(2, 0, 4),
      thinness: range(0.5, 0, 1),
      phi: range(0, 0, Math.PI),
      theta: range(0, -2 * Math.PI, 2 * Math.PI),
      color: rgb(0x000000),
      background: rgb(0xffffff),
      flat: flag(true),
    },
    {
      // The three snapshots on the docs page.
      presets: [
        { scale: 2, thinness: 0.5, phi: 0, theta: 0, color: 0, background: 16777215 },
        { scale: 3.2, thinness: 0.94, phi: 0.94, theta: 2.39, color: 38213, background: 15266795 },
        { scale: 0.92, thinness: 0.52, phi: 0.81, theta: 1.63, color: 9765003, background: 16764662 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = zebraLines({
    scale: u.scale,
    thinness: u.thinness,
    phi: u.phi,
    theta: u.theta,
    color: u.color,
    background: u.background,
    flat: u.flat,
  });
  model(stage, material, { shape: 'plane' });

  stage.start();
  return stage.dispose;
};

export default mount;
