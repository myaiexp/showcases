// A MipmapBlurPass used alone, its texture painted by a TextureEffect
import { EffectComposer, EffectPass, MipmapBlurPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The pass does not draw to the frame; it blurs its input into `texture`.
  const blur = new MipmapBlurPass();
  composer.addPass(blur);
  composer.addPass(new EffectPass(stage.camera, new TextureEffect({ texture: blur.texture })));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `levels ${blur.levels}, radius ${blur.radius.toFixed(2)}`;
  };
  note();
  if (stage.bar) {
    slider(stage.bar, 'levels', 1, 10, 1, blur.levels, (v) => ((blur.levels = v), note()));
    slider(stage.bar, 'radius', 0, 1, 0.01, blur.radius, (v) => ((blur.radius = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      blur.radius = wave(t, 0.2, 1);
      note();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
