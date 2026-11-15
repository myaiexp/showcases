// LensDistortionEffect focalLength: zooming the warped picture, per axis
import { EffectComposer, EffectPass, LensDistortionEffect, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, position: [0, 1.4, 6], target: [0, 1.2, -10] });
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const lens = new LensDistortionEffect({ distortion: new Vector2(0.3, 0.3), principalPoint: new Vector2(0, 0), focalLength: new Vector2(1, 1) });
  composer.addPass(new EffectPass(stage.camera, lens));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `focalLength (${lens.focalLength.x.toFixed(2)}, ${lens.focalLength.y.toFixed(2)})`;
  };
  if (stage.bar) {
    slider(stage.bar, 'focalLength.x', 0.5, 2, 0.01, 1, (v) => ((lens.focalLength.x = v), note()));
    slider(stage.bar, 'focalLength.y', 0.5, 2, 0.01, 1, (v) => ((lens.focalLength.y = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) {
      lens.focalLength.x = wave(t, 0.7, 1.5, 7);
      lens.focalLength.y = wave(t + 3.5, 0.7, 1.5, 7);
    }
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
