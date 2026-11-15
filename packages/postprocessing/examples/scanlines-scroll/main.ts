// A ScanlineEffect rolling with scrollSpeed, adjustable from a slider
import { EffectComposer, EffectPass, RenderPass, ScanlineEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const lines = new ScanlineEffect({ density: 0.4 });
  // The JSDoc lists scrollSpeed as an option, but the 6.39.6 typings only know density: set the property.
  lines.scrollSpeed = 0.1;
  composer.addPass(new EffectPass(stage.camera, lines));

  if (stage.bar) {
    slider(stage.bar, 'scrollSpeed', -0.5, 0.5, 0.01, 0.1, (v) => (lines.scrollSpeed = v));
    slider(stage.bar, 'density', 0.05, 1.25, 0.01, 0.4, (v) => (lines.density = v));
  } else {
    overlay(stage.box, 'scrollSpeed 0.1');
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
