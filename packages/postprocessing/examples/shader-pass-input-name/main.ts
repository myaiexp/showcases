// ShaderPass.input names the uniform that receives the buffer, so a tDiffuse-style material fits
import { EffectComposer, RenderPass, ShaderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { passMaterial } from '../../shared/pass-shaders.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // A posterising material that was written with a `tDiffuse` uniform instead of `inputBuffer`.
  const material = passMaterial(
    /* glsl */ `
      vec4 effect(vec4 texel) {
        vec3 c = floor(texel.rgb * 4.0 + 0.5) / 4.0;
        return vec4(c, texel.a);
      }
    `,
    {},
    'tDiffuse',
  );
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // Without this line the pass looks for `inputBuffer`, finds no such uniform and leaves tDiffuse empty.
  const shaderPass = new ShaderPass(material, 'tDiffuse');
  composer.addPass(shaderPass);

  const label = overlay(stage.box);
  const set = (named: boolean): void => {
    // The typings only know the deprecated setInput(); it assigns the `input` property.
    const input = named ? 'tDiffuse' : 'inputBuffer';
    shaderPass.setInput(input);
    label.textContent = `ShaderPass.input = '${input}'\n${named ? 'tDiffuse receives the buffer' : 'no such uniform: tDiffuse stays empty (black)'}`;
  };
  set(true);
  if (stage.bar) checkbox(stage.bar, "input = 'tDiffuse'", true, set);
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
