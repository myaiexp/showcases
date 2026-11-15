// postprocessing follows renderer.outputColorSpace: sRGB output versus linear output
import { LinearSRGBColorSpace, SRGBColorSpace, type ColorSpace } from 'three';
import { EffectComposer, EffectPass, RenderPass, VignetteEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);
  const label = overlay(stage.box);

  // The composer picks its buffers' colour space from renderer.outputColorSpace when it is
  // given the renderer, so the composer is rebuilt after each change.
  let composer: EffectComposer | null = null;
  const build = (space: ColorSpace): void => {
    composer?.dispose();
    stage.renderer.outputColorSpace = space;
    composer = new EffectComposer(stage.renderer);
    composer.addPass(new RenderPass(stage.scene, stage.camera));
    composer.addPass(new EffectPass(stage.camera, new VignetteEffect()));
    composer.setSize(stage.size.width, stage.size.height, false);
    label.textContent = `outputColorSpace: ${space}`;
  };
  build(SRGBColorSpace);
  const resize = new ResizeObserver(() => composer?.setSize(stage.size.width, stage.size.height, false));
  resize.observe(stage.canvas);
  stage.onDispose(() => (resize.disconnect(), composer?.dispose()));

  const spaces = [SRGBColorSpace, LinearSRGBColorSpace] as ColorSpace[];
  if (stage.bar) select(stage.bar, 'renderer.outputColorSpace', spaces, build);
  else {
    let i = 0;
    stage.every(2500, () => build(spaces[++i % 2]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer?.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
