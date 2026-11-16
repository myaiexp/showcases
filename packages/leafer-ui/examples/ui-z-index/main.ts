// UI: zIndex reorders siblings
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the green square\'s zIndex.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.5;
  const colors = ['#32cd79', '#FEB027', '#FF4B4B', '#4B8BFF'];
  const rects = colors.map((c, i) => new Rect({ x: stage.width / 2 - S * 1.2 + i * S * 0.5, y: stage.height / 2 - S / 2 - 8 + (i % 2) * 14, width: S, height: S, fill: c, stroke: 'white', strokeWidth: 3, cornerRadius: 8 }));
  leafer.add(rects);
  const note = caption(stage, leafer);
  drive(stage, 'green zIndex', [0, 5, 1], 0, (v) => {
    rects[0]!.zIndex = v;
    note.text = `green zIndex: ${v}`;
  }, 5);

  return stage.dispose;
};

export default mount;
