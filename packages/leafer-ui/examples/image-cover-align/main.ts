// Appearance: image cover mode with align
import { Leafer, Rect, type IAlign } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick an align." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ x: (stage.width - S * 1.6) / 2, y: (stage.height - S * 0.6) / 2 - 6, width: S * 1.6, height: S * 0.6 });
  leafer.add(rect);
  const aligns: IAlign[] = ['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'center'];
  pick(stage, 'align', aligns, (a) => {
    rect.fill = { type: 'image', url: photo(), mode: 'cover', align: a };
  }, 1300, 'center');

  return stage.dispose;
};

export default mount;
