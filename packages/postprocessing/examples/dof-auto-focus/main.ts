// DepthOfFieldEffect: target keeps a moving object in focus
import * as THREE from 'three';
import { DepthOfFieldEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE } from '../../shared/dof.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);

  // A glowing marker that glides up and down the corridor.
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  stage.scene.add(marker);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const dof = new DepthOfFieldEffect(stage.camera, { focusRange: 2.5, bokehScale: 5 });
  // Setting target turns auto focus on: every frame the effect measures the camera-to-target distance.
  dof.target = marker.position;
  composer.addPass(new EffectPass(stage.camera, dof));

  const label = overlay(stage.box);
  if (stage.bar) {
    checkbox(stage.bar, 'auto focus (target)', true, (on) => {
      dof.target = on ? marker.position : null;
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    marker.position.set(Math.sin(t * 0.9) * 1.2, 1.2, 2 - (0.5 + 0.5 * Math.sin(t * 0.6)) * 30);
    label.textContent = `target distance ${dof.calculateFocusDistance(marker.position).toFixed(1)}\nfocusDistance ${dof.cocMaterial.focusDistance.toFixed(1)}`;
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
