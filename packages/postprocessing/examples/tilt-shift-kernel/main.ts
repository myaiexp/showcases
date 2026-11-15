// TiltShiftEffect kernelSize and resolutionScale: the quality of its blur
import { EffectComposer, EffectPass, KernelSize, RenderPass, TiltShiftEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const SIZES = KernelSize;
type Name = keyof typeof SIZES;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 4.2, 7.5], target: [0, 0.4, 0] });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const tilt = new TiltShiftEffect({ focusArea: 0.25, feather: 0.2, kernelSize: KernelSize.MEDIUM, resolutionScale: 0.5 });
  composer.addPass(new EffectPass(stage.camera, tilt));

  const label = overlay(stage.box);
  const apply = (name: Name): void => {
    tilt.blurPass.kernelSize = SIZES[name];
    label.textContent = `KernelSize.${name}, resolution.scale ${tilt.resolution.scale}`;
  };
  apply('MEDIUM');

  const names = Object.keys(SIZES) as Name[];
  if (stage.bar) {
    select(stage.bar, 'kernelSize', names, apply, 'MEDIUM');
    slider(stage.bar, 'resolution.scale', 0.1, 1, 0.05, 0.5, (v) => (tilt.resolution.scale = v));
  } else {
    let i = 0;
    stage.every(1500, () => apply(names[++i % names.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
