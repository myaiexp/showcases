// ToneMappingMode.REINHARD2 with whitePoint and middleGrey
import { EffectComposer, EffectPass, RenderPass, ToneMappingEffect, ToneMappingMode } from 'postprocessing';
import { HalfFloatType } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { hdrShowroom, setTone } from '../../shared/tone.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = hdrShowroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // whitePoint is the luminance that maps to pure white; middleGrey scales the scene before the curve.
  const toneMapping = new ToneMappingEffect({ mode: ToneMappingMode.REINHARD2, whitePoint: 4, middleGrey: 0.6 });
  composer.addPass(new EffectPass(stage.camera, toneMapping));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `whitePoint ${toneMapping.whitePoint.toFixed(2)}, middleGrey ${toneMapping.middleGrey.toFixed(2)}`;
  };
  if (stage.bar) {
    slider(stage.bar, 'whitePoint', 0.5, 16, 0.1, 4, (v) => setTone(toneMapping, 'whitePoint', v));
    slider(stage.bar, 'middleGrey', 0.05, 2, 0.01, 0.6, (v) => setTone(toneMapping, 'middleGrey', v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) {
      setTone(toneMapping, 'whitePoint', wave(t, 1, 12, 8));
      setTone(toneMapping, 'middleGrey', wave(t + 4, 0.2, 1.2, 8));
    }
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
