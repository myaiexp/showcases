// A 4x4x4 LookupTexture sampled by LUT3DEffect with tetrahedralInterpolation toggled
import { EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const lut = stage.own(LookupTexture.createNeutral(4));
  fillLut(lut, grades['cross process']);
  const effect = new LUT3DEffect(lut, { tetrahedralInterpolation: false });

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  let label: HTMLElement | null = null;
  if (stage.bar) checkbox(stage.bar, 'tetrahedralInterpolation', false, (on) => (effect.tetrahedralInterpolation = on));
  else label = overlay(stage.box, '');

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const on = Math.floor(t / 2) % 2 === 1;
      if (on !== effect.tetrahedralInterpolation) {
        effect.tetrahedralInterpolation = on;
        label.textContent = on ? 'tetrahedral' : 'trilinear (default)';
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
