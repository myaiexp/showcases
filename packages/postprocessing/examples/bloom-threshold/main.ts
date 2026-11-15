// BloomEffect luminanceThreshold and luminanceSmoothing: which pixels are bright enough to glow
import { HalfFloatType } from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE, wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bloom = new BloomEffect({ luminanceThreshold: 1, luminanceSmoothing: 0.03 });
  composer.addPass(new EffectPass(stage.camera, bloom));

  const material = bloom.luminanceMaterial;
  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `threshold ${material.threshold.toFixed(2)}, smoothing ${material.smoothing.toFixed(2)}`;
  };
  note();
  if (stage.bar) {
    // Only pixels brighter than the threshold bloom; smoothing widens the ramp above it.
    slider(stage.bar, 'luminanceThreshold', 0, 4, 0.05, 1, (v) => ((material.threshold = v), note()));
    slider(stage.bar, 'luminanceSmoothing', 0, 3, 0.01, 0.03, (v) => ((material.smoothing = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      material.threshold = wave(t, 0, 3);
      note();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
