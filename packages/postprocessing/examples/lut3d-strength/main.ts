// A LUT3DEffect with BlendFunction.NORMAL so blendMode.opacity sets the grade's strength
import { BlendFunction, EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const lut = stage.own(LookupTexture.createNeutral(16));
  fillLut(lut, grades.duotone);
  const effect = new LUT3DEffect(lut, { blendFunction: BlendFunction.NORMAL });

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  let animate = true;
  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) {
    slider(stage.bar, 'opacity', 0, 1, 0.01, 1, (v) => {
      animate = false;
      effect.blendMode.opacity.value = v;
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (animate) effect.blendMode.opacity.value = 0.5 + 0.5 * Math.sin(t * 1.1);
    if (label) label.textContent = `opacity ${effect.blendMode.opacity.value.toFixed(2)}`;
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
