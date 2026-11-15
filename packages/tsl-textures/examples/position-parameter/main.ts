// position: positionGeometry follows the model, positionWorld the scene
import * as THREE from 'three/webgpu';
import { positionGeometry, positionWorld } from 'three/tsl';
import { camouflage } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lineup } from '../../shared/lineup.ts';
import { note } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);

  // The default: model coordinates, so the pattern travels and turns with the mesh.
  const onModel = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  onModel.colorNode = camouflage({ position: positionGeometry, scale: 1.6 });

  // World coordinates: the pattern stays put and the mesh moves through it.
  const inWorld = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  inWorld.colorNode = camouflage({ position: positionWorld, scale: 1.6 });

  const meshes = lineup(
    stage,
    [
      { material: onModel, label: 'position: positionGeometry' },
      { material: inWorld, label: 'position: positionWorld' },
    ],
    { spin: 3 },
  );

  // Slide both meshes up and down by the same amount.
  const home = meshes.map((m) => m.position.y);
  stage.frame((t) => {
    meshes.forEach((m, i) => (m.position.y = home[i]! + Math.sin(t * 0.9) * 0.6));
  });

  if (stage.panel) {
    note(stage.panel, 'Both spheres spin and slide. The left pattern moves with its sphere; the right one stays fixed in space while the sphere passes through it.');
  }

  stage.start();
  return stage.dispose;
};

export default mount;
