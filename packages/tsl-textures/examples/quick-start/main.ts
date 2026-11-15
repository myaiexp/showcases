// The README's usage code: polkaDots() on the colorNode of a node material
// Important: the webgpu build of three.js, and import textures from the package root.
// (The README's `tsl-textures/polka-dots` subpath is not in the package's exports.)
import * as THREE from 'three/webgpu';
import { polkaDots } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  // The stage makes the WebGPURenderer, scene, camera and lights.
  const stage = await createStage(el, ctx, { distance: 3.6, panel: false });

  const objectGeometry = stage.own(new THREE.IcosahedronGeometry(1, 12));

  // A Node material, so it has the *Node slots.
  const objectMaterial = stage.own(
    new THREE.MeshStandardNodeMaterial({
      color: 0xcccccc,
      roughness: 0.5,
      metalness: 0.0,
    }),
  );

  // The texture goes on the material's colorNode.
  objectMaterial.colorNode = polkaDots({
    count: 2,
    size: 0.6,
    blur: 0.22,
    color: new THREE.Color(0),
    background: new THREE.Color(16777215),
  });

  const object = new THREE.Mesh(objectGeometry, objectMaterial);
  stage.scene.add(object);

  stage.frame((t) => {
    object.rotation.set(t * 0.13, t * 0.21, 0);
  });
  stage.start();
  return stage.dispose;
};

export default mount;
