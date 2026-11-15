// DepthOfFieldEffect: cocTexture shown through a TextureEffect
import { BlendFunction, DepthOfFieldEffect, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE } from '../../shared/dof.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const dof = new DepthOfFieldEffect(stage.camera, { focusDistance: 10, focusRange: 5, bokehScale: 4 });
  // The circle of confusion buffer: red is the foreground blur, green the background blur.
  const coc = new TextureEffect({ texture: dof.cocTexture, blendFunction: BlendFunction.SRC });
  composer.addPass(new EffectPass(stage.camera, dof, coc));

  const status = overlay(stage.box);
  const show = (on: boolean): void => {
    // DST keeps the base colour and ignores this effect; SRC replaces it with the texture.
    coc.blendMode.blendFunction = on ? BlendFunction.SRC : BlendFunction.DST;
    status.textContent = on ? 'cocTexture (red near, green far)' : 'depth of field';
  };
  if (stage.bar) checkbox(stage.bar, 'show circle of confusion', true, show);
  let on = true;
  show(on);
  if (!stage.bar) stage.every(2500, () => show((on = !on)));

  if (stage.bar) slider(stage.bar, 'focusDistance', 1, 40, 0.5, 10, (v) => (dof.cocMaterial.focusDistance = v));

  stage.run((dt, t) => {
    subject.update(t);
    // Cards sweep the focus so the green and red bands travel.
    if (stage.preview) dof.cocMaterial.focusDistance = 15 - 11 * Math.cos(t * 0.6);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
