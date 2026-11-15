// addPass at an index, removePass and removeAllPasses on a running composer
import {
  BlendFunction,
  DotScreenEffect,
  EffectComposer,
  EffectPass,
  PixelationEffect,
  type Pass,
  RenderPass,
  SepiaEffect,
} from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  const renderPass = new RenderPass(stage.scene, stage.camera);
  composer.addPass(renderPass);

  const label = overlay(stage.box);
  const show = (): void => {
    label.textContent = `composer.passes\n${composer.passes.map((p, i) => `${i}  ${p.name}${p.renderToScreen ? '  (renderToScreen)' : ''}`).join('\n')}`;
  };
  // Passes that are removed are no longer the composer's to dispose, so the stage owns them all.
  const make = (effect: PixelationEffect | SepiaEffect | DotScreenEffect): EffectPass => stage.own(new EffectPass(stage.camera, effect));
  const actions = {
    'insert sepia at 1': () => composer.addPass(make(new SepiaEffect()), 1),
    'insert pixelation at 1': () => composer.addPass(make(new PixelationEffect(10)), 1),
    'append dot screen': () => composer.addPass(make(new DotScreenEffect({ blendFunction: BlendFunction.NORMAL, scale: 0.9 }))),
    'remove last': () => {
      const last: Pass | undefined = composer.passes[composer.passes.length - 1];
      if (last && last !== renderPass) composer.removePass(last);
    },
    'remove all': () => {
      composer.removeAllPasses();
      composer.addPass(renderPass);
    },
  };
  const names = Object.keys(actions) as (keyof typeof actions)[];
  const run = (name: keyof typeof actions): void => {
    actions[name]();
    show();
  };
  show();
  if (stage.bar) for (const n of names) button(stage.bar, n, () => run(n));
  else {
    const script: (keyof typeof actions)[] = ['insert sepia at 1', 'insert pixelation at 1', 'append dot screen', 'remove last', 'remove all'];
    let i = 0;
    stage.every(1600, () => run(script[i++ % script.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
