// A LUT1DEffect fed a 256x1 DataTexture holding one tone curve at a time
import { DataTexture, LinearFilter, RedFormat, UnsignedByteType } from 'three';
import { EffectComposer, EffectPass, LUT1DEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';

const CURVES = {
  identity: (x) => x,
  invert: (x) => 1 - x,
  's-curve': (x) => x * x * (3 - 2 * x),
  solarize: (x) => Math.abs(2 * x - 1),
  'posterize 4': (x) => Math.round(x * 3) / 3,
  'lift shadows': (x) => Math.pow(x, 0.5),
} satisfies Record<string, (x: number) => number>;
type Curve = keyof typeof CURVES;
const NAMES = Object.keys(CURVES) as Curve[];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  // One red channel texel per input level; the shader reads .r for all three channels.
  const data = new Uint8Array(256);
  const lut = stage.own(new DataTexture(data, 256, 1, RedFormat, UnsignedByteType));
  lut.minFilter = LinearFilter;
  lut.magFilter = LinearFilter;
  lut.generateMipmaps = false;
  const setCurve = (name: Curve): void => {
    for (let i = 0; i < 256; i++) data[i] = Math.round(CURVES[name](i / 255) * 255);
    lut.needsUpdate = true;
  };
  setCurve('identity');

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, new LUT1DEffect(lut)));

  let label: HTMLElement | null = null;
  let shown = '';
  if (stage.bar) select(stage.bar, 'curve', NAMES, setCurve);
  else label = overlay(stage.box, '');

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const name = NAMES[Math.floor(t / 1.8) % NAMES.length]!;
      if (name !== shown) {
        shown = name;
        setCurve(name);
        label.textContent = name;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
