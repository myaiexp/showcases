// GlitchEffect columns: the width of the blocky rows and columns that tear
import { EffectComposer, EffectPass, GlitchEffect, GlitchMode, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const glitch = new GlitchEffect({ columns: 0.05 });
  glitch.mode = GlitchMode.CONSTANT_WILD;
  composer.addPass(new EffectPass(stage.camera, glitch));

  const label = overlay(stage.box);
  if (stage.bar) slider(stage.bar, 'columns', 0, 0.4, 0.005, 0.05, (v) => (glitch.columns = v));

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) glitch.columns = wave(t, 0.01, 0.3, 8);
    composer.render(dt);
    label.textContent = `columns ${glitch.columns.toFixed(3)}`;
  });
  return () => stage.dispose();
};

export default mount;
