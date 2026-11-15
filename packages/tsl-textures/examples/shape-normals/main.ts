// rotator() with and without rotator.normal(): the same twist, lit two ways
import * as THREE from 'three/webgpu';
import { grid, rotator } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { params, range, xy, xyz } from '../../shared/params.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const PI = Math.PI;
  const { u } = params(
    stage,
    {
      angles: xyz(0, 0, 0, -PI, PI),
      selectorAngles: xy(0, 0, [0, -2 * PI], [PI, 2 * PI]),
      selectorWidth: range(2, 0.1, 4),
    },
    {
      presets: [
        { angles: [0, -1.26, 0], selectorAngles: [0, 0], selectorWidth: 2 },
        { angles: [0, 0, 1.57], selectorAngles: [1.59, 0], selectorWidth: 1.06 },
        { angles: [1.2, 0, 0], selectorAngles: [0.8, 1], selectorWidth: 1.5 },
      ],
    },
  );

  const shape = { angles: u.angles, selectorAngles: u.selectorAngles, selectorWidth: u.selectorWidth };
  const grid1 = grid({ countU: 24, countV: 12, thinness: 0.85, color: new THREE.Color(0x1d3557), background: new THREE.Color(0xf1faee) });
  const make = (withNormal: boolean): THREE.MeshStandardNodeMaterial => {
    const m = new THREE.MeshStandardNodeMaterial({ roughness: 0.3, metalness: 0.1 });
    // The vertices move the same way in both materials.
    m.positionNode = rotator(shape);
    // Only this slot differs: rotator.normal() works out the moved surface's normal.
    if (withNormal) m.normalNode = rotator.normal(shape);
    m.colorNode = grid1;
    return m;
  };
  const meshes = lineup(
    stage,
    [
      { material: make(false), label: 'rotator()' },
      { material: make(true), label: 'rotator() + rotator.normal()' },
    ],
    { spin: 1 },
  );
  // .normal() reads tangentLocal and lineup adds no tangents: compute them on the shared geometry.
  meshes[0]!.geometry.computeTangents();

  stage.start();
  return stage.dispose;
};

export default mount;
