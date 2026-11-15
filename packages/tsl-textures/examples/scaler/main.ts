// Scaler: positionNode scales vertices above a soft selection layer
import * as THREE from 'three/webgpu';
import { grid, scaler } from 'tsl-textures';
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
      // The docs give no range for the scale factors; 0.01 flattens an axis.
      scales: xyz(0.01, 0.9, 1.7, 0.01, 2),
      center: xyz(0, 0, 0, -2, 2),
      selectorCenter: xyz(0, 0, 0, -2, 2),
      selectorAngles: xy(0, 0, [0, -2 * PI], [PI, 2 * PI]),
      selectorWidth: range(2, 0.1, 4),
    },
    {
      presets: [
        { scales: [0.01, 1.25, 0.01], center: [0, 0, 0], selectorCenter: [0, 0, 0], selectorAngles: [0, 0], selectorWidth: 2 },
        { scales: [0.01, 0.01, 1.49], center: [0, 0, 0], selectorCenter: [-0.112, -0.024, 0.936], selectorAngles: [1.56, 0], selectorWidth: 1.6965 },
        { scales: [0.01, 0.77, 1.7], center: [0, 0, 0], selectorCenter: [0, 0, 0], selectorAngles: [0.77, 6.283185307179586], selectorWidth: 1.3104 },
      ],
    },
  );

  // One parameter set for both slots: positionNode moves, normalNode relights.
  const shape = {
    scales: u.scales,
    center: u.center,
    selectorCenter: u.selectorCenter,
    selectorAngles: u.selectorAngles,
    selectorWidth: u.selectorWidth,
  };
  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.6, metalness: 0, side: THREE.DoubleSide });
  material.positionNode = scaler(shape);
  material.normalNode = scaler.normal(shape);
  material.colorNode = grid({ countU: 24, countV: 12, thinness: 0.85, color: new THREE.Color(0x3d1d57), background: new THREE.Color(0xfdf0d5) });

  model(stage, material, { shape: 'sphere', dense: true, spin: 1 });

  stage.start();
  return stage.dispose;
};

export default mount;
