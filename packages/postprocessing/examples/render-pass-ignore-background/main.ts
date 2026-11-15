// RenderPass ignoreBackground and the ClearPass clear colour that replaces the scene background
import * as THREE from 'three';
import { EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { background: null });
  const subject = showroom(stage.scene);

  // The scene background is a vertical gradient; the renderer's clear colour is flat orange.
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#1f3b8a');
  grad.addColorStop(1, '#8a3fb0');
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 256);
  const backdrop = stage.own(new THREE.CanvasTexture(c));
  backdrop.colorSpace = THREE.SRGBColorSpace;
  stage.scene.background = backdrop;
  stage.renderer.setClearColor(0xff7a1a);

  const composer = stage.own(new EffectComposer(stage.renderer));
  const renderPass = new RenderPass(stage.scene, stage.camera);
  composer.addPass(renderPass);

  const label = overlay(stage.box);
  const set = (ignore: boolean): void => {
    renderPass.ignoreBackground = ignore;
    label.textContent = ignore ? 'ignoreBackground = true: the clear colour shows' : 'ignoreBackground = false: scene.background shows';
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'ignoreBackground', false, set);
  else {
    let on = false;
    stage.every(2200, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
