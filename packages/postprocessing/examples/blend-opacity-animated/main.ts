// blendMode.opacity animated every frame: a uniform, so changing it never recompiles
import { BlendFunction, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { blendLayer } from '../../shared/blend-rig.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const texture = stage.own(blendLayer());
  const effect = new TextureEffect({ blendFunction: BlendFunction.OVERLAY, texture });
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const label = overlay(stage.box);
  let animate = true;
  let manual = 0.5;
  if (stage.bar) {
    checkbox(stage.bar, 'animate', true, (v) => (animate = v));
    slider(stage.bar, 'opacity', 0, 1, 0.01, manual, (v) => (manual = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    // blendMode.opacity is a Uniform: write its value.
    const opacity = animate ? 0.5 - 0.5 * Math.cos(t * 1.2) : manual;
    effect.blendMode.opacity.value = opacity;
    label.textContent = `OVERLAY, blendMode.opacity.value = ${opacity.toFixed(2)}`;
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
