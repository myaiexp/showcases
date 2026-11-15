// ToneMappingEffect averageLuminance: the fixed scene brightness REINHARD2 assumes
import { EffectComposer, EffectPass, RenderPass, ToneMappingEffect, ToneMappingMode } from 'postprocessing';
import { HalfFloatType } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { hdrShowroom, setTone } from '../../shared/tone.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = hdrShowroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const toneMapping = new ToneMappingEffect({ mode: ToneMappingMode.REINHARD2, averageLuminance: 1 });
  composer.addPass(new EffectPass(stage.camera, toneMapping));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `averageLuminance ${toneMapping.averageLuminance.toFixed(2)}, mode ${toneMapping.mode === ToneMappingMode.REINHARD2 ? 'REINHARD2' : 'REINHARD'}`;
  };
  if (stage.bar) {
    slider(stage.bar, 'averageLuminance', 0.05, 6, 0.05, 1, (v) => setTone(toneMapping, 'averageLuminance', v));
    // The JSDoc says plain REINHARD uses averageLuminance. In 6.39.6 only REINHARD2 does: with REINHARD the slider does nothing.
    select(stage.bar, 'mode', ['REINHARD2', 'REINHARD'] as const, (m) => (toneMapping.mode = ToneMappingMode[m]), 'REINHARD2');
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) setTone(toneMapping, 'averageLuminance', wave(t, 0.2, 4, 8));
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
