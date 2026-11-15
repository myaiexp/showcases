// FXAAEffect and its thresholds, subpixel quality and sample count
import { EffectComposer, EffectPass, FXAAEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { AA_STAGE, wireCage } from '../../shared/aliasing.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const fxaa = new FXAAEffect();
  const fxaaPass = new EffectPass(stage.camera, fxaa);
  composer.addPass(fxaaPass);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `FXAA subpixelQuality ${fxaa.subpixelQuality.toFixed(2)}, samples ${fxaa.samples}`;
  };
  note();

  if (stage.bar) {
    // The pass is last, so it owns renderToScreen: turning it off hands that to the RenderPass.
    checkbox(stage.bar, 'FXAA on', true, (on) => {
      fxaaPass.enabled = on;
      fxaaPass.renderToScreen = on;
      composer.passes[0]!.renderToScreen = !on;
    });
    slider(stage.bar, 'minEdgeThreshold', 0, 0.2, 0.002, fxaa.minEdgeThreshold, (v) => (fxaa.minEdgeThreshold = v));
    slider(stage.bar, 'maxEdgeThreshold', 0, 0.5, 0.005, fxaa.maxEdgeThreshold, (v) => (fxaa.maxEdgeThreshold = v));
    slider(stage.bar, 'subpixelQuality', 0, 1, 0.05, fxaa.subpixelQuality, (v) => {
      fxaa.subpixelQuality = v;
      note();
    });
    slider(stage.bar, 'samples', 1, 12, 1, fxaa.samples, (v) => {
      fxaa.samples = v;
      note();
    });
  } else {
    let step = 0;
    stage.every(1800, () => {
      fxaa.subpixelQuality = [0.75, 0, 1][++step % 3]!;
      note();
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
