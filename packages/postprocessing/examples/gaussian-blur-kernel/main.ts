// GaussianBlurPass kernelSize, from a few taps to over a hundred
import { EffectComposer, GaussianBlurPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { gaussianBlur } from '../../shared/blur.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The 6.39.6 type definitions omit blurMaterial and iterations; shared/blur.ts types them.
  const blur = gaussianBlur(new GaussianBlurPass({ kernelSize: 35 }));
  composer.addPass(blur);

  const label = overlay(stage.box);
  const apply = (size: number): void => {
    // Odd values only, in [3, 1020].
    blur.blurMaterial.kernelSize = size;
    label.textContent = `kernelSize ${size}`;
  };
  apply(35);
  if (stage.bar) {
    slider(stage.bar, 'kernelSize', 3, 125, 2, 35, apply);
  } else {
    let i = 0;
    stage.every(1300, () => apply([35, 3, 15, 75][++i % 4]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
