// The extensions option: fwidth() edge detection in a custom effect
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';
import { EdgeGlowEffect } from './EdgeGlowEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const glow = new EdgeGlowEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, glow));

  const update = tune(stage, [
    { name: 'gain', min: 1, max: 40, step: 1, value: 12, digits: 0, set: (v) => (glow.gain = v), sweep: [3, 30, 6] },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
