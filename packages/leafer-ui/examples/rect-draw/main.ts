// Rect: width, height and fill
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the sliders to change width and height; drag the rectangle to move it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S, S * 0.7), width: S, height: S * 0.7, fill: '#32cd79', draggable: true });
  leafer.add(rect);
  drive(stage, 'width', [40, 360, 4], S, (v) => (rect.width = v), 4);
  drive(stage, 'height', [30, 280, 4], S * 0.7, (v) => (rect.height = v), 5);

  return stage.dispose;
};

export default mount;
