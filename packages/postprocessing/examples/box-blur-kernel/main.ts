// BoxBlurPass kernelSize and iterations
import { BoxBlurPass, EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { boxBlur } from '../../shared/blur.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The 6.39.6 type definitions omit blurMaterial and iterations; shared/blur.ts types them.
  const blur = boxBlur(new BoxBlurPass({ kernelSize: 5, iterations: 1 }));
  composer.addPass(blur);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `kernelSize ${blur.blurMaterial.kernelSize}, iterations ${blur.iterations}`;
  };
  note();
  if (stage.bar) {
    // An odd number; 3 and 5 take optimised paths.
    slider(stage.bar, 'kernelSize', 3, 25, 2, 5, (v) => ((blur.blurMaterial.kernelSize = v), note()));
    slider(stage.bar, 'iterations', 1, 8, 1, 1, (v) => ((blur.iterations = v), note()));
  } else {
    let i = 0;
    stage.every(1300, () => {
      blur.blurMaterial.kernelSize = [5, 3, 9, 15][++i % 4]!;
      blur.iterations = [1, 2, 4, 3][i % 4]!;
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
