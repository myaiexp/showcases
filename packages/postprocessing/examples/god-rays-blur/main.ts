// GodRaysEffect: blurPass softens the light mask, kernelSize sets how much
import { EffectComposer, EffectPass, GodRaysEffect, KernelSize, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, select } from '../../shared/controls.ts';
import { sunScene, SUN_STAGE } from '../../shared/sun.ts';

const SIZES = ['VERY_SMALL', 'SMALL', 'MEDIUM', 'LARGE', 'VERY_LARGE', 'HUGE'] as const;
// Cards step through these; "off" is the blur pass disabled.
const CARD_STEPS = ['off', 'SMALL', 'LARGE', 'HUGE'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, SUN_STAGE);
  const subject = sunScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const rays = new GodRaysEffect(stage.camera, subject.sun, { blur: true, kernelSize: KernelSize.SMALL, samples: 30 });
  composer.addPass(new EffectPass(stage.camera, rays));

  // The blur pass runs on the light mask before the radial blur; disabling it saves a pass.
  const label = overlay(stage.box);
  const apply = (blur: boolean, size: (typeof SIZES)[number]): void => {
    rays.blurPass.enabled = blur;
    rays.kernelSize = KernelSize[size];
    label.textContent = blur ? `blurPass.enabled, kernelSize ${size}` : 'blurPass.enabled = false';
  };
  apply(true, 'SMALL');
  if (stage.bar) {
    let blur = true;
    let size: (typeof SIZES)[number] = 'SMALL';
    checkbox(stage.bar, 'blurPass.enabled', true, (on) => apply((blur = on), size));
    select(stage.bar, 'kernelSize', SIZES, (s) => apply(blur, (size = s)), size);
  } else {
    let step = 0;
    stage.every(2000, () => {
      const s = CARD_STEPS[++step % CARD_STEPS.length]!;
      apply(s !== 'off', s === 'off' ? 'SMALL' : s);
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
