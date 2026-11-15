// SMAAEffect quality presets LOW to ULTRA over hairline geometry
import { EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, readout, select } from '../../shared/controls.ts';
import { AA_STAGE, wireCage } from '../../shared/aliasing.ts';

const PRESETS = { LOW: SMAAPreset.LOW, MEDIUM: SMAAPreset.MEDIUM, HIGH: SMAAPreset.HIGH, ULTRA: SMAAPreset.ULTRA };
type Name = keyof typeof PRESETS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const smaa = new SMAAEffect({ preset: SMAAPreset.LOW });
  composer.addPass(new EffectPass(stage.camera, smaa));

  const label = overlay(stage.box);
  const info = stage.bar ? readout(stage.box) : null;
  const apply = (name: Name): void => {
    // applyPreset sets the edge threshold, the search steps, diagonal detection and corner rounding.
    smaa.applyPreset(PRESETS[name]);
    label.textContent = `SMAAPreset.${name}`;
    if (info) {
      const { edgeDetectionMaterial: e, weightsMaterial: w } = smaa;
      info.textContent = `edge threshold ${e.edgeDetectionThreshold}, orthogonal steps ${w.orthogonalSearchSteps}, diagonal detection ${w.diagonalDetection}, corner detection ${w.cornerDetection}`;
    }
  };
  apply('LOW');

  const names = Object.keys(PRESETS) as Name[];
  if (stage.bar) {
    select(stage.bar, 'preset', names, apply, 'LOW');
  } else {
    let i = 0;
    stage.every(1800, () => apply(names[++i % names.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
