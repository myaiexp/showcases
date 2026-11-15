// BoxBlurPass bilateral mode: blur that stops at depth edges
import { BoxBlurPass, EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider, checkbox } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { boxBlur } from '../../shared/blur.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // bilateral makes the pass ask the composer for a depth texture.
  // The 6.39.6 type definitions omit blurMaterial and iterations; shared/blur.ts types them.
  const blur = boxBlur(new BoxBlurPass({ kernelSize: 9, iterations: 3, bilateral: true }));
  composer.addPass(blur);
  const material = blur.blurMaterial;
  material.worldDistanceThreshold = 0.5;

  const label = overlay(stage.box);
  const setBilateral = (on: boolean): void => {
    material.bilateral = on;
    label.textContent = `bilateral ${on}`;
  };
  setBilateral(true);

  if (stage.bar) {
    checkbox(stage.bar, 'bilateral', true, setBilateral);
    slider(stage.bar, 'worldDistanceThreshold', 0.05, 5, 0.05, 0.5, (v) => (material.worldDistanceThreshold = v));
  } else {
    let on = true;
    stage.every(2000, () => setBilateral((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
