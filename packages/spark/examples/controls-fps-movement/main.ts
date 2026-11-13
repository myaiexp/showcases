// FpsMovement on its own, with a remapped keyboard layout and live speed settings
import * as THREE from 'three';
import { FpsMovement, SplatMesh, constructGrid } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, readout, select, slider } from '../../shared/controls.ts';

// keycodeMoveMapping maps KeyboardEvent.code to a direction in the camera's frame.
const LAYOUTS = {
  'WASD + R/F up/down': {
    KeyW: new THREE.Vector3(0, 0, -1),
    KeyS: new THREE.Vector3(0, 0, 1),
    KeyA: new THREE.Vector3(-1, 0, 0),
    KeyD: new THREE.Vector3(1, 0, 0),
    KeyR: new THREE.Vector3(0, 1, 0),
    KeyF: new THREE.Vector3(0, -1, 0),
  },
  'IJKL + U/O up/down': {
    KeyI: new THREE.Vector3(0, 0, -1),
    KeyK: new THREE.Vector3(0, 0, 1),
    KeyJ: new THREE.Vector3(-1, 0, 0),
    KeyL: new THREE.Vector3(1, 0, 0),
    KeyU: new THREE.Vector3(0, 1, 0),
    KeyO: new THREE.Vector3(0, -1, 0),
  },
};
type Layout = keyof typeof LAYOUTS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 4], orbit: false });
  const { camera } = stage;
  // A lattice of splat points so motion through space is easy to read.
  const lattice = new SplatMesh({
    constructSplats: (splats) =>
      constructGrid({
        splats,
        extents: new THREE.Box3(new THREE.Vector3(-3, -2, -3), new THREE.Vector3(3, 2, 3)),
        stepSize: ctx.preview ? 0.5 : 0.25,
        pointRadius: 0.02,
      }),
  });
  stage.scene.add(lattice);

  if (ctx.preview) {
    stage.run((time) => {
      camera.position.set(Math.sin(time * 0.3) * 1.5, Math.sin(time * 0.2) * 0.8, 4 - ((time * 0.6) % 7));
      camera.rotation.set(0, Math.sin(time * 0.3) * 0.4, 0);
    });
    return () => stage.dispose();
  }

  const fps = new FpsMovement({
    moveSpeed: 1,
    rotateSpeed: 2,
    keycodeMoveMapping: LAYOUTS['WASD + R/F up/down'],
    shiftMultiplier: 5,
    ctrlMultiplier: 0.2,
  });
  overlay(el, 'Keys move you; arrow keys turn (keycodeRotateMapping default). Hold Shift to speed up, Ctrl to creep.');
  const bar = controlBar(el);
  select(bar, 'layout', Object.keys(LAYOUTS) as Layout[], (v) => (fps.keycodeMoveMapping = LAYOUTS[v]));
  slider(bar, 'moveSpeed', 0.2, 5, 0.1, fps.moveSpeed, (v) => (fps.moveSpeed = v));
  slider(bar, 'rotateSpeed', 0.5, 5, 0.1, fps.rotateSpeed, (v) => (fps.rotateSpeed = v));
  slider(bar, 'shiftMultiplier', 1, 10, 0.5, fps.shiftMultiplier, (v) => (fps.shiftMultiplier = v));
  const pose = readout(el);

  stage.run((_, dt) => {
    // update() takes seconds since the last frame and the object to move.
    fps.update(dt, camera);
    const p = camera.position;
    pose.textContent = `position ${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}`;
  });
  return () => {
    // FpsMovement keeps its document key listeners (it has no dispose), so turn it off.
    fps.enable = false;
    stage.dispose();
  };
};

export default mount;
