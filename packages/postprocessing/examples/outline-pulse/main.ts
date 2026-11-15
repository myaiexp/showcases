// OutlineEffect pulseSpeed: the outline breathes
import { EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { outlineScene } from '../../shared/outline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = outlineScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // pulseSpeed 0 (the default) turns the pulse off.
  const outline = new OutlineEffect(stage.scene, stage.camera, { edgeStrength: 5, visibleEdgeColor: 0xffc93f, pulseSpeed: 0.25 });
  composer.addPass(new EffectPass(stage.camera, outline));
  outline.selection.set([subject.knot, ...subject.balls]);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `pulseSpeed ${outline.pulseSpeed.toFixed(2)}`;
  };
  note();
  if (stage.bar) slider(stage.bar, 'pulseSpeed', 0, 1, 0.01, 0.25, (v) => ((outline.pulseSpeed = v), note()));

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
