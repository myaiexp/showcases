// composer.render() with no deltaTime: the composer updates its own Timer and uses its delta
import { EffectComposer, EffectPass, RenderPass, ScanlineEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay, readout, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const lines = new ScanlineEffect({ density: 0.4 });
  lines.scrollSpeed = 0.2;
  composer.addPass(new EffectPass(stage.camera, lines));

  const timer = composer.getTimer();
  const label = stage.bar ? readout(stage.box) : overlay(stage.box);
  if (stage.bar) {
    slider(stage.bar, 'timer.timescale', 0, 3, 0.05, 1, (v) => (timer.timescale = v));
    button(stage.bar, 'timer.reset()', () => timer.reset());
  }

  stage.run((_dt, t) => {
    if (stage.preview) timer.timescale = 1.1 + Math.sin(t * 0.8);
    // No argument: the composer calls timer.update() itself and takes getDelta() as the delta.
    composer.render();
    subject.update(timer.getElapsed());
    label.textContent = `composer.getTimer()\ntimescale ${timer.timescale.toFixed(2)}  delta ${(timer.getDelta() * 1000).toFixed(1)} ms\nelapsed ${timer.getElapsed().toFixed(2)} s`;
  });
  return () => stage.dispose();
};

export default mount;
