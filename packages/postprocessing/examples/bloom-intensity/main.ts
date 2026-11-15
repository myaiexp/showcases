// BloomEffect intensity: how strongly the blurred glow is added back
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
  const bloom = new BloomEffect({ intensity: 1 });
  composer.addPass(new EffectPass(stage.camera, bloom));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `intensity ${bloom.intensity.toFixed(2)}`;
  };
  note();
  if (stage.bar) slider(stage.bar, 'intensity', 0, 6, 0.05, 1, (v) => ((bloom.intensity = v), note()));

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      bloom.intensity = wave(t, 0, 4);
      note();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
