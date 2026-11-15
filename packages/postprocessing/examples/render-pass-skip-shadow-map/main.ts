// RenderPass skipShadowMapUpdate: the shadow map stops updating, so shadows go stale
import * as THREE from 'three';
import { EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 6, 7], target: [0, 0, 0], orbit: 0.1 });
  stage.renderer.shadowMap.enabled = true;

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(0, 7, 2);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  Object.assign(light.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: 1, far: 20 });
  stage.scene.add(new THREE.HemisphereLight(0x8090b0, 0x181a20, 0.5), light);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({ color: 0x4a5160, roughness: 0.9 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 20), new THREE.MeshStandardMaterial({ color: 0xe0457b, roughness: 0.3 }));
  ball.castShadow = true;
  stage.scene.add(floor, ball);

  const composer = stage.own(new EffectComposer(stage.renderer));
  const renderPass = new RenderPass(stage.scene, stage.camera);
  composer.addPass(renderPass);

  const label = overlay(stage.box);
  const set = (skip: boolean): void => {
    renderPass.skipShadowMapUpdate = skip;
    label.textContent = skip ? 'skipShadowMapUpdate = true: the shadow stays behind' : 'skipShadowMapUpdate = false: the shadow follows';
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'skipShadowMapUpdate', false, set);
  else {
    let on = false;
    stage.every(2500, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    ball.position.set(Math.sin(t * 0.9) * 3, 1.2 + Math.sin(t * 2.2) * 0.5, Math.cos(t * 0.6) * 1.5);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
