// BokehEffect: focus and dof pick the sharp band, as ratios of the depth range
import { BokehEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE } from '../../shared/dof.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bokeh = new BokehEffect({ focus: 0.1, dof: 0.02, aperture: 0.12, maxBlur: 1 });
  composer.addPass(new EffectPass(stage.camera, bokeh));

  // focus and dof are fractions of the camera's near-to-far range (0.1 is about 6 units away here),
  // and BokehEffect exposes them only as uniforms.
  const set = (name: string) => (v: number) => void (bokeh.uniforms.get(name)!.value = v);
  const update = tune(stage, [
    { name: 'focus', min: 0, max: 0.8, step: 0.005, value: 0.1, sweep: [0.03, 0.5, 11], digits: 3, set: set('focus') },
    { name: 'dof', min: 0, max: 0.3, step: 0.005, value: 0.02, sweep: [0.01, 0.06, 5], digits: 3, set: set('dof') },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
