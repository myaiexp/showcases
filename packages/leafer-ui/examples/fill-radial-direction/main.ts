// Appearance: radial gradient from and to as percent points
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { knobs } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move from (the centre) and to (the edge)." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const p = { fx: 0.2, fy: 0.2, tx: 0.8, ty: 0.8 };
  const paint = (): void => {
    rect.fill = {
      type: 'radial',
      from: { type: 'percent', x: p.fx, y: p.fy },
      to: { type: 'percent', x: p.tx, y: p.ty },
      stops: ['#FF4B4B', '#FEB027'],
    };
  };
  const set = (key: keyof typeof p) => (v: number): void => ((p[key] = v), paint());
  knobs(stage, [
    { label: 'from.x', range: [0, 1, 0.01], value: 0.2, set: set('fx'), swing: 0.15 },
    { label: 'from.y', range: [0, 1, 0.01], value: 0.2, set: set('fy'), swing: 0.15 },
    { label: 'to.x', range: [0, 1, 0.01], value: 0.8, set: set('tx'), swing: 0.15 },
    { label: 'to.y', range: [0, 1, 0.01], value: 0.8, set: set('ty'), swing: 0.15 },
  ]);

  return stage.dispose;
};

export default mount;
