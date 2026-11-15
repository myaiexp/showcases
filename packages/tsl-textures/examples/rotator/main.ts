// Rotator: positionNode turns vertices above a soft selection layer
import * as THREE from 'three/webgpu';
import { grid, rotator } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, xy, xyz } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { distance: 5 });
  const PI = Math.PI;

  const { u } = params(
    stage,
    {
      angles: xyz(0, 0, 0, -PI, PI),
      center: xyz(0, 0, 0, -2, 2),
      selectorCenter: xyz(0, 0, 0, -2, 2),
      // φ in [0, π], θ in [-2π, 2π], as the docs give them.
      selectorAngles: xy(0, 0, [0, -2 * PI], [PI, 2 * PI]),
      selectorWidth: range(2, 0.1, 4),
    },
    {
      presets: [
        { angles: [0, -1.26, 0], center: [0, 0, 0], selectorCenter: [0, 0, 0], selectorAngles: [0, 0], selectorWidth: 2 },
        { angles: [0, 0, 1.57], center: [0, 0, 0], selectorCenter: [0, 0, 0], selectorAngles: [1.59, 0], selectorWidth: 1.0569 },
        { angles: [0, 0, 3.14], center: [1, 0, 0], selectorCenter: [0, 0, 0], selectorAngles: [0, 0], selectorWidth: 2 },
      ],
    },
  );

  // The same parameters go to both slots: positionNode moves the vertices and
  // normalNode gives the moved surface matching normals, so it lights correctly.
  const shape = {
    angles: u.angles,
    center: u.center,
    selectorCenter: u.selectorCenter,
    selectorAngles: u.selectorAngles,
    selectorWidth: u.selectorWidth,
  };
  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.6, metalness: 0 });
  material.positionNode = rotator(shape);
  material.normalNode = rotator.normal(shape);
  // A grid texture on top, so the twist is easy to follow.
  material.colorNode = grid({ countU: 24, countV: 12, thinness: 0.85, color: new THREE.Color(0x1d3557), background: new THREE.Color(0xf1faee) });

  // Shape textures move vertices, so the model needs a dense mesh.
  model(stage, material, { shape: 'cube', dense: true, spin: 1 });

  stage.start();
  return stage.dispose;
};

export default mount;
