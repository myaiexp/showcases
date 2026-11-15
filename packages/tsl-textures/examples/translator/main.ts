// Translator: positionNode slides vertices above a soft selection layer
import * as THREE from 'three/webgpu';
import { grid, translator } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, xy, xyz } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { distance: 6 });
  const PI = Math.PI;

  const { u } = params(
    stage,
    {
      // No documented range; the docs' second snapshot moves -4 along y.
      distance: xyz(-0.5, 0, 0.2, -4, 4),
      selectorCenter: xyz(0, 0, 0, -3, 3),
      selectorAngles: xy(0, 0, [0, -2 * PI], [PI, 2 * PI]),
      selectorWidth: range(0.7, 0.1, 4),
    },
    {
      presets: [
        { distance: [-0.32, -0.16, -1.52], selectorCenter: [0, 0, 0], selectorAngles: [0, 0], selectorWidth: 0.4992 },
        { distance: [0, -4, 0], selectorCenter: [2.776, 1.2, 0], selectorAngles: [0.74, 1.06], selectorWidth: 4 },
        { distance: [0, -0.64, 0.8], selectorCenter: [0, 0, 0], selectorAngles: [0.74, 1.06], selectorWidth: 0.7137 },
      ],
    },
  );

  const shape = {
    distance: u.distance,
    selectorCenter: u.selectorCenter,
    selectorAngles: u.selectorAngles,
    selectorWidth: u.selectorWidth,
  };
  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.6, metalness: 0, side: THREE.DoubleSide });
  material.positionNode = translator(shape);
  material.normalNode = translator.normal(shape);
  material.colorNode = grid({ countU: 24, countV: 12, thinness: 0.85, color: new THREE.Color(0x0b3d2e), background: new THREE.Color(0xe9f5db) });

  model(stage, material, { shape: 'sphere', dense: true, spin: 1 });

  stage.start();
  return stage.dispose;
};

export default mount;
