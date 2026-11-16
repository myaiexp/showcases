// Stroke sides: strokeAlign with four different widths
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/stroke-sides';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed grey line is the rect itself (width and height).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const at = mid(stage, S);
  leafer.add(new Rect({ ...at, width: S, height: S, stroke: '#999', strokeWidth: 1, dashPattern: [4, 4], hittable: false }));
  const rect = new Rect({ ...at, width: S, height: S, fill: '#32cd79', stroke: '#1d4e89', strokeWidth: [6, 14, 24, 34] });
  leafer.add(rect);

  pick(stage, 'strokeAlign', ['inside', 'center', 'outside'] as const, (v) => (rect.strokeAlign = v), 1800);

  return stage.dispose;
};

export default mount;
