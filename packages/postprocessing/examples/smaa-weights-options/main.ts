// SMAA weights options: search steps, diagonal detection and corner rounding
import { EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { AA_STAGE, addSmaaView, wireCage } from '../../shared/aliasing.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const smaa = new SMAAEffect({ preset: SMAAPreset.LOW });
  const smaaPass = new EffectPass(stage.camera, smaa);
  composer.addPass(smaaPass);
  const show = addSmaaView(composer, stage.camera, smaaPass, smaa);
  show('weights');

  const weights = smaa.weightsMaterial;
  const label = overlay(stage.box, 'smaa.weightsTexture');
  if (stage.bar) {
    slider(stage.bar, 'orthogonalSearchSteps', 0, 112, 1, weights.orthogonalSearchSteps, (v) => (weights.orthogonalSearchSteps = v));
    slider(stage.bar, 'diagonalSearchSteps', 0, 20, 1, weights.diagonalSearchSteps, (v) => (weights.diagonalSearchSteps = v));
    checkbox(stage.bar, 'diagonalDetection', weights.diagonalDetection, (v) => (weights.diagonalDetection = v));
    slider(stage.bar, 'cornerRounding', 0, 100, 1, weights.cornerRounding, (v) => (weights.cornerRounding = v));
    // The JSDoc types cornerDetection as Number, but it is a boolean in 6.39.6.
    const corners = weights as unknown as { cornerDetection: boolean };
    checkbox(stage.bar, 'cornerDetection', corners.cornerDetection, (v) => (corners.cornerDetection = v));
    checkbox(stage.bar, 'show weights', true, (v) => {
      show(v ? 'weights' : 'result');
      label.textContent = v ? 'smaa.weightsTexture' : 'SMAA result';
    });
  } else {
    let high = false;
    stage.every(1800, () => {
      high = !high;
      smaa.applyPreset(high ? SMAAPreset.ULTRA : SMAAPreset.LOW);
      label.textContent = high ? 'ULTRA: 32 steps, diagonals, corners' : 'LOW: 4 steps, no diagonals';
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
