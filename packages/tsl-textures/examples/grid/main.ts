// Grid: a lat-long grid with even line widths on a sphere, tuned live
import * as THREE from 'three/webgpu';
import { grid } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { flag, params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      countU: range(32, 6, 100, 1),
      countV: range(16, 3, 50, 1),
      aspect: range(1, -4, 4),
      thinness: range(0.8, 0, 1),
      // The layout input is an int: 1 keeps line widths even on an equirectangular sphere.
      equirectangular: flag(true),
      color: rgb(0x000000),
      background: rgb(0xffffff),
    },
    {
      presets: [
        { countU: 32, countV: 16, aspect: 1, thinness: 0.8, equirectangular: true, color: 0, background: 16777215 },
        { countU: 100, countV: 50, aspect: 1, thinness: 0.3, equirectangular: true, color: 16763136, background: 0 },
        { countU: 14, countV: 4, aspect: 1, thinness: 0.09, equirectangular: true, color: 16711422, background: 23278 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // uvs stays at its default, equirectUV(positionGeometry.normalize()), which suits a sphere.
  material.colorNode = grid({
    countU: u.countU,
    countV: u.countV,
    aspect: u.aspect,
    thinness: u.thinness,
    equirectangular: u.equirectangular,
    color: u.color,
    background: u.background,
  });
  model(stage, material);

  stage.start();
  return stage.dispose;
};

export default mount;
