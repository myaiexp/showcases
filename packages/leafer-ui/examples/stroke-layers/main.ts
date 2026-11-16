// Appearance: a multi-layer border from several stroke paints
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the base strokeWidth (the white layer)." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  rect.set({
    fill: '#FFE04B',
    stroke: [
      { type: 'solid', color: 'blue', style: { strokeWidth: 20 } },
      { type: 'solid', color: 'black', style: { strokeWidth: 10 } },
      { type: 'solid', color: 'white' },
    ],
  });
  drive(stage, 'strokeWidth', [1, 8, 1], 3, (v) => (rect.strokeWidth = v), 5);

  return stage.dispose;
};

export default mount;
