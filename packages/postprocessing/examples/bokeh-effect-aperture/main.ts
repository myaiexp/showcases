// BokehEffect: aperture sets the blur strength and maxBlur caps it
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
  const bokeh = new BokehEffect({ focus: 0.12, dof: 0.01 });
  composer.addPass(new EffectPass(stage.camera, bokeh));

  const set = (name: string) => (v: number) => void (bokeh.uniforms.get(name)!.value = v);
  const update = tune(stage, [
    { name: 'aperture', min: 0, max: 0.4, step: 0.005, value: 0.1, sweep: [0, 0.35, 8], digits: 3, set: set('aperture') },
    { name: 'maxBlur', min: 0, max: 1, step: 0.02, value: 1, sweep: [0.15, 1, 5], set: set('maxBlur') },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
