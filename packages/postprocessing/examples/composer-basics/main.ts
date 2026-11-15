// The README's setup: an EffectComposer with a RenderPass, then an EffectPass running a bloom
import { HalfFloatType } from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // The composer runs its passes in order. RenderPass clears the buffers and draws the scene;
  // EffectPass runs fullscreen effects over the result and, being last, renders to screen.
  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  const renderPass = new RenderPass(stage.scene, stage.camera);
  composer.addPass(renderPass);
  const effectPass = new EffectPass(stage.camera, new BloomEffect());
  composer.addPass(effectPass);

  if (stage.bar) {
    // A disabled pass is skipped. addPass gave renderToScreen to the last pass only, so the
    // RenderPass has to take it over, or nothing reaches the canvas.
    checkbox(stage.bar, 'EffectPass enabled', true, (on) => {
      effectPass.enabled = on;
      renderPass.renderToScreen = !on;
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
