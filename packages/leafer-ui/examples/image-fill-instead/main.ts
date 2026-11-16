// Rect: an image fill with mode stretch
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width and height: the stretch mode distorts the picture.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S * 1.3, S), width: S * 1.3, height: S, fill: { type: 'image', url: photo(), mode: 'stretch' }, draggable: true });
  leafer.add(rect);
  drive(stage, 'width', [60, 400, 2], S * 1.3, (v) => (rect.width = v), 5);
  drive(stage, 'height', [60, 300, 2], S, (v) => (rect.height = v), 7);

  return stage.dispose;
};

export default mount;
