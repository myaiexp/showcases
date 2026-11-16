// Appearance: several paints in one fill, gradient plus image
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the image layer's opacity." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  drive(stage, 'image opacity', [0, 1, 0.05], 0.2, (v) => {
    rect.fill = [
      { type: 'linear', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] },
      { type: 'image', url: photo(), mode: 'cover', opacity: v },
    ];
  }, 5);

  return stage.dispose;
};

export default mount;
