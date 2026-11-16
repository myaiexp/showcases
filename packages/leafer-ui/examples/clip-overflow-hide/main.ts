// Appearance: Box overflow hide clips children, show lets them out
import { Leafer, Box, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';
import { dragToAndFro } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the circle out of the red box, and switch overflow.", paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));
  const S = size(stage);
  const { x, y } = mid(stage, S);
  const box = new Box({ x, y, width: S, height: S, fill: '#FF4B4B', overflow: 'hide' });
  const circle = new Ellipse({ x: S * 0.6, y: S * 0.6, width: S / 2, height: S / 2, fill: '#FEB027', draggable: true });
  leafer.add(box);
  box.add(circle);
  toggle(stage, "overflow 'hide'", true, (hide) => (box.overflow = hide ? 'hide' : 'show'), 2600);
  if (stage.preview) dragToAndFro(stage, leafer, { x: x + S * 0.85, y: y + S * 0.85 }, { x: x + S * 1.15, y: y + S * 0.95 });

  return stage.dispose;
};

export default mount;
