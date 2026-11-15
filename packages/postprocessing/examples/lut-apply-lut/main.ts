// Two graded LookupTextures baked into one with applyLUT, shown through one LUT3DEffect
import { EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const MODES = ['A: bleach bypass', 'B: teal and orange', 'A.applyLUT(B)'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const a = stage.own(LookupTexture.createNeutral(16));
  fillLut(a, grades['bleach bypass']);
  const b = stage.own(LookupTexture.createNeutral(16));
  fillLut(b, grades['teal and orange']);
  // applyLUT changes the texture it is called on, so the combination is its own copy.
  const both = stage.own(LookupTexture.createNeutral(16));
  fillLut(both, grades['bleach bypass']);
  both.applyLUT(b);

  const effect = new LUT3DEffect(a);
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const show = (mode: (typeof MODES)[number]): LookupTexture => (effect.lut = mode === MODES[0] ? a : mode === MODES[1] ? b : both);
  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) select(stage.bar, 'LUT', MODES, show);
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 2) % MODES.length;
      if (s !== step) {
        step = s;
        show(MODES[s]!);
        label.textContent = MODES[s]!;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
