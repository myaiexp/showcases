// Layout: absolute rotation, scale or skew through incremental methods
import { Box, Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

type Op = 'rotateOf' | 'scaleOf' | 'skewOf';
const RANGE: Record<Op, [number, number, number]> = { rotateOf: [-90, 90, 1], scaleOf: [0.5, 2, 0.05], skewOf: [-60, 60, 1] };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The methods add to what is there. Subtract the current value (45 - rect.rotation) to land on a target.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.45;
  const rect = new Box({ x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 26, width: S, height: S });
  rect.add(new Rect({ width: S, height: S, fill: '#32cd79', cornerRadius: 8 }));
  rect.add(new Text({ x: S * 0.1, y: S * 0.25, width: S * 0.8, text: 'F', fontSize: S * 0.5, fill: '#fff', textAlign: 'center', hittable: false }));
  leafer.add(rect);
  const show = label(stage, '', true);
  const mid = { x: S / 2, y: S / 2 };
  const go = (op: Op, target: number): void => {
    // the docs' forms: the target minus what the element already has
    if (op === 'rotateOf') {
      rect.rotateOf(mid, target - rect.rotation!);
      show(`rect.rotateOf(mid, ${target} - rect.rotation)\nrotation is ${Math.round(rect.rotation!)}`);
    } else if (op === 'scaleOf') {
      rect.scaleOf(mid, target / (rect.scaleX as number));
      show(`rect.scaleOf(mid, ${target.toFixed(2)} / rect.scale)\nscale is ${(rect.scaleX as number).toFixed(2)}`);
    } else {
      rect.skewOf(mid, target - rect.skewX!);
      show(`rect.skewOf(mid, ${target} - rect.skewX)\nskewX is ${Math.round(rect.skewX!)}`);
    }
  };
  if (stage.bar) {
    for (const op of ['rotateOf', 'scaleOf', 'skewOf'] as const) {
      const [lo, hi, step] = RANGE[op];
      slider(stage.bar, `${op} to`, lo, hi, step, op === 'scaleOf' ? 1 : 0, (v) => go(op, v));
    }
  } else {
    let last = -1;
    stage.loop((_dt, t) => {
      const phase = Math.floor(t / 3) % 3;
      const op = (['rotateOf', 'scaleOf', 'skewOf'] as const)[phase]!;
      if (phase !== last) {
        last = phase;
        rect.set({ x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 26, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0 });
      }
      const [lo, hi, step] = RANGE[op];
      const u = 0.5 - 0.5 * Math.cos(((t % 3) / 3) * Math.PI * 2);
      go(op, Math.round((lo + (hi - lo) * u) / step) * step);
    });
  }

  return stage.dispose;
};

export default mount;
