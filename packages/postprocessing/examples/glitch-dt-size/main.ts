// GlitchEffect dtSize: the size of the noise map the effect generates for itself
import { EffectComposer, EffectPass, GlitchEffect, GlitchMode, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const SIZES = ['2', '8', '64', '512'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  let pass: EffectPass | null = null;
  const label = overlay(stage.box);

  // dtSize is a constructor option only, so changing it builds a new effect. The effect disposes
  // the noise texture it generated; dtSize is ignored when a perturbationMap is given.
  const build = (size: (typeof SIZES)[number]): void => {
    if (pass) {
      composer.removePass(pass);
      pass.dispose();
    }
    const glitch = new GlitchEffect({ dtSize: Number(size) });
    glitch.mode = GlitchMode.CONSTANT_WILD;
    pass = new EffectPass(stage.camera, glitch);
    composer.addPass(pass);
    label.textContent = `dtSize = ${size}`;
  };
  build('64');
  if (stage.bar) select(stage.bar, 'dtSize', SIZES, build, '64');
  else {
    let i = 2;
    stage.every(2200, () => build(SIZES[++i % SIZES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
