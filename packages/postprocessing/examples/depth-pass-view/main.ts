// DepthPass renders scene depth into an RGBA-packed texture: raw, then unpacked
import { DepthPass, EffectComposer, ShaderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { depthViewMaterial } from '../../shared/pass-shaders.ts';

const MODES = ['unpacked depth', 'raw packed texture'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { far: 30 });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  // DepthPass renders the scene itself, with a depth material, into its own render target.
  const depthPass = new DepthPass(stage.scene, stage.camera);
  composer.addPass(depthPass);
  const view = stage.own(depthViewMaterial(stage.camera));
  view.uniforms.depthTex!.value = depthPass.texture;
  composer.addPass(new ShaderPass(view));

  const label = overlay(stage.box);
  const setMode = (m: (typeof MODES)[number]): void => {
    view.uniforms.mode!.value = m === MODES[0] ? 1 : 0;
    label.textContent = `DepthPass.texture, ${m}\nresolution scale ${depthPass.resolution.scale}`;
  };
  setMode(MODES[0]);
  if (stage.bar) {
    select(stage.bar, 'view', MODES, setMode, MODES[0]);
    slider(stage.bar, 'resolution scale', 0.1, 1, 0.05, 1, (v) => {
      depthPass.resolution.scale = v;
      setMode(MODES[view.uniforms.mode!.value === 1 ? 0 : 1]);
    });
  } else {
    let i = 0;
    stage.every(2500, () => setMode(MODES[++i % 2]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
