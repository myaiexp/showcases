// Overriding update(): the EffectPass calls it every frame, so an effect can run its own clock
import { BlendFunction, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, readout, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { HeartbeatEffect } from './HeartbeatEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const heart = new HeartbeatEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, heart));

  const label = stage.bar ? readout(stage.box) : overlay(stage.box);
  if (stage.bar) {
    slider(stage.bar, 'bpm', 20, 180, 1, heart.bpm, (v) => (heart.bpm = v));
    // SKIP draws nothing, yet update() still runs: the beat count keeps going.
    checkbox(stage.bar, 'blendFunction SKIP', false, (on) => {
      heart.blendMode.blendFunction = on ? BlendFunction.SKIP : BlendFunction.NORMAL;
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
    label.textContent = `update() ran: ${heart.phase.toFixed(1)} beats at ${heart.bpm} bpm`;
  });
  return () => stage.dispose();
};

export default mount;
