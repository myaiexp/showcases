// DepthEffect and the camera's near and far planes: they set how the depth values spread
import { DepthEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, position: [0, 1.4, 6], target: [0, 1.2, -10], near: 1, far: 40 });
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, new DepthEffect()));

  const label = overlay(stage.box);
  const apply = (near: number, far: number): void => {
    stage.camera.near = near;
    stage.camera.far = far;
    stage.camera.updateProjectionMatrix();
    label.textContent = `camera.near ${near.toFixed(1)}, camera.far ${far.toFixed(0)}`;
  };
  if (stage.bar) {
    let near = 1;
    let far = 40;
    slider(stage.bar, 'camera.near', 0.1, 5, 0.1, near, (v) => apply((near = v), far));
    slider(stage.bar, 'camera.far', 8, 100, 1, far, (v) => apply(near, (far = v)));
  }
  apply(1, 40);

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) apply(wave(t, 0.5, 4, 8), 40);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
