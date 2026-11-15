// MaskPass examples: stencil stage options, mask shapes, and the unmasked-pixel copy
import * as THREE from 'three';
import { CopyMaterial, ShaderPass } from 'postprocessing';
import type { StageOptions } from './stage.ts';

/** The renderer needs a stencil buffer for the canvas; the composer needs `stencilBuffer: true` as well. */
export const STENCIL_STAGE: StageOptions = { renderer: { stencil: true }, position: [0, 2.2, 8], target: [0, 1.2, 0], orbit: 0.08 };

export interface MaskShapes {
  /** Two meshes drawn into their own scene: the MaskPass renders this scene with the main camera. */
  scene: THREE.Scene;
  a: THREE.Mesh;
  b: THREE.Mesh;
  update(t: number): void;
  dispose(): void;
}

/** A sphere and a box drifting across the view. Their colour never shows: a MaskPass only writes stencil. */
export function maskShapes(): MaskShapes {
  const scene = new THREE.Scene();
  const material = new THREE.MeshBasicMaterial();
  const a = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 20), material);
  const b = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 2.2), material);
  scene.add(a, b);
  return {
    scene,
    a,
    b,
    update(t) {
      a.position.set(Math.sin(t * 0.7) * 2.2, 1.4 + Math.sin(t * 1.3) * 0.3, 0.5);
      b.position.set(Math.cos(t * 0.5) * 2.6, 1.4, -0.5);
      b.rotation.set(t * 0.6, t * 0.8, 0);
    },
    dispose() {
      a.geometry.dispose();
      b.geometry.dispose();
      material.dispose();
    },
  };
}

/**
 * A pass that copies the input buffer into the output buffer without swapping them. Add it just
 * before a MaskPass: postprocessing 6.39.6's composer means to copy the pixels outside the mask
 * across after each masked pass, but its internal CopyPass renders into its own target instead of
 * the output buffer, so those pixels are lost. Copying them first leaves them in place.
 */
export function keepUnmasked(): ShaderPass {
  const pass = new ShaderPass(new CopyMaterial());
  pass.needsSwap = false;
  return pass;
}
