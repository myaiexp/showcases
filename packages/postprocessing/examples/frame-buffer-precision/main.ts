// The same bloom over 8-bit and HalfFloat frame buffers: only the float one keeps the glow
import { HalfFloatType, UnsignedByteType } from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 2.2, 6.5], target: [0, 1.2, 0] });
  const subject = neon(stage.scene);

  // Two composers that differ only in frameBufferType. UnsignedByteType buffers clamp every
  // colour to [0, 1], so the emissive tubes (intensity ~4) reach the bloom at 1.0 and the
  // default luminanceThreshold of 1.0 lets almost nothing through.
  const build = (frameBufferType: typeof HalfFloatType | typeof UnsignedByteType): EffectComposer => {
    const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType }));
    composer.addPass(new RenderPass(stage.scene, stage.camera));
    composer.addPass(new EffectPass(stage.camera, new BloomEffect({ intensity: 1.5 })));
    return composer;
  };
  const composers = { 'HalfFloatType': build(HalfFloatType), 'UnsignedByteType': build(UnsignedByteType) };
  type Kind = keyof typeof composers;
  let kind: Kind = 'HalfFloatType';

  const label = overlay(stage.box, kind);
  const show = (k: Kind): void => {
    kind = k;
    label.textContent = `frameBufferType: ${k}`;
  };
  show(kind);

  if (stage.bar) select(stage.bar, 'frameBufferType', Object.keys(composers) as Kind[], show, kind);
  else stage.every(2500, () => show(kind === 'HalfFloatType' ? 'UnsignedByteType' : 'HalfFloatType'));

  stage.run((dt, t) => {
    subject.update(t);
    composers[kind].render(dt);
  });
  return () => stage.dispose();
};

export default mount;
