// A disabled CopyPass keeps its saved frame: a snapshot to compare the live picture against
import { BlendFunction, CopyPass, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const BLENDS = ['DIFFERENCE', 'NORMAL', 'SUBTRACT'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const save = new CopyPass();
  composer.addPass(save);
  const compare = new TextureEffect({ blendFunction: BlendFunction.DIFFERENCE, texture: save.texture });
  composer.addPass(new EffectPass(stage.camera, compare));

  // The CopyPass only runs on frames where it is enabled; its texture keeps the last frame it copied.
  let snap = true;
  const label = overlay(stage.box);
  const set = (name: (typeof BLENDS)[number]): void => {
    compare.blendMode.blendFunction = BlendFunction[name];
    label.textContent = `live frame ${name} snapshot`;
  };
  set('DIFFERENCE');
  if (stage.bar) {
    button(stage.bar, 'take snapshot', () => (snap = true));
    select(stage.bar, 'blendFunction', BLENDS, set, 'DIFFERENCE');
  } else {
    stage.every(3000, () => (snap = true));
  }

  stage.run((dt, t) => {
    subject.update(t);
    save.enabled = snap;
    snap = false;
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
