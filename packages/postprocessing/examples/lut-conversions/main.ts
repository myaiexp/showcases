// A LookupTexture rebuilt with colour space and Uint8 conversions applied in order
import { FloatType } from 'three';
import { EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, readout, select } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const SPACES = ['none', 'convertLinearToSRGB', 'convertSRGBToLinear'] as const;
type Space = (typeof SPACES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const build = (space: Space, bytes: boolean): LookupTexture => {
    const lut = LookupTexture.createNeutral(16);
    fillLut(lut, grades['bleach bypass']);
    // The colour space conversions need FloatType data, so Uint8 goes last.
    if (space === 'convertLinearToSRGB') lut.convertLinearToSRGB();
    if (space === 'convertSRGBToLinear') lut.convertSRGBToLinear();
    if (bytes) lut.convertToUint8();
    return lut;
  };
  let lut = build('none', false);
  stage.onDispose(() => lut.dispose());
  const effect = new LUT3DEffect(lut);
  let space: Space = 'none';
  let bytes = false;

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const info = stage.bar ? readout(stage.box) : null;
  const label = stage.bar ? null : overlay(stage.box, '');
  const apply = (): void => {
    const next = build(space, bytes);
    effect.lut = next;
    lut.dispose();
    lut = next;
    const text = `${space}${bytes ? ' + convertToUint8' : ''}`;
    if (info) {
      const type = lut.type === FloatType ? 'FloatType' : 'UnsignedByteType';
      info.textContent = `${type}, colorSpace "${lut.colorSpace}", ${lut.image.data!.byteLength} bytes`;
    }
    if (label) label.textContent = text;
  };
  if (stage.bar) {
    select(stage.bar, 'colour space', SPACES, (v) => ((space = v), apply()));
    checkbox(stage.bar, 'convertToUint8', false, (on) => ((bytes = on), apply()));
  }
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 2) % SPACES.length;
      if (s !== step) {
        step = s;
        space = SPACES[s]!;
        apply();
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
