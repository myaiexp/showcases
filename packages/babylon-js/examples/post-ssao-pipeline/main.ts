// SSAORenderingPipeline: ambient occlusion darkens creases and contacts
import { SSAORenderingPipeline } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createSampleScene } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const sample = createSampleScene(scene, canvas, ctx.preview);
  const camera = sample.camera;

  // Ratios below 1 render the SSAO and blur passes at reduced size, for speed.
  const ssao = new SSAORenderingPipeline('ssaopipeline', scene, { ssaoRatio: ctx.preview ? 0.5 : 0.75, combineRatio: 1 }, [camera]);
  ssao.totalStrength = 1.4;
  ssao.radius = 0.0002;

  const manager = scene.postProcessRenderPipelineManager;
  // Detaching the combine effect shows the raw occlusion term instead of the blended image.
  const showOnly = (on: boolean): void =>
    on
      ? manager.disableEffectInPipeline('ssaopipeline', ssao.SSAOCombineRenderEffect, camera)
      : manager.enableEffectInPipeline('ssaopipeline', ssao.SSAOCombineRenderEffect, camera);

  let flip = 0;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('SSAO attached', true, (on) =>
      on ? manager.attachCamerasToRenderPipeline('ssaopipeline', camera) : manager.detachCamerasFromRenderPipeline('ssaopipeline', camera),
    );
    panel.check('show occlusion only (combine disabled)', false, showOnly);
    panel.row();
    panel.slider('totalStrength', 0, 3, 0.05, ssao.totalStrength, (v) => (ssao.totalStrength = v));
    panel.slider('radius', 0.00005, 0.001, 0.00001, ssao.radius, (v) => (ssao.radius = v));
    panel.slider('area', 0.001, 0.02, 0.0005, ssao.area, (v) => (ssao.area = v));
    panel.slider('base', 0, 1, 0.05, ssao.base, (v) => (ssao.base = v));
  }

  stage.run(() => {
    sample.animate();
    // The card alternates the final image and the occlusion buffer every few seconds.
    if (ctx.preview && ++flip % 180 === 0) showOnly((flip / 180) % 2 === 1);
  });

  return () => {
    ssao.dispose();
    stage.dispose();
  };
};

export default mount;
