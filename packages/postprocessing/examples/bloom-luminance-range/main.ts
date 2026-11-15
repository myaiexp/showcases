// LuminanceMaterial luminanceRange: bloom only the pixels inside a brightness band
import { HalfFloatType, Vector2 } from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE, wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bloom = new BloomEffect({ intensity: 2 });
  composer.addPass(new EffectPass(stage.camera, bloom));

  // A range replaces the threshold: texels outside [x, y] are masked out, bright ones included.
  const range = new Vector2(1, 2);
  // The JSDoc types luminanceRange as Boolean, but it takes a Vector2 or null in 6.39.6.
  const material = bloom.luminanceMaterial as unknown as { luminanceRange: Vector2 | null };
  const label = overlay(stage.box);
  const apply = (): void => {
    material.luminanceRange = range.clone();
    label.textContent = `luminanceRange (${range.x.toFixed(1)}, ${range.y.toFixed(1)})`;
  };
  apply();

  if (stage.bar) {
    slider(stage.bar, 'range min', 0, 6, 0.1, range.x, (v) => ((range.x = v), apply()));
    slider(stage.bar, 'range max', 0, 8, 0.1, range.y, (v) => ((range.y = v), apply()));
    checkbox(stage.bar, 'use range', true, (on) => {
      if (on) apply();
      else {
        material.luminanceRange = null;
        label.textContent = 'luminanceRange null: threshold';
      }
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      range.set(wave(t, 0.5, 2.5), wave(t, 2, 6));
      apply();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
