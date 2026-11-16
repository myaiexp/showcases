// Rect: stroke follows the corners
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick strokeAlign and slide cornerRadius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, stroke: '#32cd79', strokeWidth: 14, cornerRadius: 30, fill: '#ffffff80' });
  leafer.add(rect);
  pick(stage, 'strokeAlign', ['inside', 'center', 'outside'] as const, (v) => (rect.strokeAlign = v), 1200);
  drive(stage, 'cornerRadius', [0, 100, 1], 30, (v) => (rect.cornerRadius = v), 5);

  return stage.dispose;
};

export default mount;
