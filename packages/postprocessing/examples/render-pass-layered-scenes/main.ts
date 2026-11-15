// Two scenes through two RenderPasses, the second with its own clear off, and a depth clear between
import * as THREE from 'three';
import { ClearPass, CopyPass, EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // A second scene: a glowing ring that sweeps through the first scene's objects.
  const overlayScene = new THREE.Scene();
  overlayScene.add(new THREE.HemisphereLight(0xffffff, 0x404060, 1.5));
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.18, 24, 96),
    new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0xffc93f, emissiveIntensity: 1.2 }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.9;
  overlayScene.add(ring);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // Wipes only the depth buffer, so the second scene is no longer hidden behind the first.
  const depthClear = new ClearPass(false, true, false);
  composer.addPass(depthClear);
  const second = new RenderPass(overlayScene, stage.camera);
  // clear off: keep what the first RenderPass drew. No background on this scene either.
  second.clearPass.enabled = false;
  composer.addPass(second);
  composer.addPass(new CopyPass());

  const label = overlay(stage.box);
  const set = (on: boolean): void => {
    depthClear.enabled = on;
    label.textContent = on ? 'depth cleared between passes: the ring is always in front' : 'depth kept: the ring passes through the scene';
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'ClearPass(depth) between', false, set);
  else {
    let on = false;
    stage.every(2500, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    ring.rotation.set(Math.PI / 2 + Math.sin(t * 0.7) * 0.5, Math.cos(t * 0.5) * 0.5, 0);
    composer.render(dt);
  });
  stage.onDispose(() => {
    ring.geometry.dispose();
    ring.material.dispose();
  });
  return () => stage.dispose();
};

export default mount;
