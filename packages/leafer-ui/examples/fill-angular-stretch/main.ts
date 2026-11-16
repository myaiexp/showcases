// Appearance: angular gradient stretch
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide stretch." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  drive(stage, 'stretch', [0.05, 1, 0.01], 0.1, (v) => {
    rect.fill = {
      type: 'angular',
      stretch: v,
      to: 'bottom-right',
      stops: [
        { offset: 0, color: '#FF4B4B' },
        { offset: 0.3, color: '#FEB027' },
        { offset: 0.7, color: '#79CB4D' },
        { offset: 1, color: '#FF4B4B' },
      ],
    };
  }, 5);

  return stage.dispose;
};

export default mount;
