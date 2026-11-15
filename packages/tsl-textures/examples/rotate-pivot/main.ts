// rotatePivot(): vertices turn by Euler angles around a pivot point you can move
import * as THREE from 'three/webgpu';
import { normalLocal, positionGeometry, transformNormalToView, vec3 } from 'three/tsl';
import { rotatePivot } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, xyz } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { distance: 5 });
  const PI = Math.PI;
  const { u } = params(stage, {
    pivot: xyz(0.9, 0.9, 0, -1.5, 1.5),
    angle: xyz(0, 0.6, 0, -PI, PI),
    twist: range(0, -3, 3),
  });

  // The angle may differ per vertex: here the y turn grows with height, so the cube twists.
  const angle = vec3(u.angle.x, u.angle.y.add(positionGeometry.y.mul(u.twist)), u.angle.z);
  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.5, metalness: 0 });
  // rotatePivot(vector, pivot, angle): subtract the pivot, rotate, add it back.
  material.positionNode = rotatePivot(positionGeometry, u.pivot, angle);
  // Normals only turn (about the origin) by the same angles.
  material.normalNode = transformNormalToView(rotatePivot(normalLocal, vec3(0), angle));
  // Colour by the unmoved position, so every vertex keeps its colour while it travels.
  material.colorNode = positionGeometry.mul(0.45).add(0.5);

  const mesh = model(stage, material, { shape: 'cube', dense: true, spin: 0, tangents: false, picker: false });

  // A small marker on the pivot, in the model's own space.
  const marker = stage.own(new THREE.SphereGeometry(0.07, 16, 8));
  const dot = new THREE.Mesh(marker, stage.own(new THREE.MeshBasicMaterial({ color: 0xff3b6b })));
  mesh.add(dot);
  stage.frame((t) => {
    if (stage.preview) {
      u.angle.value.set(0, 0.8 * Math.sin(t * 0.9), 0.4 * Math.sin(t * 0.5));
      u.pivot.value.set(0.9 * Math.cos(t * 0.4), 0.9, 0.9 * Math.sin(t * 0.4));
    }
    dot.position.copy(u.pivot.value);
  });

  stage.start();
  return stage.dispose;
};

export default mount;
