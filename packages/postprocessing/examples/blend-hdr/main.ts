// Blend functions that keep HDR values, against ones that clamp to 1, with bloom after
import { HalfFloatType } from 'three';
import { BlendFunction, BloomEffect, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { blendLayer, type BlendName } from '../../shared/blend-rig.ts';

const HDR: BlendName[] = ['ADD', 'NORMAL', 'MULTIPLY'];
const CLAMPED: BlendName[] = ['LINEAR_DODGE', 'LINEAR_LIGHT', 'COLOR_DODGE'];
const NAMES = [...HDR.slice(0, 1), ...CLAMPED.slice(0, 1), ...HDR.slice(1), ...CLAMPED.slice(1)];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // The lamps glow at 6, far above 1: only a HalfFloat buffer can hold that.
  const subject = showroom(stage.scene, { glow: 6 });

  const texture = stage.own(blendLayer());
  const layer = new TextureEffect({ blendFunction: BlendFunction.ADD, texture });
  layer.blendMode.opacity.value = 0.3;
  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, layer));
  // The bloom sits in its own pass, after the blend, and only picks up luminance above 1.
  composer.addPass(new EffectPass(stage.camera, new BloomEffect({ mipmapBlur: true, luminanceThreshold: 1, intensity: 2.5 })));

  const label = overlay(stage.box);
  const set = (name: BlendName): void => {
    layer.blendMode.blendFunction = BlendFunction[name];
    label.textContent = `BlendFunction.${name}\n${HDR.includes(name) ? 'supports HDR: the lamps keep values above 1 and bloom' : 'result limited to 1: the lamps no longer bloom'}`;
  };
  set('ADD');
  if (stage.bar) select(stage.bar, 'blendFunction', NAMES, set, 'ADD');
  else {
    let i = 0;
    stage.every(2500, () => set(NAMES[++i % NAMES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
