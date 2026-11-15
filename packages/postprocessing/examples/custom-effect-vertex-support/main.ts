// An effect's vertex shader: mainSupport computes a varying once per vertex, not per pixel
import { Color } from 'three';
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { GradientEffect } from './GradientEffect.ts';

const palettes: [number, number][] = [
  [0xff5a36, 0x36c8ff],
  [0xb45cff, 0xffd23d],
  [0x2dffb0, 0xff3d7f],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const gradient = new GradientEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, gradient));

  const label = overlay(stage.box);
  let index = 0;
  const next = (): void => {
    const [a, b] = palettes[index++ % palettes.length]!;
    gradient.colorA.set(new Color(a));
    gradient.colorB.set(new Color(b));
    label.textContent = `mainSupport -> varying vTint\n#${a.toString(16)} to #${b.toString(16)}`;
  };
  next();
  if (stage.bar) button(stage.bar, 'next palette', next);
  else stage.every(3000, next);

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
