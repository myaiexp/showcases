// LensDistortionEffect principalPoint: where the lens axis sits
import { EffectComposer, EffectPass, LensDistortionEffect, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, position: [0, 1.4, 6], target: [0, 1.2, -10] });
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const lens = new LensDistortionEffect({ distortion: new Vector2(0.4, 0.4), principalPoint: new Vector2(0, 0), focalLength: new Vector2(1, 1) });
  composer.addPass(new EffectPass(stage.camera, lens));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `principalPoint (${lens.principalPoint.x.toFixed(2)}, ${lens.principalPoint.y.toFixed(2)})`;
  };
  if (stage.bar) {
    slider(stage.bar, 'principalPoint.x', -1, 1, 0.01, 0, (v) => ((lens.principalPoint.x = v), note()));
    slider(stage.bar, 'principalPoint.y', -1, 1, 0.01, 0, (v) => ((lens.principalPoint.y = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) lens.principalPoint.set(Math.cos(t * 0.8) * 0.4, Math.sin(t * 0.8) * 0.4);
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
