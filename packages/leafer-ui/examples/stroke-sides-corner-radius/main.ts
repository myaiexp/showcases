// Stroke sides: strokeWidth on a rounded Rect
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/stroke-sides';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise cornerRadius: the thick strokes follow the curve.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S * 1.3, S), width: S * 1.3, height: S, fill: '#ffe28a', stroke: '#c0392b', strokeWidth: [4, 4, 4, 20] });
  leafer.add(rect);

  drive(stage, 'cornerRadius', [0, 60, 2], 20, (v) => (rect.cornerRadius = v), 5);

  return stage.dispose;
};

export default mount;
