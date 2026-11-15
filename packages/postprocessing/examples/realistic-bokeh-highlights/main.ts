// RealisticBokehEffect: luminanceThreshold and luminanceGain brighten the bokeh discs
import { HalfFloatType } from 'three';
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PatchedRealisticBokehEffect } from '../../shared/legacy-glsl.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE, lamps } from '../../shared/dof.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);
  lamps(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bokeh = new PatchedRealisticBokehEffect({ focus: 0.05, fStop: 10, maxBlur: 3 });
  // The typings declare rings and samples as booleans, so they are set as properties.
  bokeh.rings = 4;
  bokeh.samples = 3;
  composer.addPass(new EffectPass(stage.camera, bokeh));

  // Samples brighter than luminanceThreshold are boosted by luminanceGain, so the lamps
  // spread into bright discs instead of dull smudges.
  const u = (name: string) => (v: number) => void (bokeh.uniforms.get(name)!.value = v);
  const update = tune(stage, [
    { name: 'luminanceThreshold', min: 0, max: 3, step: 0.05, value: 0.5, sweep: [0, 2, 9], set: u('luminanceThreshold') },
    { name: 'luminanceGain', min: 0, max: 8, step: 0.1, value: 2, sweep: [0, 6, 7], digits: 1, set: u('luminanceGain') },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
