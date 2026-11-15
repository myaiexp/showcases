// An effect with EffectAttribute.DEPTH reads the depth buffer: here as exponential fog
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { corridor } from '../../shared/scenes.ts';
import { FogEffect } from './FogEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, position: [0, 1.4, 6], target: [0, 1.2, -10], near: 0.3, far: 60 });
  const subject = corridor(stage.scene);

  const fog = new FogEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, fog));

  const update = tune(stage, [
    { name: 'density', min: 0, max: 0.3, step: 0.005, value: 0.06, digits: 3, set: (v) => (fog.density = v), sweep: [0.01, 0.2, 6] },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
