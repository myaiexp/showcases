// GaussKernel weights: the bell curve a Gaussian blur of a given kernel size samples with
import { EffectComposer, GaussianBlurPass, GaussKernel, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { gaussianBlur } from '../../shared/blur.ts';
import { kernelOf } from '../../shared/kernel.ts';
import { cornerChart, drawBars, drawLabel, plotArea } from '../../shared/utilities.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const blur = gaussianBlur(new GaussianBlurPass({ kernelSize: 15 }));
  composer.addPass(blur);

  const chart = cornerChart(stage.box, 280, 120);
  const apply = (size: number): void => {
    blur.blurMaterial.kernelSize = size;
    // weights[0] is the centre tap, then one entry per texel outwards; the kernel is symmetric.
    const kernel = kernelOf(new GaussKernel(size, 2));
    const area = plotArea(chart, -0.5, 32.5, kernel.weights[0]! * 1.05, 12, 10);
    drawBars(chart, area, Array.from(kernel.weights, (value, x) => ({ x, value })), '#ffc93f', 5);
    drawLabel(chart, `kernelSize ${size}: ${kernel.steps} weights, centre first`, 12, 15);
  };
  apply(15);
  if (stage.bar) slider(stage.bar, 'kernelSize', 3, 63, 2, 15, apply);
  else {
    const sizes = [5, 15, 35, 63];
    let i = 0;
    stage.every(1800, () => apply(sizes[++i % sizes.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
