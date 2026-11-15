// autoRenderToScreen off: choose which pass draws to the canvas and see the chain up to that pass
import { EffectComposer, EffectPass, PixelationEffect, type Pass, RenderPass, SepiaEffect, VignetteEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  const passes: Record<string, Pass> = {
    RenderPass: new RenderPass(stage.scene, stage.camera),
    'sepia pass': new EffectPass(stage.camera, new SepiaEffect()),
    'pixelation pass': new EffectPass(stage.camera, new PixelationEffect(9)),
    'vignette pass': new EffectPass(stage.camera, new VignetteEffect({ darkness: 0.8 })),
  };
  for (const pass of Object.values(passes)) composer.addPass(pass);
  // From here the composer no longer moves renderToScreen around: the example does.
  composer.autoRenderToScreen = false;

  const names = Object.keys(passes);
  const label = overlay(stage.box);
  const set = (name: string): void => {
    for (const [n, pass] of Object.entries(passes)) pass.renderToScreen = n === name;
    label.textContent = `${name}.renderToScreen = true\n(the passes after it still render, into buffers)`;
  };
  set('vignette pass');
  if (stage.bar) select(stage.bar, 'renderToScreen on', names, set, 'vignette pass');
  else {
    let i = 0;
    stage.every(2000, () => set(names[++i % names.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
