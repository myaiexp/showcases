// PointerControls on its own: drag to look, right-drag to slide, wheel, inertia and double-press
import * as THREE from 'three';
import { PointerControls, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar, overlay, readout, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const HOME = new THREE.Vector3(0, 0, 3.5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: HOME.toArray(), orbit: false });
  const { camera, canvas } = stage;
  for (let i = 0; i < 3; i++) {
    const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 8000 : 20000, i + 3) });
    knot.position.set((i - 1) * 2.2, 0, -i * 0.8);
    stage.scene.add(knot);
  }

  if (ctx.preview) {
    stage.run((time) => {
      camera.position.set(Math.sin(time * 0.4) * 1.2, 0, 3.5);
      camera.rotation.set(0, Math.sin(time * 0.4) * 0.35, 0);
    });
    return () => stage.dispose();
  }

  const log = readout(el, 'Double-press (or double-tap) the canvas to jump back home.');
  const controls = new PointerControls({
    canvas,
    moveInertia: 0.15,
    rotateInertia: 0.15,
    // Called with the pointer position and the gap between the two presses.
    doublePress: ({ position, intervalMs }) => {
      camera.position.copy(HOME);
      camera.quaternion.identity();
      log.textContent = `double-press at ${position.x.toFixed(0)}, ${position.y.toFixed(0)} px, ${intervalMs.toFixed(0)} ms apart: camera reset`;
    },
  });
  overlay(el, 'drag: look   right-drag / two fingers: slide   wheel: move forward');

  const bar = controlBar(el);
  slider(bar, 'rotateSpeed', 0.0005, 0.006, 0.0005, controls.rotateSpeed, (v) => (controls.rotateSpeed = v));
  slider(bar, 'slideSpeed', 0.001, 0.02, 0.001, controls.slideSpeed, (v) => (controls.slideSpeed = v));
  slider(bar, 'rotateInertia', 0, 0.95, 0.05, controls.rotateInertia, (v) => (controls.rotateInertia = v));
  slider(bar, 'moveInertia', 0, 0.95, 0.05, controls.moveInertia, (v) => (controls.moveInertia = v));
  checkbox(bar, 'reverseRotate', controls.reverseRotate, (v) => (controls.reverseRotate = v));
  checkbox(bar, 'reverseSlide', controls.reverseSlide, (v) => (controls.reverseSlide = v));
  checkbox(bar, 'reverseScroll', controls.reverseScroll, (v) => (controls.reverseScroll = v));

  stage.run((_, dt) => controls.update(dt, camera));
  return () => {
    // PointerControls keeps its document pointer listeners (no dispose), so turn it off.
    controls.enable = false;
    stage.dispose();
  };
};

export default mount;
