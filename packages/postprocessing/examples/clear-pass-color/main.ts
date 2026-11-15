// ClearPass with overrideClearColor and overrideClearAlpha, then a RenderPass that clears nothing
import { Color } from 'three';
import { ClearPass, CopyPass, EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  // No scene background and a canvas with alpha, so the clear colour and alpha are what shows.
  const stage = createStage(el, ctx, { background: null, renderer: { alpha: true } });
  stage.canvas.style.background = 'repeating-conic-gradient(#3a3f4a 0 25%, #5b6170 0 50%) 0 0 / 24px 24px';
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  const clearPass = new ClearPass(true, true, false);
  clearPass.overrideClearColor = new Color();
  composer.addPass(clearPass);
  // The ClearPass already cleared the buffer, so the RenderPass must not clear it again.
  const renderPass = new RenderPass(stage.scene, stage.camera);
  renderPass.clearPass.enabled = false;
  composer.addPass(renderPass);
  // A RenderPass that is last draws to the canvas, past the cleared buffer: end with a CopyPass.
  composer.addPass(new CopyPass());

  const update = tune(
    stage,
    [
      { name: 'hue', min: 0, max: 1, step: 0.01, value: 0.6, sweep: [0, 1, 10], set: (v) => clearPass.overrideClearColor!.setHSL(v, 0.7, 0.5) },
      { name: 'overrideClearAlpha', min: 0, max: 1, step: 0.01, value: 1, sweep: [0.2, 1, 7], set: (v) => (clearPass.overrideClearAlpha = v) },
    ],
    'ClearPass',
  );

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
