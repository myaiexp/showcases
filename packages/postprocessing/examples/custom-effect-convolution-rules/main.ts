// What EffectPass does with two convolution effects, or a convolution plus a mainUv effect
import { EffectComposer, EffectPass, RenderPass, type Effect } from 'postprocessing';
import type { Camera } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, readout } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { SharpenEffect } from '../custom-effect-convolution/SharpenEffect.ts';
import { WobbleEffect } from '../custom-effect-main-uv/WobbleEffect.ts';

// The pass builds its compound shader in recompile() (the composer calls it on addPass).
// Merging incompatible effects throws an Error there; it is not just a console warning.
const tryMerge = (camera: Camera, ...effects: Effect[]): string => {
  const pass = new EffectPass(camera, ...effects);
  try {
    pass.recompile();
    return 'merged without a problem';
  } catch (error) {
    return `throws: ${(error as Error).message}`;
  } finally {
    pass.dispose();
  }
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const twoConvolutions = tryMerge(stage.camera, new SharpenEffect(), new SharpenEffect());
  const convolutionAndUv = tryMerge(stage.camera, new SharpenEffect(), new WobbleEffect());
  const separate = `${tryMerge(stage.camera, new SharpenEffect())} / ${tryMerge(stage.camera, new WobbleEffect())}`;

  // The fix: one EffectPass per incompatible effect.
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, new SharpenEffect(2)));
  composer.addPass(new EffectPass(stage.camera, new WobbleEffect(0.006)));

  if (stage.bar) {
    const out = readout(stage.box);
    out.style.padding = '8px 4px';
    out.textContent = [
      `EffectPass(camera, sharpen, sharpen)\n  ${twoConvolutions}`,
      `EffectPass(camera, sharpen, wobble)\n  ${convolutionAndUv}`,
      `One effect per pass (rendered above)\n  ${separate}`,
    ].join('\n\n');
  } else {
    overlay(stage.box, 'two convolutions in one pass: throws\nconvolution + mainUv: throws\nseparate passes: rendered here');
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
