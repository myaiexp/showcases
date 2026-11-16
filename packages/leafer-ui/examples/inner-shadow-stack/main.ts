// Appearance: two inner shadows making a pressed-in button
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the offset." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.3, fill: '#d9d4c7' });
  leafer.add(rect);
  drive(stage, 'offset', [0, 20, 1], 8, (d) => {
    rect.innerShadow = [
      { x: d, y: d, blur: 14, color: '#00000066' },
      { x: -d, y: -d, blur: 14, color: '#ffffffcc' },
    ];
  }, 5);

  return stage.dispose;
};

export default mount;
