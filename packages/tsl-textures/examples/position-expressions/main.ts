// position takes any TSL expression: stretch, tilt or scroll a texture
import * as THREE from 'three/webgpu';
import { positionGeometry, time, vec3 } from 'three/tsl';
import { dalmatianSpots } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';

const spots = (position: THREE.Node): THREE.MeshStandardNodeMaterial => {
  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  material.colorNode = dalmatianSpots({ position, scale: 2, density: 0.6 });
  return material;
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  lineup(
    stage,
    [
      // The default coordinates.
      { material: spots(positionGeometry), label: 'positionGeometry' },
      // Squeezing y stretches the spots vertically.
      { material: spots(positionGeometry.mul(vec3(1, 0.3, 1))), label: '.mul(vec3(1, 0.3, 1))' },
      // Adding time to y scrolls the pattern over the surface.
      { material: spots(positionGeometry.add(vec3(0, time.mul(0.4), 0))), label: '.add(vec3(0, time, 0))' },
    ],
    { spin: 1 },
  );

  stage.start();
  return stage.dispose;
};

export default mount;
