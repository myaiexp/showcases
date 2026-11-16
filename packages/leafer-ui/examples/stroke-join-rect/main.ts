// Appearance: strokeJoin miter, bevel and round on a square Rect
import { Leafer, Rect, type IStrokeJoin } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Switch strokeJoin." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.7;
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, fill: '#FEB027', stroke: '#1d2b53', strokeWidth: 22, strokeAlign: 'outside' });
  leafer.add(rect);
  pick(stage, 'strokeJoin', ['miter', 'bevel', 'round'] as IStrokeJoin[], (v) => (rect.strokeJoin = v), 1600);

  return stage.dispose;
};

export default mount;
