// OutlineEffect with BlendFunction.ALPHA: dark outlines instead of light ones
import { BlendFunction, EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { outlineScene } from '../../shared/outline.ts';

const BLENDS = ['SCREEN', 'ALPHA'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { background: 0xcfd6e4 });
  const subject = outlineScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // SCREEN can only brighten, so a black outline vanishes. ALPHA lays the colour over the picture instead.
  const outline = new OutlineEffect(stage.scene, stage.camera, {
    blendFunction: BlendFunction.ALPHA,
    edgeStrength: 6,
    visibleEdgeColor: 0x000000,
    hiddenEdgeColor: 0x000000,
    xRay: false,
  });
  composer.addPass(new EffectPass(stage.camera, outline));
  outline.selection.set(subject.all);

  const label = overlay(stage.box);
  const set = (name: (typeof BLENDS)[number]): void => {
    outline.blendMode.blendFunction = BlendFunction[name];
    label.textContent = `blendFunction = BlendFunction.${name}, visibleEdgeColor black`;
  };
  set('ALPHA');
  if (stage.bar) select(stage.bar, 'blendFunction', BLENDS, set, 'ALPHA');
  else {
    let on = true;
    stage.every(2200, () => set((on = !on) ? 'ALPHA' : 'SCREEN'));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
