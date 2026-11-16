// Appearance: radial gradient with colour-object stops and opacity
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the paint opacity." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage);
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  drive(stage, 'opacity', [0, 1, 0.05], 0.5, (v) => {
    rect.fill = {
      type: 'radial',
      opacity: v,
      stops: [
        { offset: 0, color: { r: 255, g: 75, b: 75 } },
        { offset: 1, color: { r: 254, g: 176, b: 39 } },
      ],
    };
  }, 5);

  return stage.dispose;
};

export default mount;
