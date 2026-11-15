// EffectPass.timeScale: each pass advances its own `time` uniform at its own speed
import { EffectComposer, EffectPass, RenderPass, ScanlineEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { UniformsEffect } from '../custom-effect-builtin-uniforms/UniformsEffect.ts';

// 6.39.6 declares no `timeScale` on EffectPass in its typings, though the class has it.
type Scaled = EffectPass & { timeScale: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const stripes = new UniformsEffect();
  stripes.mode = 1; // diagonal stripes driven by `time`
  const lines = new ScanlineEffect({ density: 0.5 });
  lines.scrollSpeed = 0.3;

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const stripePass = new EffectPass(stage.camera, stripes) as Scaled;
  const linePass = new EffectPass(stage.camera, lines) as Scaled;
  composer.addPass(stripePass);
  composer.addPass(linePass);

  const label = overlay(stage.box);
  const show = (): void => {
    label.textContent = `stripes pass timeScale ${stripePass.timeScale.toFixed(2)}\nscan line pass timeScale ${linePass.timeScale.toFixed(2)}`;
  };
  show();
  if (stage.bar) {
    slider(stage.bar, 'stripes timeScale', 0, 4, 0.05, 1, (v) => {
      stripePass.timeScale = v;
      show();
    });
    slider(stage.bar, 'scan lines timeScale', 0, 4, 0.05, 1, (v) => {
      linePass.timeScale = v;
      show();
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      stripePass.timeScale = 1.5 + 1.5 * Math.sin(t * 0.8);
      linePass.timeScale = 1.5 - 1.5 * Math.sin(t * 0.8);
      show();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
