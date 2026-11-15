// TextureEffect setTextureSwizzleRGBA: rewire which texture channel feeds which output channel
import { BlendFunction, ColorChannel, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { channelTexture } from '../../shared/texture-art.ts';

const { RED: R, GREEN: G, BLUE: B, ALPHA: A } = ColorChannel;
// name -> [r, g, b, a] source channels. setTextureSwizzleRGBA(r) alone copies r into all four.
const SWIZZLES: Record<string, [number, number, number, number]> = {
  'rgba (default)': [R, G, B, A],
  'bgra': [B, G, R, A],
  'grba': [G, R, B, A],
  'rrrr (red as grey)': [R, R, R, R],
  'gggg (green as grey)': [G, G, G, G],
  'bbbb (blue as grey)': [B, B, B, B],
  'aaaa (alpha as grey)': [A, A, A, A],
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // R runs left to right, G bottom to top, B is a checker, A a radial fade.
  const texture = stage.own(channelTexture());
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const effect = new TextureEffect({ blendFunction: BlendFunction.SRC, texture });
  composer.addPass(new EffectPass(stage.camera, effect));

  const label = overlay(stage.box);
  const names = Object.keys(SWIZZLES);
  const set = (name: string): void => {
    effect.setTextureSwizzleRGBA(...SWIZZLES[name]!);
    label.textContent = `setTextureSwizzleRGBA(${SWIZZLES[name]!.join(', ')})  ${name}`;
  };
  set(names[0]!);
  if (stage.bar) select(stage.bar, 'swizzle', names, set);
  else {
    let i = 0;
    stage.every(1800, () => set(names[++i % names.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
