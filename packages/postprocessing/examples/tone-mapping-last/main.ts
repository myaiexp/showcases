// HDR light with and without a ToneMappingEffect at the end of the pipeline
import { HalfFloatType, PointLight } from 'three';
import { BlendFunction, EffectComposer, EffectPass, RenderPass, ToneMappingEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);
  // A light far too strong for [0, 1]: without tone mapping the lit side burns to flat white.
  const hot = new PointLight(0xffe2b0, 60, 0, 1.4);
  hot.position.set(1.5, 3, 2);
  stage.scene.add(hot);

  // The renderer keeps its default NoToneMapping and the buffers are HalfFloat, so the
  // values above 1 reach the end of the pipeline, where the ToneMappingEffect maps them.
  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const toneMapping = new ToneMappingEffect();
  composer.addPass(new EffectPass(stage.camera, toneMapping));

  const label = overlay(stage.box);
  const set = (on: boolean): void => {
    // SRC (the effect's default) writes the tone-mapped colour; DST keeps the input colour.
    toneMapping.blendMode.blendFunction = on ? BlendFunction.SRC : BlendFunction.DST;
    label.textContent = on ? 'ToneMappingEffect (AGX)' : 'no tone mapping';
  };
  set(true);
  if (stage.bar) checkbox(stage.bar, 'ToneMappingEffect', true, set);
  else {
    let on = true;
    stage.every(2500, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
