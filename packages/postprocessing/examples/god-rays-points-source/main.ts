// GodRaysEffect: a Points sprite as the light source instead of a mesh
import * as THREE from 'three';
import { EffectComposer, EffectPass, GodRaysEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sunScene, SUN_STAGE } from '../../shared/sun.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, SUN_STAGE);
  const subject = sunScene(stage.scene);
  subject.sun.visible = false;

  // A glowing dot, drawn on a canvas.
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const g = canvas.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, '#fff6d8');
  grad.addColorStop(0.5, '#ffd27a');
  grad.addColorStop(1, 'rgba(255,200,100,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const dot = new THREE.CanvasTexture(canvas);
  stage.onDispose(() => dot.dispose());

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
  const points = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 120, sizeAttenuation: false, map: dot, transparent: true }));
  points.position.copy(subject.sun.position);
  stage.scene.add(points);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // GodRaysEffect accepts a Mesh or Points as its light source.
  composer.addPass(new EffectPass(stage.camera, new GodRaysEffect(stage.camera, points)));

  stage.run((dt, t) => {
    subject.update(t);
    points.position.copy(subject.sun.position);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
