// DepthCopyPass copies the composer's depth buffer into a texture, packed as RGBA or as plain floats
import { BasicDepthPacking, RGBADepthPacking } from 'three';
import { DepthCopyPass, EffectComposer, RenderPass, ShaderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { depthViewMaterial } from '../../shared/pass-shaders.ts';

const PACKINGS = ['RGBADepthPacking', 'BasicDepthPacking'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { far: 30 });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // Two copies of the same depth. needsDepthTexture makes the composer create its depth texture
  // and hand it to the passes: no depth pass renders the scene a second time.
  const copies = {
    RGBADepthPacking: new DepthCopyPass({ depthPacking: RGBADepthPacking }),
    BasicDepthPacking: new DepthCopyPass({ depthPacking: BasicDepthPacking }),
  };
  composer.addPass(copies.RGBADepthPacking);
  composer.addPass(copies.BasicDepthPacking);
  const view = stage.own(depthViewMaterial(stage.camera));
  composer.addPass(new ShaderPass(view));

  const label = overlay(stage.box);
  const set = (name: (typeof PACKINGS)[number]): void => {
    const pass = copies[name];
    copies.RGBADepthPacking.enabled = pass === copies.RGBADepthPacking;
    copies.BasicDepthPacking.enabled = pass === copies.BasicDepthPacking;
    view.uniforms.depthTex!.value = pass.texture;
    view.uniforms.mode!.value = name === 'RGBADepthPacking' ? 1 : 2;
    label.textContent = `DepthCopyPass({ depthPacking: ${name} })\ntexture type: ${pass.texture.type === 1009 ? 'UnsignedByte (RGBA)' : 'Float (red channel)'}`;
  };
  set('RGBADepthPacking');
  if (stage.bar) select(stage.bar, 'depthPacking', PACKINGS, set, 'RGBADepthPacking');
  else {
    let i = 0;
    stage.every(2500, () => set(PACKINGS[++i % 2]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
