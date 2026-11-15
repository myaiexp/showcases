// ChromaticAberrationEffect offset: how far red and blue slide away from green
import { ChromaticAberrationEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE } from '../../shared/bloom.ts';
import { HalfFloatType } from 'three';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const chromatic = new ChromaticAberrationEffect({ offset: new Vector2(0.004, 0.002), radialModulation: false, modulationOffset: 0.15 });
  composer.addPass(new EffectPass(stage.camera, chromatic));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `offset (${chromatic.offset.x.toFixed(4)}, ${chromatic.offset.y.toFixed(4)})`;
  };
  if (stage.bar) {
    slider(stage.bar, 'offset.x', -0.02, 0.02, 0.0005, 0.004, (v) => ((chromatic.offset.x = v), note()));
    slider(stage.bar, 'offset.y', -0.02, 0.02, 0.0005, 0.002, (v) => ((chromatic.offset.y = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    // Cards sweep the offset around a circle in place of the sliders.
    if (!stage.bar) chromatic.offset.set(Math.cos(t * 1.2) * 0.008, Math.sin(t * 1.2) * 0.008);
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
