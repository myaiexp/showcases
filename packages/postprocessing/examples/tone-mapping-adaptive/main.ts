// ToneMappingMode.REINHARD2_ADAPTIVE: exposure that adapts when the scene gets brighter or darker
import { EffectComposer, EffectPass, RenderPass, ToneMappingEffect, ToneMappingMode } from 'postprocessing';
import { HalfFloatType } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay, select, slider } from '../../shared/controls.ts';
import { hdrShowroom } from '../../shared/tone.ts';

const DIM = 0.04;
const BRIGHT = 1;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = hdrShowroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The effect downsamples the frame to a luminance texture (resolution, a power of two), then chases
  // its average at adaptationRate. minLuminance stops a dark scene from being boosted without limit.
  const toneMapping = new ToneMappingEffect({ mode: ToneMappingMode.REINHARD2_ADAPTIVE, resolution: 256, adaptationRate: 1, minLuminance: 0.01 });
  composer.addPass(new EffectPass(stage.camera, toneMapping));

  let level = BRIGHT;
  const label = overlay(stage.box);
  const note = (): void => {
    const m = toneMapping.adaptiveLuminanceMaterial;
    label.textContent = `scene light x${level}\nadaptationRate ${m.adaptationRate.toFixed(1)}, minLuminance ${m.minLuminance.toFixed(3)}, resolution ${toneMapping.resolution}`;
  };
  const setLevel = (k: number): void => {
    level = k;
    subject.setLevel(k);
    note();
  };
  setLevel(BRIGHT);

  if (stage.bar) {
    button(stage.bar, 'lights off', () => setLevel(DIM));
    button(stage.bar, 'lights on', () => setLevel(BRIGHT));
    slider(stage.bar, 'scene light', 0.01, 2, 0.01, BRIGHT, setLevel);
    slider(stage.bar, 'adaptationRate', 0.1, 10, 0.1, 1, (v) => ((toneMapping.adaptiveLuminanceMaterial.adaptationRate = v), note()));
    slider(stage.bar, 'minLuminance', 0, 0.5, 0.005, 0.01, (v) => ((toneMapping.adaptiveLuminanceMaterial.minLuminance = v), note()));
    select(stage.bar, 'resolution', ['16', '64', '256', '512'] as const, (v) => ((toneMapping.resolution = Number(v)), note()), '256');
  } else {
    toneMapping.adaptiveLuminanceMaterial.adaptationRate = 1.5;
    stage.every(3500, () => setLevel(level === BRIGHT ? DIM : BRIGHT));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
