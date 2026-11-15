// ParticleRenderer.pivot: shifts each quad, so rotation swings about it
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { arrowTexture, constant, emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 11] });
  const say = caption(stage, '');
  const make = (x: number, y: number) => {
    const e = emitter(stage, root, { position: [x, -1.8, 0], texture: arrowTexture(stage), tint: [1, 0.85, 0.5] });
    e.gen.main.startSize.constant = 0.8;
    e.gen.main.startSpeed.constant = 0.8;
    e.gen.main.startLifetime.constant = 2.4;
    e.gen.emission.rateOverTime.constant = 4;
    e.gen.rotationOverLifetime.enabled = true;
    e.gen.rotationOverLifetime.rotationZ = constant(120);
    e.renderer.pivot.set(0, y, 0);
    return e;
  };
  const a = make(-2.4, 0);
  const b = make(2.4, -0.5);
  const text = (): void => say(`pivot y: ${a.renderer.pivot.y.toFixed(2)} (left) | ${b.renderer.pivot.y.toFixed(2)} (right), rotating 120 deg/s`);
  if (stage.preview) tick(root, (_dt, t) => ((b.renderer.pivot.y = -0.5 * Math.sin(t)), text()));
  else {
    slider(stage.bar, 'right pivot.y', -1, 1, 0.01, -0.5, (v) => ((b.renderer.pivot.y = v), text()));
    slider(stage.bar, 'right pivot.x', -1, 1, 0.01, 0, (v) => (b.renderer.pivot.x = v));
    text();
  }
  return stage.dispose;
};

export default mount;
