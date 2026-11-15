// TiltShiftBlurPass added directly to the composer, no EffectPass
import { EffectComposer, KernelSize, RenderPass, TiltShiftBlurPass } from 'postprocessing';
import '../../shared/blur.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 4.2, 7.5], target: [0, 0.4, 0] });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const pass = new TiltShiftBlurPass({ offset: 0, rotation: 0, focusArea: 0.35, feather: 0.3, kernelSize: KernelSize.MEDIUM });
  composer.addPass(pass);

  // The options live on the pass's blur material; the pass is the whole effect.
  const material = pass.blurMaterial;
  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `offset ${material.offset.toFixed(2)}, rotation ${material.rotation.toFixed(2)}`;
  };
  note();
  if (stage.bar) {
    slider(stage.bar, 'offset', -0.6, 0.6, 0.01, 0, (v) => ((material.offset = v), note()));
    slider(stage.bar, 'rotation', 0, 3.14, 0.01, 0, (v) => ((material.rotation = v), note()));
    slider(stage.bar, 'focusArea', 0, 1, 0.01, 0.35, (v) => (material.focusArea = v));
    slider(stage.bar, 'feather', 0, 1, 0.01, 0.3, (v) => (material.feather = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      material.offset = wave(t, -0.35, 0.35, 5);
      material.rotation = wave(t, 0, 0.8, 8);
      note();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
