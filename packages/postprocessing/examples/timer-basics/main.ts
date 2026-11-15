// Timer: update() each frame, then getDelta() and getElapsed(), scaled by timescale
import { EffectComposer, EffectPass, RenderPass, ScanlineEffect, Timer } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, checkbox, overlay, readout, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const timer = new Timer();
  stage.onDispose(() => timer.dispose());

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const lines = new ScanlineEffect({ density: 0.4 });
  lines.scrollSpeed = 0.2;
  composer.addPass(new EffectPass(stage.camera, lines));

  const label = stage.bar ? readout(stage.box) : overlay(stage.box);
  if (stage.bar) {
    slider(stage.bar, 'timescale', 0, 3, 0.05, 1, (v) => (timer.timescale = v));
    button(stage.bar, 'timer.reset()', () => timer.reset());
    // autoReset resets the timer when the tab becomes visible again, which pauses it while hidden.
    checkbox(stage.bar, 'autoReset', false, (v) => (timer.autoReset = v));
  }

  stage.run((_dt, t) => {
    // Cards swing the timescale to show the scene and the scan lines slowing and speeding up.
    if (stage.preview) timer.timescale = 1.1 + Math.sin(t * 0.7);
    timer.update();
    subject.update(timer.getElapsed());
    composer.render(timer.getDelta());
    label.textContent = `timescale ${timer.timescale.toFixed(2)}\ngetDelta() ${(timer.getDelta() * 1000).toFixed(1)} ms\ngetElapsed() ${timer.getElapsed().toFixed(2)} s`;
  });
  return () => stage.dispose();
};

export default mount;
