// KawaseBlurPass blurMaterial.scale and resolution.scale
import { EffectComposer, KawaseBlurPass, KernelSize, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const blur = new KawaseBlurPass({ kernelSize: KernelSize.SMALL, resolutionScale: 1 });
  composer.addPass(blur);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `blurMaterial.scale ${blur.blurMaterial.scale.toFixed(1)}, resolution.scale ${blur.resolution.scale.toFixed(2)}`;
  };
  note();
  if (stage.bar) {
    // Stretches the offsets between samples: a wider, coarser blur at the same cost.
    slider(stage.bar, 'blurMaterial.scale', 0.5, 4, 0.1, 1, (v) => ((blur.blurMaterial.scale = v), note()));
    // A smaller buffer is blurred, then stretched back up.
    slider(stage.bar, 'resolution.scale', 0.1, 1, 0.05, 1, (v) => ((blur.resolution.scale = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      blur.blurMaterial.scale = wave(t, 0.5, 3.5);
      blur.resolution.scale = wave(t + 3, 0.15, 1);
      note();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
