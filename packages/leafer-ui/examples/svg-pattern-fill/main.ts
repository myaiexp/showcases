// Rect: an SVG string as a pattern fill
import { Leafer, Platform, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { LEAF_SVG } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the width: the badge stretches, still sharp.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, fill: { type: 'image', url: Platform.toURL(LEAF_SVG, 'svg'), mode: 'stretch' }, draggable: true });
  leafer.add(rect);
  drive(stage, 'width', [40, 380, 2], S, (v) => rect.set({ width: v, ...mid(stage, v, rect.height!) }), 5);

  return stage.dispose;
};

export default mount;
