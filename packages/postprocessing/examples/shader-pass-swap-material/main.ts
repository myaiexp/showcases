// Pass.fullscreenMaterial swapped at runtime between two materials
import { EffectComposer, RenderPass, ShaderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { passMaterial } from '../../shared/pass-shaders.ts';

const NAMES = ['invert', 'duotone', 'threshold'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const materials = {
    invert: passMaterial('vec4 effect(vec4 t) { return vec4(1.0 - t.rgb, t.a); }', {}),
    duotone: passMaterial(
      'vec4 effect(vec4 t) { float l = dot(t.rgb, vec3(0.299, 0.587, 0.114)); return vec4(mix(vec3(0.05, 0.1, 0.35), vec3(1.0, 0.75, 0.3), l), t.a); }',
      {},
    ),
    threshold: passMaterial('vec4 effect(vec4 t) { return vec4(vec3(step(0.35, dot(t.rgb, vec3(0.299, 0.587, 0.114)))), t.a); }', {}),
  };
  for (const m of Object.values(materials)) stage.own(m);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const shaderPass = new ShaderPass(materials.invert);
  composer.addPass(shaderPass);

  const label = overlay(stage.box);
  const set = (name: (typeof NAMES)[number]): void => {
    // The pass draws a mesh with this material: assigning a new one swaps the shader.
    shaderPass.fullscreenMaterial = materials[name];
    label.textContent = `fullscreenMaterial = ${name}`;
  };
  set('invert');
  if (stage.bar) select(stage.bar, 'fullscreenMaterial', NAMES, set, 'invert');
  else {
    let i = 0;
    stage.every(2200, () => set(NAMES[++i % NAMES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
