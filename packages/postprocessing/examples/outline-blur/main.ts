// OutlineEffect blur and kernelSize: a soft glow instead of a hard line
import { EffectComposer, EffectPass, KernelSize, OutlineEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, select } from '../../shared/controls.ts';
import { outlineScene } from '../../shared/outline.ts';

const KERNELS = ['VERY_SMALL', 'SMALL', 'MEDIUM', 'LARGE', 'VERY_LARGE', 'HUGE'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = outlineScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const outline = new OutlineEffect(stage.scene, stage.camera, { edgeStrength: 8, visibleEdgeColor: 0x2ee6ff, blur: true, kernelSize: KernelSize.MEDIUM });
  composer.addPass(new EffectPass(stage.camera, outline));
  outline.selection.set([subject.knot, subject.balls[1]!]);

  const label = overlay(stage.box);
  const set = (name: (typeof KERNELS)[number]): void => {
    outline.blurPass.kernelSize = KernelSize[name];
    label.textContent = `blur on, kernelSize = KernelSize.${name}`;
  };
  set('MEDIUM');
  if (stage.bar) {
    checkbox(stage.bar, 'blur', true, (on) => (outline.blurPass.enabled = on));
    select(stage.bar, 'kernelSize', KERNELS, set, 'MEDIUM');
  } else {
    let i = 2;
    stage.every(1600, () => set(KERNELS[++i % KERNELS.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
