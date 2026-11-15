// RealisticBokehEffect: focus plane and the showFocus debug highlight
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PatchedRealisticBokehEffect } from '../../shared/legacy-glsl.ts';
import { checkbox } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE } from '../../shared/dof.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bokeh = new PatchedRealisticBokehEffect({ focus: 0.1, focalLength: 24, fStop: 24, maxBlur: 2, showFocus: stage.preview });
  composer.addPass(new EffectPass(stage.camera, bokeh));

  // The JSDoc calls focus "world units", but the shader compares it with linear depth in [0, 1]
  // (the fraction of the near-to-far range), so 0.1 is roughly 6 units from this camera.
  const update = tune(stage, [
    { name: 'focus', min: 0.02, max: 0.7, step: 0.005, value: 0.1, sweep: [0.04, 0.5, 11], digits: 3, set: (v) => (bokeh.uniforms.get('focus')!.value = v) },
  ]);
  if (stage.bar) checkbox(stage.bar, 'showFocus', false, (on) => (bokeh.showFocus = on));

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
