// Two custom effects share one EffectPass: names are prefixed so identical ones do not clash
import type { ShaderMaterial } from 'three';
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, readout, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { ContrastEffect, setStrength, WarmEffect } from './TwoEffects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const warm = new WarmEffect(1);
  const contrast = new ContrastEffect(1);
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const pass = new EffectPass(stage.camera, warm, contrast);
  composer.addPass(pass);

  // The compound shader is the pass's fullscreenMaterial: show the lines that were renamed.
  const source = (pass.fullscreenMaterial as ShaderMaterial).fragmentShader;
  const renamed = source
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /\be\d[A-Z]/.test(line) && line.length < 100)
    .slice(0, 14);
  const code = renamed.join('\n');
  if (stage.bar) {
    const bar = stage.bar;
    slider(bar, 'warm strength', 0, 1, 0.01, 1, (v) => setStrength(warm, v));
    slider(bar, 'contrast strength', 0, 1, 0.01, 1, (v) => setStrength(contrast, v));
    readout(stage.box, `Two effects, both with "strength" and "shade". In the pass's compound shader:\n${code}`).style.padding = '8px 4px';
  } else {
    overlay(stage.box, renamed.slice(0, 6).join('\n'));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) setStrength(contrast, 0.5 + 0.5 * Math.sin(t * 1.2));
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
