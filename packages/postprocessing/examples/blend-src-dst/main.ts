// SRC and DST ignore opacity; SET and SKIP are their deprecated names
import { BlendFunction, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, readout, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { blendLayer } from '../../shared/blend-rig.ts';

// opacity is 0.4 throughout: NORMAL honours it, SRC and DST do not.
const CHOICES = ['NORMAL', 'SRC', 'DST', 'SET', 'SKIP'] as const;
const NOTES: Record<(typeof CHOICES)[number], string> = {
  NORMAL: 'mixes layer and scene by opacity (0.4)',
  SRC: 'layer only, opacity ignored',
  DST: 'scene only, opacity ignored',
  SET: 'deprecated: the same value as SRC',
  SKIP: 'deprecated: the same value as DST, and it does not fully disable the effect',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const texture = stage.own(blendLayer());
  const effect = new TextureEffect({ blendFunction: BlendFunction.NORMAL, texture });
  effect.blendMode.opacity.value = 0.4;
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const label = overlay(stage.box);
  const set = (name: (typeof CHOICES)[number]): void => {
    effect.blendMode.blendFunction = BlendFunction[name];
    label.textContent = `BlendFunction.${name} = ${BlendFunction[name]}\n${NOTES[name]}`;
  };
  set('NORMAL');
  if (stage.bar) {
    select(stage.bar, 'blendFunction', CHOICES, set, 'NORMAL');
    readout(stage.box, `SET === SRC: ${Number(BlendFunction.SET) === Number(BlendFunction.SRC)}    SKIP === DST: ${Number(BlendFunction.SKIP) === Number(BlendFunction.DST)}`);
  } else {
    let i = 0;
    stage.every(2000, () => set(CHOICES[++i % CHOICES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
