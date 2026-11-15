// RealisticBokehEffect: bias and fringe shift weight to the disc edge
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
  const bokeh = new PatchedRealisticBokehEffect({ focus: 0.05, fStop: 10, maxBlur: 3, luminanceGain: 3 });
  // The typings declare rings and samples as booleans, so they are set as properties.
  bokeh.rings = 5;
  bokeh.samples = 3;
  composer.addPass(new EffectPass(stage.camera, bokeh));

  // bias weights the outer rings of the blur (0 weighs every ring equally, higher values favour the rim and make ring-edged discs);
  // fringe pulls the red, green and blue samples apart, so the discs get colour fringes.
  const u = (name: string) => (v: number) => void (bokeh.uniforms.get(name)!.value = v);
  const update = tune(stage, [
    { name: 'bias', min: 0, max: 1, step: 0.02, value: 0.5, sweep: [0, 1, 8], set: u('bias') },
    { name: 'fringe', min: 0, max: 3, step: 0.05, value: 0.7, sweep: [0, 3, 11], set: u('fringe') },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
