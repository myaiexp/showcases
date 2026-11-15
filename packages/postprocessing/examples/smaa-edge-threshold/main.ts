// SMAA edge detection threshold and local contrast adaptation, read off the edges texture
import { EdgeDetectionMode, EffectComposer, EffectPass, RenderPass, SMAAEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { AA_STAGE, addSmaaView, wireCage } from '../../shared/aliasing.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const smaa = new SMAAEffect({ edgeDetectionMode: EdgeDetectionMode.LUMA });
  const smaaPass = new EffectPass(stage.camera, smaa);
  composer.addPass(smaaPass);
  addSmaaView(composer, stage.camera, smaaPass, smaa)('edges');

  const material = smaa.edgeDetectionMaterial;
  const label = overlay(stage.box);
  const apply = (threshold: number): void => {
    // Range [0.0, 0.5]: lower finds fainter edges.
    material.edgeDetectionThreshold = threshold;
    label.textContent = `edgeDetectionThreshold ${threshold.toFixed(2)}`;
  };
  apply(0.1);

  if (stage.bar) {
    slider(stage.bar, 'threshold', 0.02, 0.5, 0.01, 0.1, apply);
    // Discards an edge when a neighbour has this many times more contrast.
    slider(stage.bar, 'local contrast factor', 1, 6, 0.5, 2, (v) => (material.localContrastAdaptationFactor = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) apply(0.05 + 0.2 * (1 + Math.sin(t * 0.8)) * 0.5);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
