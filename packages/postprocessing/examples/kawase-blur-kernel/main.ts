// KawaseBlurPass with each KernelSize, added as the composer's last pass
import { EffectComposer, KawaseBlurPass, KernelSize, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const SIZES = KernelSize;
type Name = keyof typeof SIZES;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // A blur pass is a full pass: as the last one it renders straight to screen.
  const blur = new KawaseBlurPass({ kernelSize: KernelSize.MEDIUM });
  composer.addPass(blur);

  const label = overlay(stage.box);
  const apply = (name: Name): void => {
    blur.kernelSize = SIZES[name];
    label.textContent = `KernelSize.${name}`;
  };
  apply('MEDIUM');

  const names = Object.keys(SIZES) as Name[];
  if (stage.bar) {
    select(stage.bar, 'kernelSize', names, apply, 'MEDIUM');
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
