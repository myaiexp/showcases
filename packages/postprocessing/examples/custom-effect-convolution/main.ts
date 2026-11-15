// An effect that samples neighbouring pixels declares EffectAttribute.CONVOLUTION
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';
import { SharpenEffect } from './SharpenEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { renderer: { antialias: false } });
  const subject = showroom(stage.scene);

  const sharpen = new SharpenEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, sharpen));

  const update = tune(stage, [
    { name: 'amount', min: 0, max: 4, step: 0.05, value: 1.5, digits: 2, set: (v) => (sharpen.amount = v), sweep: [0, 4, 6] },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
