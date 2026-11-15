// ToneMappingEffect.mode: every ToneMappingMode on the same HDR scene
import { EffectComposer, EffectPass, RenderPass, ToneMappingEffect, ToneMappingMode } from 'postprocessing';
import { HalfFloatType } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { hdrShowroom, TONE_MODES, toneMode, type ToneModeName } from '../../shared/tone.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = hdrShowroom(stage.scene);

  // HalfFloat buffers keep the values above 1 that the tone mapper has to compress.
  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const toneMapping = new ToneMappingEffect({ mode: ToneMappingMode.LINEAR });
  composer.addPass(new EffectPass(stage.camera, toneMapping));

  const label = overlay(stage.box);
  const set = (name: ToneModeName): void => {
    toneMapping.mode = toneMode(name);
    label.textContent = `mode = ToneMappingMode.${name}`;
  };
  set('LINEAR');
  if (stage.bar) select(stage.bar, 'mode', TONE_MODES, set, 'LINEAR');
  else {
    let i = 0;
    stage.every(1800, () => set(TONE_MODES[++i % TONE_MODES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
