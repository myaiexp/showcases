// ChromaticAberrationEffect radialModulation: weak in the middle, strong at the edges
import { ChromaticAberrationEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import { HalfFloatType, Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE, wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const chromatic = new ChromaticAberrationEffect({ offset: new Vector2(0.012, 0.006), radialModulation: true, modulationOffset: 0.15 });
  composer.addPass(new EffectPass(stage.camera, chromatic));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = chromatic.radialModulation ? `radialModulation, modulationOffset ${chromatic.modulationOffset.toFixed(2)}` : 'radialModulation off';
  };
  if (stage.bar) {
    checkbox(stage.bar, 'radialModulation', true, (on) => ((chromatic.radialModulation = on), note()));
    slider(stage.bar, 'modulationOffset', 0, 1, 0.01, 0.15, (v) => ((chromatic.modulationOffset = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) {
      chromatic.radialModulation = Math.floor(t / 4) % 2 === 0;
      chromatic.modulationOffset = wave(t, 0, 0.8, 4);
    }
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
