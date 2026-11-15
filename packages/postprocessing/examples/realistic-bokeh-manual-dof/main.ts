// RealisticBokehEffect: manualDoF swaps the lens maths for four hand-set numbers
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Vector4 } from 'three';
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
  // manualDoF replaces the lens formula with the `dof` uniform, a Vector4 (x, y, z, w):
  // blur in front of the focus = (distance - x) / y, behind it = (distance - z) / w.
  const bokeh = new PatchedRealisticBokehEffect({ focus: 0.12, maxBlur: 2, manualDoF: true });
  composer.addPass(new EffectPass(stage.camera, bokeh));
  const dof = bokeh.uniforms.get('dof')!.value as Vector4;

  const update = tune(stage, [
    { name: 'near start (x)', min: 0, max: 0.15, step: 0.005, value: 0.01, sweep: [0, 0.1, 8], digits: 3, set: (v) => (dof.x = v) },
    { name: 'near falloff (y)', min: 0.01, max: 0.5, step: 0.01, value: 0.1, digits: 2, set: (v) => (dof.y = v) },
    { name: 'far start (z)', min: 0, max: 0.3, step: 0.005, value: 0.02, sweep: [0, 0.2, 10], digits: 3, set: (v) => (dof.z = v) },
    { name: 'far falloff (w)', min: 0.01, max: 1, step: 0.01, value: 0.15, digits: 2, set: (v) => (dof.w = v) },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
