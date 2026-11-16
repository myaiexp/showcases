// Appearance: linear gradient control points as percent or pixels
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { checkbox } from '../../shared/controls.ts';
import { knobs } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move from and to; tick pixels to give the points in px instead of percent." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const p = { fx: 0.5, fy: 0, tx: 0.5, ty: 1 };
  let px = false;
  const point = (x: number, y: number) => (px ? { x: x * S, y: y * S } : { type: 'percent' as const, x, y });
  const paint = (): void => {
    rect.fill = {
      type: 'linear',
      from: point(p.fx, p.fy),
      to: point(p.tx, p.ty),
      stops: ['#FF4B4B', '#FEB027'],
    };
  };
  paint();
  const set = (key: keyof typeof p) => (v: number): void => ((p[key] = v), paint());
  knobs(stage, [
    { label: 'from.x', range: [0, 1, 0.01], value: 0.5, set: set('fx'), swing: 0.45 },
    { label: 'from.y', range: [0, 1, 0.01], value: 0.1, set: set('fy'), swing: 0.1 },
    { label: 'to.x', range: [0, 1, 0.01], value: 0.5, set: set('tx'), swing: 0.45 },
    { label: 'to.y', range: [0, 1, 0.01], value: 0.9, set: set('ty'), swing: 0.1 },
  ]);
  if (stage.bar) checkbox(stage.bar, 'pixels', false, (v) => ((px = v), paint()));

  return stage.dispose;
};

export default mount;
