// SplatSkinning: a dual-quaternion bone chain bending a splat worm
import * as THREE from 'three';
import { SplatMesh, SplatSkinning, SplatSkinningMode } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { NUM_BONES, SEGMENT, bindToChain, pushWorm } from './worm.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 3.4], orbit: 0.15 });
  const count = ctx.preview ? 12000 : 28000;
  let bend = 0.5; // radians between neighbouring bones
  let speed = 1.2;

  let skinning: SplatSkinning | null = null;
  const worm = new SplatMesh({
    constructSplats: (splats) => pushWorm(splats, count),
    onLoad: (mesh) => {
      skinning = new SplatSkinning({ mesh, numSplats: count, numBones: NUM_BONES, mode: SplatSkinningMode.DUAL_QUATERNION });
      // Rest pose: each bone sits on the Y axis, unrotated.
      const none = new THREE.Quaternion();
      for (let b = 0; b < NUM_BONES; b++) skinning.setRestQuatPos(b, none, new THREE.Vector3(0, -1 + b * SEGMENT, 0));
      bindToChain(mesh, skinning);
      mesh.skinning = skinning;
      mesh.updateGenerator();
    },
  });
  stage.scene.add(worm);

  const quat = new THREE.Quaternion();
  const pos = new THREE.Vector3();
  const zAxis = new THREE.Vector3(0, 0, 1);
  // Forward kinematics: each bone turns by its own wave on top of its parent's angle.
  const pose = (time: number): void => {
    if (!skinning) return;
    let angle = 0;
    pos.set(0, -1, 0);
    for (let b = 0; b < NUM_BONES; b++) {
      angle += bend * Math.sin(time * speed - b * 0.9);
      skinning.setBoneQuatPos(b, quat.setFromAxisAngle(zAxis, angle), pos);
      pos.x += -Math.sin(angle) * SEGMENT;
      pos.y += Math.cos(angle) * SEGMENT;
    }
    // Re-upload the bone texture and mark the mesh for regeneration.
    skinning.updateBones();
  };

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'bend per bone (rad)', 0, 1, 0.05, bend, (v) => (bend = v));
    slider(bar, 'speed', 0, 4, 0.1, speed, (v) => (speed = v));
  }

  stage.run((time) => pose(time));
  return () => {
    skinning?.skinTexture.dispose();
    skinning?.boneTexture.dispose();
    stage.dispose();
  };
};

export default mount;
