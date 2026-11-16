// Appearance: radial gradient stretch to an ellipse
import { Leafer, Rect, type IAlign } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide stretch, and change where the gradient points." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  let stretch = 0.5;
  let to: IAlign = 'bottom-right';
  const paint = (): void => {
    rect.fill = {
      type: 'radial',
      to,
      stretch,
      stops: [{ offset: 0, color: '#FF4A2C' }, { offset: 1, color: '#FEB027' }],
    };
  };
  drive(stage, 'stretch', [0.1, 1, 0.01], 0.5, (v) => ((stretch = v), paint()), 5);
  pick(stage, 'to', ['bottom-right', 'bottom', 'right', 'top-left'] as IAlign[], (v) => ((to = v), paint()), 1500, to);

  return stage.dispose;
};

export default mount;
