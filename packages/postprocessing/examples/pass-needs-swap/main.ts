// Pass.needsSwap: a pass that writes the output buffer without a swap loses its work
import { CopyPass, EffectComposer, RenderPass, ShaderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { passMaterial } from '../../shared/pass-shaders.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const material = stage.own(passMaterial('vec4 effect(vec4 t) { return vec4(1.0 - t.rgb, t.a); }', {}));
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const invert = new ShaderPass(material);
  composer.addPass(invert);
  composer.addPass(new CopyPass());

  const label = overlay(stage.box);
  const set = (swap: boolean): void => {
    // A ShaderPass writes to the output buffer. With needsSwap false the composer does not swap,
    // so the CopyPass after it still reads the untouched input buffer.
    invert.needsSwap = swap;
    label.textContent = `ShaderPass.needsSwap = ${swap}\n${swap ? 'the next pass reads the inverted result' : 'the next pass reads the old input: the effect is lost'}`;
  };
  set(true);
  if (stage.bar) checkbox(stage.bar, 'needsSwap', true, set);
  else {
    let on = true;
    stage.every(2500, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
