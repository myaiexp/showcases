// Grid flat: screenUV coordinates give a flat surface an even screen-space grid
import * as THREE from 'three/webgpu';
import { screenSize, screenUV } from 'three/tsl';
import { grid } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, rgb } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  const { u } = params(
    stage,
    {
      countU: range(32, 6, 100, 1),
      countV: range(16, 3, 50, 1),
      thinness: range(0.8, 0, 1),
      color: rgb(0x000000),
      background: rgb(0xffffff),
    },
    {
      presets: [
        { countU: 32, countV: 16, thinness: 0.8, color: 0, background: 16777215 },
        { countU: 100, countV: 50, thinness: 0.3, color: 16763136, background: 0 },
        { countU: 14, countV: 4, thinness: 0.09, color: 16711422, background: 23278 },
      ],
    },
  );

  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // The docs: for flat surfaces screenUV is better than the default equirectangular uvs.
  // The grid is then drawn in screen space (the plane is a window onto it), so the
  // equirectangular correction is off and aspect is log2(width / height), the value
  // the source keeps in $replaceExportASP, so lines run the same width across and down.
  material.colorNode = grid({
    uvs: screenUV,
    countU: u.countU,
    countV: u.countV,
    aspect: screenSize.x.div(screenSize.y).log2(),
    thinness: u.thinness,
    equirectangular: 0,
    color: u.color,
    background: u.background,
  });
  model(stage, material, { shape: 'plane' });

  stage.start();
  return stage.dispose;
};

export default mount;
