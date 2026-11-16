// Layout: resizeWidth and resizeHeight on a Group
import { Ellipse, Group, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/resize'; // the resize plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A Group has no width: resizeWidth() and resizeHeight() change its children\'s sizes instead of using scale.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.6;
  const group = new Group({
    x: 20,
    y: 14,
    children: [
      new Rect({ width: S, height: S, fill: '#32cd79', draggable: true }),
      new Ellipse({ x: S / 2, y: S / 2, width: S, height: S, innerRadius: 0.5, fill: '#FEB027' }),
    ],
  });
  leafer.add(group);
  const show = label(stage, '', true);
  const w0 = S * 1.5;
  drive(stage, 'resizeWidth', [w0 * 0.6, w0 * 1.6, 1], w0, (v) => {
    group.resizeWidth(v);
    show(`group.resizeWidth(${Math.round(v)})   scaleX ${group.scaleX}\nboxBounds.width ${Math.round(group.boxBounds.width)}`);
  }, 4);
  if (stage.bar) drive(stage, 'resizeHeight', [w0 * 0.6, w0 * 1.6, 1], w0, (v) => group.resizeHeight(v));

  return stage.dispose;
};

export default mount;
