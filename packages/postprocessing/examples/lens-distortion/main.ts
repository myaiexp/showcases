// LensDistortionEffect distortion: barrel and pincushion warping
import { EffectComposer, EffectPass, LensDistortionEffect, RenderPass } from 'postprocessing';
import { Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  // The corridor's straight columns make the warp easy to read.
  const stage = createStage(el, ctx, { orbit: false, position: [0, 1.4, 6], target: [0, 1.2, -10] });
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const lens = new LensDistortionEffect({ distortion: new Vector2(0.3, 0.3), principalPoint: new Vector2(0, 0), focalLength: new Vector2(1, 1) });
  composer.addPass(new EffectPass(stage.camera, lens));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `distortion (${lens.distortion.x.toFixed(2)}, ${lens.distortion.y.toFixed(2)})`;
  };
  if (stage.bar) {
    slider(stage.bar, 'distortion.x', -1, 1, 0.01, 0.3, (v) => ((lens.distortion.x = v), note()));
    slider(stage.bar, 'distortion.y', -1, 1, 0.01, 0.3, (v) => ((lens.distortion.y = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) lens.distortion.setScalar(wave(t, -0.6, 0.6, 8));
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
