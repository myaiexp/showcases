// An effect gets the scene from composer.setMainScene() and can render it again in update()
import { HalfFloatType } from 'three';
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { MinimapEffect } from './MinimapEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: 0.35 });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, new MinimapEffect()));
  // addPass does not hand the effect its scene: this call does, for every pass and effect.
  composer.setMainScene(stage.scene);
  composer.setMainCamera(stage.camera);

  overlay(stage.box, 'minimap: the scene rendered again\nfrom above inside update()');

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
