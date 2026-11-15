// A custom effect with its own Resolution: scale it to render part of the work at low resolution
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';
import { LowResEffect } from './LowResEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const lowRes = new LowResEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, lowRes));

  const update = tune(
    stage,
    [
      {
        name: 'resolution.scale',
        min: 0.03,
        max: 1,
        step: 0.01,
        value: 0.12,
        digits: 2,
        set: (v) => (lowRes.resolution.scale = v),
        sweep: [0.04, 0.5, 8],
      },
    ],
    'target size follows Resolution',
  );

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
