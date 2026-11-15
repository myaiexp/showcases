// CircleShape: radius, arc and arcMode (Random or Loop)
import { CircleShape, ParticleShapeArcMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { select, slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 3, 8], target: [0, 0.4, 0] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { tint: [1, 0.7, 0.9], position: [0, -1.2, 0] });
  const shape = new CircleShape();
  shape.radius = 1.6;
  shape.arc = 360;
  e.gen.emission.shape = shape;
  e.gen.main.startSpeed.constant = 1.2;
  e.gen.main.startLifetime.constant = 1.6;
  e.gen.emission.rateOverTime.constant = 26;
  const note = (): void => say(`CircleShape radius ${shape.radius.toFixed(1)}, arc ${Math.round(shape.arc)}, ${ParticleShapeArcMode[shape.arcMode]}`);
  if (stage.preview) {
    let mode = -1;
    tick(root, (_dt, t) => {
      const m = Math.floor(t / 3) % 2;
      if (m !== mode) {
        mode = m;
        shape.arcMode = m ? ParticleShapeArcMode.Loop : ParticleShapeArcMode.Random;
        shape.arc = 200;
      }
      note();
    });
  } else {
    slider(stage.bar, 'radius', 0.2, 2.5, 0.1, 1.6, (v) => ((shape.radius = v), note()));
    slider(stage.bar, 'arc', 20, 360, 1, 360, (v) => ((shape.arc = v), note()));
    slider(stage.bar, 'arcSpeed', 0, 3, 0.1, 1, (v) => (shape.arcSpeed = v));
    select(stage.bar, 'arcMode', ['Random', 'Loop'] as const, (v) => ((shape.arcMode = ParticleShapeArcMode[v]), note()));
    note();
  }
  return stage.dispose;
};

export default mount;
