// SMAA predicated thresholding: depth steers the colour edge threshold
import { EdgeDetectionMode, EffectComposer, EffectPass, PredicationMode, RenderPass, SMAAEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider, checkbox } from '../../shared/controls.ts';
import { AA_STAGE, addSmaaView, wireCage } from '../../shared/aliasing.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // Predication lowers the colour edge threshold wherever the depth buffer also has an edge.
  const smaa = new SMAAEffect({
    edgeDetectionMode: EdgeDetectionMode.COLOR,
    predicationMode: PredicationMode.DEPTH,
  });
  const smaaPass = new EffectPass(stage.camera, smaa);
  composer.addPass(smaaPass);
  addSmaaView(composer, stage.camera, smaaPass, smaa)('edges');

  const material = smaa.edgeDetectionMaterial;
  const label = overlay(stage.box);
  const setMode = (on: boolean): void => {
    material.predicationMode = on ? PredicationMode.DEPTH : PredicationMode.DISABLED;
    label.textContent = `PredicationMode.${on ? 'DEPTH' : 'DISABLED'}`;
  };
  setMode(true);

  if (stage.bar) {
    checkbox(stage.bar, 'predication (depth)', true, setMode);
    slider(stage.bar, 'threshold', 0.001, 0.05, 0.001, material.predicationThreshold, (v) => (material.predicationThreshold = v));
    slider(stage.bar, 'scale', 1, 5, 0.1, material.predicationScale as number, (v) => (material.predicationScale = v));
    slider(stage.bar, 'strength', 0, 1, 0.05, material.predicationStrength, (v) => (material.predicationStrength = v));
  } else {
    let on = true;
    stage.every(1800, () => setMode((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
