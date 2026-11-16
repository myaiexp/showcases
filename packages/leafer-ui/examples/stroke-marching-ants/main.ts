// Appearance: sub-stroke style for a marching-ants selection outline
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The black dashes live in the second paint's style." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  rect.set({ fill: '#7a9cc6', strokeWidth: 2, cornerRadius: 0 });
  let offset = 0;
  let dash = 4;
  const apply = (): void => {
    rect.stroke = [
      { type: 'solid', color: 'white' },
      { type: 'solid', color: 'black', style: { dashPattern: [dash, dash], dashOffset: offset } },
    ];
  };
  stage.loop((_dt, t) => ((offset = -t * 12), apply()));
  drive(stage, 'dash', [2, 14, 1], 4, (v) => (dash = v), 6);

  return stage.dispose;
};

export default mount;
