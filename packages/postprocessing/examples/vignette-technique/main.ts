// VignetteEffect: technique DEFAULT against ESKIL
import { EffectComposer, EffectPass, RenderPass, VignetteEffect, VignetteTechnique } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE } from '../../shared/dof.ts';

const NAMES = ['DEFAULT', 'ESKIL'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const vignette = new VignetteEffect({ technique: VignetteTechnique.DEFAULT, offset: 0.4, darkness: 0.6 });
  composer.addPass(new EffectPass(stage.camera, vignette));

  // DEFAULT gives a dusty look, ESKIL a burned one.
  const label = overlay(stage.box);
  const apply = (name: (typeof NAMES)[number]): void => {
    vignette.technique = VignetteTechnique[name];
    label.textContent = `VignetteTechnique.${name}`;
  };
  apply('DEFAULT');
  if (stage.bar) select(stage.bar, 'technique', NAMES, apply);
  let step = 0;
  if (!stage.bar) stage.every(2200, () => apply(NAMES[++step % 2]!));

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
