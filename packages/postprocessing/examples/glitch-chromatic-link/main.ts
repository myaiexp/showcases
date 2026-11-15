// GlitchEffect chromaticAberrationOffset driving a ChromaticAberrationEffect
import { ChromaticAberrationEffect, EffectComposer, EffectPass, GlitchEffect, GlitchMode, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const chromatic = new ChromaticAberrationEffect({ offset: new Vector2(), radialModulation: false, modulationOffset: 0.15 });
  // The glitch writes into this Vector2 on every update: zero while idle, a random direction while glitching.
  const glitch = new GlitchEffect({ chromaticAberrationOffset: chromatic.offset });
  glitch.mode = GlitchMode.CONSTANT_MILD;
  // GlitchEffect transforms UVs and ChromaticAberrationEffect samples neighbours (convolution);
  // one EffectPass refuses that pair, so each gets its own.
  composer.addPass(new EffectPass(stage.camera, glitch));
  composer.addPass(new EffectPass(stage.camera, chromatic));

  const label = overlay(stage.box);
  const link = (on: boolean): void => {
    // Pointing the glitch at a throwaway Vector2 stops it touching the offset; then a fixed split is set by hand.
    glitch.chromaticAberrationOffset = on ? chromatic.offset : new Vector2();
    if (!on) chromatic.offset.set(0.004, 0);
    label.textContent = on ? 'linked: the glitch moves the colour split' : 'unlinked: fixed offset (0.004, 0)';
  };
  link(true);
  if (stage.bar) checkbox(stage.bar, 'link glitch to chromatic aberration', true, link);
  else {
    let on = true;
    stage.every(3000, () => link((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
