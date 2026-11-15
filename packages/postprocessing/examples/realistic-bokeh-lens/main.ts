// RealisticBokehEffect: focalLength and fStop shape the depth of field like a real lens
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PatchedRealisticBokehEffect } from '../../shared/legacy-glsl.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE } from '../../shared/dof.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bokeh = new PatchedRealisticBokehEffect({ focus: 0.12, focalLength: 24, fStop: 24, maxBlur: 2 });
  composer.addPass(new EffectPass(stage.camera, bokeh));

  // A longer focalLength and a lower fStop (a wider aperture) both make the sharp zone thinner.
  const u = (name: string) => (v: number) => void (bokeh.uniforms.get(name)!.value = v);
  const update = tune(stage, [
    { name: 'focalLength', min: 8, max: 80, step: 1, value: 24, sweep: [10, 70, 9], digits: 0, set: u('focalLength') },
    { name: 'fStop', min: 2, max: 120, step: 1, value: 24, sweep: [100, 6, 13], digits: 0, set: u('fStop') },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
