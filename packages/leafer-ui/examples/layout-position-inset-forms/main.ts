// Layout: position with only some of the four edges
import { Box, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/position'; // the position plugin
import type { IInset } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const FORMS: Record<string, IInset> = {
  '{ left: 20, right: 20 }': { left: 20, right: 20 },
  '{ top: 20, bottom: 20 }': { top: 20, bottom: 20 },
  '{ right: 20 }': { right: 20 },
  '{ bottom: 20 }': { bottom: 20 },
  '{ top: 20, left: 20 }': { top: 20, left: 20 },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two opposite edges set a size; a single edge only moves the rect.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const B = size(stage) * 1.3;
  const parent = new Box({ ...mid(stage, B, B * 0.7), y: 10, width: B, height: B * 0.7, fill: '#FF4A2C' });
  leafer.add(parent);
  const show = label(stage, '', true);
  let rect: Rect | undefined;
  pick(stage, 'position', Object.keys(FORMS), (name) => {
    rect?.destroy();
    const r = (rect = new Rect({ width: B * 0.2, height: B * 0.2, fill: '#32cd79' })); // a fresh 20% square each time
    parent.add(r);
    r.position = FORMS[name]!;
    stage.after(80, () => show(`rect.position = ${name}\nx ${Math.round(r.x!)}  y ${Math.round(r.y!)}  width ${Math.round(r.width!)}  height ${Math.round(r.height!)}`));
  }, 1800);

  return stage.dispose;
};

export default mount;
