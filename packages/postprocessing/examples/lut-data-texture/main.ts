// The same grade as a 3D LookupTexture and as a flattened 2D DataTexture in LUT3DEffect
import { EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, readout } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const lut3d = stage.own(LookupTexture.createNeutral(16));
  fillLut(lut3d, grades['cross process']);
  const lut2d = stage.own(lut3d.toDataTexture());
  const effect = new LUT3DEffect(lut3d);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const info = stage.bar ? readout(stage.box, `3D texture ${lut3d.image.width}x${lut3d.image.height}x${lut3d.image.depth}`) : null;
  const use2d = (on: boolean): void => {
    effect.lut = on ? lut2d : lut3d;
    const text = on ? `2D DataTexture ${lut2d.image.width}x${lut2d.image.height}` : `3D texture ${lut3d.image.width}x${lut3d.image.height}x${lut3d.image.depth}`;
    if (info) info.textContent = text;
  };
  if (stage.bar) checkbox(stage.bar, 'use toDataTexture()', false, use2d);
  const cardLabel = stage.bar ? null : overlay(stage.box, '');
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (cardLabel) {
      const s = Math.floor(t / 2) % 2;
      if (s !== step) {
        step = s;
        effect.lut = s ? lut2d : lut3d;
        cardLabel.textContent = s ? '2D DataTexture 16x256' : '3D 16x16x16';
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
