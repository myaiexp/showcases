// A GammaCorrectionEffect (deprecated in the docs) with a gamma slider
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { PatchedGammaCorrectionEffect } from '../../shared/legacy-glsl.ts';
import { slider, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // There is no gamma accessor in the JSDoc, so the factor is set through the uniform map.
  const gamma = new PatchedGammaCorrectionEffect({ gamma: 1 });
  const setGamma = (v: number): void => {
    gamma.uniforms.get('gamma')!.value = v;
  };
  composer.addPass(new EffectPass(stage.camera, gamma));

  let label: HTMLElement | null = null;
  if (stage.bar) {
    slider(stage.bar, 'gamma', 0.5, 4, 0.05, 1, setGamma);
  } else {
    label = overlay(stage.box, '');
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const v = 1 + 1.2 * (0.5 + 0.5 * Math.sin(t * 0.9));
      setGamma(v);
      label.textContent = `gamma ${v.toFixed(2)}`;
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
