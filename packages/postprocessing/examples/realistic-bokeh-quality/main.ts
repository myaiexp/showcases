// RealisticBokehEffect: rings and samples set the blur quality, pentagon the shape
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PatchedRealisticBokehEffect } from '../../shared/legacy-glsl.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { DOF_STAGE, lamps } from '../../shared/dof.ts';
import { HalfFloatType } from 'three';

// Cards step through these; each change recompiles the shader, so they do not sweep.
const PRESETS = [
  { rings: 1, samples: 2, pentagon: false },
  { rings: 3, samples: 3, pentagon: false },
  { rings: 6, samples: 5, pentagon: true },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, DOF_STAGE);
  const subject = corridor(stage.scene);
  lamps(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bokeh = new PatchedRealisticBokehEffect({ focus: 0.1, fStop: 20, maxBlur: 3, luminanceThreshold: 0.5, luminanceGain: 3 });
  // The typings declare rings and samples as booleans, so they are set as properties.
  bokeh.rings = 3;
  bokeh.samples = 3;
  composer.addPass(new EffectPass(stage.camera, bokeh));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `rings ${bokeh.rings}, samples ${bokeh.samples}, pentagon ${bokeh.pentagon}`;
  };
  note();
  if (stage.bar) {
    // rings and samples are shader defines: every change recompiles the effect pass.
    slider(stage.bar, 'rings', 1, 8, 1, 3, (v) => ((bokeh.rings = v), note()));
    slider(stage.bar, 'samples', 1, 8, 1, 3, (v) => ((bokeh.samples = v), note()));
    checkbox(stage.bar, 'pentagon', false, (on) => ((bokeh.pentagon = on), note()));
  }
  let step = 0;
  stage.every(2200, () => {
    if (!stage.preview) return;
    Object.assign(bokeh, PRESETS[step++ % PRESETS.length]);
    note();
  });

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
