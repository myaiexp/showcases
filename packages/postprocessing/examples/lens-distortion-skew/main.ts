// LensDistortionEffect skew: shearing the picture
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
  const lens = new LensDistortionEffect({ distortion: new Vector2(0, 0), principalPoint: new Vector2(0, 0), focalLength: new Vector2(1, 1), skew: 0.3 });
  composer.addPass(new EffectPass(stage.camera, lens));

  const label = overlay(stage.box);
  if (stage.bar) slider(stage.bar, 'skew', -1, 1, 0.01, 0.3, (v) => (lens.skew = v));

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) lens.skew = wave(t, -0.6, 0.6, 7);
    composer.render(dt);
    label.textContent = `skew ${lens.skew.toFixed(2)}`;
  });
  return () => stage.dispose();
};

export default mount;
