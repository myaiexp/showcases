// EffectPass.dithering breaks up the banding of 8-bit buffers in a dark, smooth gradient
import { Mesh, MeshStandardMaterial, PlaneGeometry, SphereGeometry, SpotLight } from 'three';
import { EffectComposer, EffectPass, RenderPass, VignetteEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.2, 6], target: [0, 1, 0], orbit: 0.08, background: 0x000000 });

  // A dim spotlight on a matte wall and floor: long, dark gradients where 8 bits show steps.
  const matte = new MeshStandardMaterial({ color: 0x8090a8, roughness: 1 });
  const wall = new Mesh(new PlaneGeometry(40, 20), matte);
  wall.position.z = -3;
  const floor = new Mesh(new PlaneGeometry(40, 40), matte);
  floor.rotation.x = -Math.PI / 2;
  const ball = new Mesh(new SphereGeometry(0.8, 64, 32), new MeshStandardMaterial({ color: 0xc0c8d8, roughness: 0.9 }));
  ball.position.set(0, 0.8, 0);
  const spot = new SpotLight(0xffffff, 30, 0, Math.PI / 5, 1, 1.5);
  spot.position.set(0, 6, 2);
  stage.scene.add(wall, floor, ball, spot, spot.target);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const effectPass = new EffectPass(stage.camera, new VignetteEffect({ darkness: 0.7 }));
  composer.addPass(effectPass);

  const label = overlay(stage.box);
  const set = (on: boolean): void => {
    effectPass.dithering = on;
    label.textContent = `effectPass.dithering = ${on}`;
  };
  set(true);
  if (stage.bar) checkbox(stage.bar, 'dithering', true, set);
  else {
    let on = true;
    stage.every(2500, () => set((on = !on)));
  }

  stage.run((dt) => composer.render(dt));
  return () => stage.dispose();
};

export default mount;
