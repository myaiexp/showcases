// A mainUv function transforms the coordinates every later effect in the pass samples with
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';
import { WobbleEffect } from './WobbleEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const wobble = new WobbleEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, wobble));

  const update = tune(stage, [
    { name: 'amplitude', min: 0, max: 0.05, step: 0.001, value: 0.012, digits: 3, set: (v) => (wobble.amplitude = v), sweep: [0.002, 0.03, 5] },
  ]);
  if (stage.bar) slider(stage.bar, 'frequency', 2, 60, 1, wobble.frequency, (v) => (wobble.frequency = v));

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
