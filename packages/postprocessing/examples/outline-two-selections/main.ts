// Two OutlineEffects with their own Selection, colour and render layer in one EffectPass
import { EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { outlineScene } from '../../shared/outline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = outlineScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const warm = new OutlineEffect(stage.scene, stage.camera, { edgeStrength: 4, visibleEdgeColor: 0xff9a2e });
  const cool = new OutlineEffect(stage.scene, stage.camera, { edgeStrength: 4, visibleEdgeColor: 0x2ee6ff });
  composer.addPass(new EffectPass(stage.camera, warm, cool));
  // Each Selection gets its own render layer (2, 3, ...): the effect renders its objects on that layer.
  warm.selection.set([subject.knot, subject.crates[0]!]);
  cool.selection.set(subject.balls);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `layers ${warm.selection.layer} and ${cool.selection.layer}, sizes ${warm.selection.size} and ${cool.selection.size}`;
  };
  note();
  if (stage.bar) {
    checkbox(stage.bar, 'ball outline', true, (on) => {
      if (on) cool.selection.set(subject.balls);
      else cool.selection.clear();
      note();
    });
    checkbox(stage.bar, 'knot outline', true, (on) => {
      if (on) warm.selection.add(subject.knot);
      else warm.selection.delete(subject.knot);
      note();
    });
  } else {
    let on = true;
    stage.every(1800, () => {
      on = !on;
      if (on) cool.selection.set(subject.balls);
      else cool.selection.clear();
      note();
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
