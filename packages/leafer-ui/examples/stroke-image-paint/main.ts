// Appearance: stroke painted with an image
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide strokeWidth." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  rect.stroke = { type: 'image', url: photo() /* mode: 'cover' is the default */ };
  drive(stage, 'strokeWidth', [2, 60, 1], 24, (v) => (rect.strokeWidth = v), 5);

  return stage.dispose;
};

export default mount;
