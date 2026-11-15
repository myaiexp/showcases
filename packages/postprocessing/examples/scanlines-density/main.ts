// A ScanlineEffect whose density is a slider, or sweeps in a card
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
  const lines = new ScanlineEffect({ density: 0.3 });
  composer.addPass(new EffectPass(stage.camera, lines));

  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) slider(stage.bar, 'density', 0.05, 1.25, 0.01, 0.3, (v) => (lines.density = v));

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      lines.density = 0.1 + 0.25 * (0.5 + 0.5 * Math.sin(t * 0.6));
      label.textContent = `density ${lines.density.toFixed(2)}`;
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
