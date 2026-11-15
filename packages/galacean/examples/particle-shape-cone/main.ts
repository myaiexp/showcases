// ConeShape: angle, radius, length and emitType
import { ConeEmitType, ConeShape } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { select, slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx, { camera: [0, 1.5, 9], target: [0, 1, 0] });
  const say = caption(stage, '');
  const e = emitter(stage, root, { tint: [1, 0.85, 0.5], position: [0, -1.8, 0] });
  const shape = new ConeShape();
  shape.angle = 25;
  shape.radius = 0.5;
  shape.length = 5;
  e.gen.emission.shape = shape;
  e.gen.main.startSpeed.constant = 2.4;
  e.gen.emission.rateOverTime.constant = 24;
  const note = (): void => say(`ConeShape angle ${shape.angle.toFixed(0)}, radius ${shape.radius.toFixed(1)}, ${ConeEmitType[shape.emitType]}`);
  if (stage.preview) tick(root, (_dt, t) => ((shape.angle = 5 + 55 * (0.5 + 0.5 * Math.sin(t * 0.9))), note()));
  else {
    slider(stage.bar, 'angle', 0, 85, 1, 25, (v) => ((shape.angle = v), note()));
    slider(stage.bar, 'radius', 0.05, 2, 0.05, 0.5, (v) => ((shape.radius = v), note()));
    slider(stage.bar, 'length', 0.5, 8, 0.1, 5, (v) => (shape.length = v));
    select(stage.bar, 'emitType', ['Base', 'Volume'] as const, (v) => ((shape.emitType = ConeEmitType[v]), note()));
    note();
  }
  return stage.dispose;
};

export default mount;
