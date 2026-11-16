// Appearance: shadow with box true versus the default drop shadow
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Toggle box: the shadow stops showing through the translucent green." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.3, fill: 'rgba(50,205,121,0.7)' });
  leafer.add(rect);
  toggle(stage, 'box', true, (box) => {
    rect.shadow = { x: 10, y: -10, blur: 20, color: '#FF0000AA', box };
  }, 1800);

  return stage.dispose;
};

export default mount;
