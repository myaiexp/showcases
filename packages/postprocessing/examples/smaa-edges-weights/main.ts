// SMAA's two intermediate textures, edges and blend weights, through a TextureEffect
import { EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { AA_STAGE, wireCage } from '../../shared/aliasing.ts';

type View = 'result' | 'edgesTexture' | 'weightsTexture';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const smaa = new SMAAEffect({ preset: SMAAPreset.HIGH });
  const smaaPass = new EffectPass(stage.camera, smaa);
  composer.addPass(smaaPass);
  // A second pass paints one of SMAA's textures over the frame. It is the last pass, so it renders
  // to screen; when it is off, the SMAA pass has to take that job back.
  const texture = new TextureEffect({ texture: smaa.edgesTexture });
  const viewPass = new EffectPass(stage.camera, texture);
  composer.addPass(viewPass);

  const label = overlay(stage.box);
  const show = (view: View): void => {
    if (view !== 'result') texture.texture = smaa[view];
    viewPass.enabled = view !== 'result';
    viewPass.renderToScreen = view !== 'result';
    smaaPass.renderToScreen = view === 'result';
    label.textContent = view === 'result' ? 'SMAA result' : `smaa.${view}`;
  };
  show('edgesTexture');

  const views: View[] = ['edgesTexture', 'weightsTexture', 'result'];
  if (stage.bar) {
    select(stage.bar, 'show', views, show, 'edgesTexture');
  } else {
    let i = 0;
    stage.every(1800, () => show(views[++i % views.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
