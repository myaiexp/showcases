// Depth of field examples: the corridor stage options and a string of bright lamps
import * as THREE from 'three';
import type { StageOptions } from './stage.ts';

/** Stage options for examples on `corridor()`: a fixed camera looking down the hall, far plane at 60. */
export const DOF_STAGE: StageOptions = { position: [0, 1.4, 6], target: [0, 1, -10], orbit: false, far: 60, fov: 45 };

/**
 * Bright lamps strung down both sides of the corridor, at different depths. Their colour is far
 * above 1, so they only blow out into big bokeh discs with a HalfFloat composer.
 */
export function lamps(scene: THREE.Scene): void {
  const mat = new THREE.MeshBasicMaterial();
  mat.color.setRGB(6, 4.5, 2);
  const cool = new THREE.MeshBasicMaterial();
  cool.color.setRGB(2, 4, 6);
  for (let i = 0; i < 16; i++) {
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 8), i % 2 ? cool : mat);
    lamp.position.set((i % 4 < 2 ? -1 : 1) * (1.2 + (i % 3) * 0.35), 2.2 + (i % 5) * 0.12, 4 - i * 2.4);
    scene.add(lamp);
  }
}
