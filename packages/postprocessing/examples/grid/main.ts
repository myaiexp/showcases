// A GridEffect overlay with scale and lineWidth driven by sliders or animated in a card
import { EffectComposer, EffectPass, GridEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const grid = new GridEffect({ scale: 1, lineWidth: 0 });
  composer.addPass(new EffectPass(stage.camera, grid));

  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) {
    slider(stage.bar, 'scale', 0.2, 4, 0.05, 1, (v) => (grid.scale = v));
    slider(stage.bar, 'lineWidth', 0, 0.2, 0.005, 0, (v) => (grid.lineWidth = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      grid.scale = 1.4 + 0.9 * Math.sin(t * 0.5);
      grid.lineWidth = 0.05 + 0.05 * Math.sin(t * 1.3);
      label.textContent = `scale ${grid.scale.toFixed(2)}  lineWidth ${grid.lineWidth.toFixed(3)}`;
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
