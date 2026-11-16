// Appearance: stroke painted with a radial gradient
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide strokeWidth." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  rect.set({
    fill: '#FEB02730',
    stroke: { type: 'radial', stops: [{ offset: 0, color: '#FF4A2C' }, { offset: 1, color: '#FEB027' }] },
  });
  drive(stage, 'strokeWidth', [2, 40, 1], 10, (v) => (rect.strokeWidth = v), 5);

  return stage.dispose;
};

export default mount;
