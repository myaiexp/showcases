// Stroke sides: strokeWidth on a Box
import { Leafer, Ellipse, Box } from 'leafer-ui';
import '@leafer-in/stroke-sides';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch overflow to see the child cut at the box edge.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const box = new Box({ ...mid(stage, S * 1.3, S), width: S * 1.3, height: S, fill: '#e8f5e9', stroke: '#2e7d32', strokeWidth: [16, 2, 16, 2] });
  box.add(new Ellipse({ x: S * 0.7, y: S * 0.35, width: S * 0.6, height: S * 0.6, fill: '#FEB027' }));
  leafer.add(box);

  pick(stage, 'overflow', ['show', 'hide'] as const, (v) => (box.overflow = v), 1800);

  return stage.dispose;
};

export default mount;
