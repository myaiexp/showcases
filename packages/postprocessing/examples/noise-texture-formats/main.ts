// NoiseTexture options: size, channel format (Red, RG, RGBA) and data type, shown full screen
import { FloatType, RedFormat, RGBAFormat, RGFormat, UnsignedByteType, type Texture } from 'three';
import { BlendFunction, EffectComposer, EffectPass, NoiseTexture, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';

const formats = { RedFormat, RGFormat, RGBAFormat };
const types = { UnsignedByteType, FloatType };
type FormatName = keyof typeof formats;
type TypeName = keyof typeof types;
const sizes = ['4', '16', '64', '256'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false });
  const effect = new TextureEffect({ blendFunction: BlendFunction.NORMAL });
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  let format: FormatName = 'RGBAFormat';
  let type: TypeName = 'UnsignedByteType';
  let size = 16;
  let texture: Texture | null = null;
  const label = overlay(stage.box);
  const build = (): void => {
    texture?.dispose();
    // A new NoiseTexture fills every texel with Math.random(): bytes in 0..255, or floats in 0..1.
    texture = new NoiseTexture(size, size, formats[format], types[type]);
    effect.texture = texture;
    label.textContent = `new NoiseTexture(${size}, ${size}, ${format}, ${type})`;
  };
  build();
  stage.onDispose(() => texture?.dispose());

  if (stage.bar) {
    select(stage.bar, 'size', sizes, (v) => ((size = Number(v)), build()), '16');
    select(stage.bar, 'format', Object.keys(formats) as FormatName[], (v) => ((format = v), build()), format);
    select(stage.bar, 'type', Object.keys(types) as TypeName[], (v) => ((type = v), build()), type);
  } else {
    const steps: [number, FormatName, TypeName][] = [
      [16, 'RGBAFormat', 'UnsignedByteType'],
      [16, 'RedFormat', 'UnsignedByteType'],
      [16, 'RGFormat', 'FloatType'],
      [64, 'RGBAFormat', 'FloatType'],
    ];
    let i = 0;
    stage.every(1800, () => {
      [size, format, type] = steps[++i % steps.length]!;
      build();
    });
  }

  stage.run((dt) => composer.render(dt));
  return () => stage.dispose();
};

export default mount;
