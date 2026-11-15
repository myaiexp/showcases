// A SepiaEffect faded by blendMode.opacity, with weight presets written into its vectors
import type { Vector3 } from 'three';
import { EffectComposer, EffectPass, RenderPass, SepiaEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';

type V = [number, number, number];
const PRESETS: Record<string, [V, V, V]> = {
  sepia: [[0.393, 0.769, 0.189], [0.349, 0.686, 0.168], [0.272, 0.534, 0.131]],
  cyanotype: [[0.15, 0.3, 0.05], [0.25, 0.55, 0.15], [0.35, 0.8, 0.3]],
  'green phosphor': [[0, 0, 0], [0.39, 0.77, 0.14], [0, 0, 0]],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const sepia = new SepiaEffect();
  composer.addPass(new EffectPass(stage.camera, sepia));

  const usePreset = (name: string): void => {
    const [r, g, b] = PRESETS[name]!;
    // The weights getters are in the JSDoc but not in the 6.39.6 type definitions: read the uniforms.
    const weights = (key: string): Vector3 => sepia.uniforms.get(key)!.value as Vector3;
    weights('weightsR').set(...r);
    weights('weightsG').set(...g);
    weights('weightsB').set(...b);
  };
  let animate = true;
  let label: HTMLElement | null = null;
  let shown = '';
  if (stage.bar) {
    select(stage.bar, 'weights', Object.keys(PRESETS), usePreset);
    slider(stage.bar, 'opacity', 0, 1, 0.01, 1, (v) => {
      animate = false;
      sepia.blendMode.opacity.value = v;
    });
  } else {
    label = overlay(stage.box, '');
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (animate) sepia.blendMode.opacity.value = 0.5 + 0.5 * Math.sin(t * 1.1);
    if (label) {
      const names = Object.keys(PRESETS);
      const name = names[Math.floor(t / 3.5) % names.length]!;
      if (name !== shown) {
        shown = name;
        usePreset(name);
        label.textContent = name;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
