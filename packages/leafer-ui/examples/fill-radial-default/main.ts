// Appearance: radial gradient with the default from and to
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the first stop's offset." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  drive(stage, 'stop offset', [0, 0.9, 0.01], 0.2, (o) => {
    rect.fill = {
      type: 'radial', // centre to bottom centre
      stops: [{ offset: o, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }],
    };
  });

  return stage.dispose;
};

export default mount;
