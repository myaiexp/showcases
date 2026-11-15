// Every custom effect has a blendMode: its output is blended with the colour before it
import { BlendFunction, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { StripesEffect } from './StripesEffect.ts';

const names = ['NORMAL', 'ADD', 'MULTIPLY', 'SCREEN', 'OVERLAY', 'DIFFERENCE', 'SKIP'] as const;
type Name = (typeof names)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const stripes = new StripesEffect();
  stripes.blendMode.opacity.value = 0.8;
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, stripes));

  const label = overlay(stage.box);
  const use = (name: Name): void => {
    // Changing the function recompiles the pass; the blend mode tells it through setChanged.
    stripes.blendMode.blendFunction = BlendFunction[name];
    label.textContent = `blendMode.blendFunction = ${name}\nopacity ${stripes.blendMode.opacity.value.toFixed(2)}`;
  };
  use('NORMAL');
  if (stage.bar) {
    const bar = stage.bar;
    select(bar, 'blendFunction', names, use);
    slider(bar, 'opacity', 0, 1, 0.01, 0.8, (v) => {
      stripes.blendMode.opacity.value = v;
      label.textContent = label.textContent!.replace(/opacity .*/, `opacity ${v.toFixed(2)}`);
    });
  } else {
    let i = 0;
    stage.every(2000, () => use(names[++i % names.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
