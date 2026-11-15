// A NoiseTexture as a threshold map: pixels vanish where the noise falls below the progress value
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { DissolveEffect } from './DissolveEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const dissolve = new DissolveEffect();
  // The effect owns the texture, and Effect.dispose() frees any Texture property it holds.
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, dissolve));

  const update = tune(stage, [
    { name: 'progress', min: 0, max: 1, step: 0.01, value: 0.4, digits: 2, set: (v) => (dissolve.progress = v), sweep: [0, 1, 7] },
  ]);
  if (stage.bar) slider(stage.bar, 'cell px', 1, 16, 1, 4, (v) => (dissolve.cell = v));

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
