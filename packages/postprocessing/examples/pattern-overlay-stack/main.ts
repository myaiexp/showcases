// A ScanlineEffect and a GridEffect in one pass, sharing a selectable blend function
import { BlendFunction, EffectComposer, EffectPass, GridEffect, RenderPass, ScanlineEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const FUNCTIONS = ['OVERLAY', 'MULTIPLY', 'SOFT_LIGHT', 'SCREEN', 'DIFFERENCE'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const lines = new ScanlineEffect({ density: 0.6 });
  lines.scrollSpeed = 0.05;
  const grid = new GridEffect({ scale: 1.5, lineWidth: 0.02 });
  composer.addPass(new EffectPass(stage.camera, lines, grid));

  const use = (name: (typeof FUNCTIONS)[number]): void => {
    lines.blendMode.blendFunction = BlendFunction[name];
    grid.blendMode.blendFunction = BlendFunction[name];
  };
  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) {
    select(stage.bar, 'blend', FUNCTIONS, use);
    slider(stage.bar, 'lines opacity', 0, 1, 0.01, 1, (v) => (lines.blendMode.opacity.value = v));
    slider(stage.bar, 'grid opacity', 0, 1, 0.01, 1, (v) => (grid.blendMode.opacity.value = v));
  }
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 1.8) % FUNCTIONS.length;
      if (s !== step) {
        step = s;
        use(FUNCTIONS[s]!);
        label.textContent = FUNCTIONS[s]!;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
