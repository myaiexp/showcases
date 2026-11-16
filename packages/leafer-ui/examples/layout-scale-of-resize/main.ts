// Layout: the resize argument of scaleOf
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/resize'; // the resize plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'scaleOf(origin, 2, 2, resize): with resize the 2x lands in width and height and scaleX stays 1.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.45;
  const rect = new Rect({ x: 20, y: 20, width: S, height: S, fill: '#32cd79', stroke: '#222', strokeWidth: 5 });
  leafer.add(rect);
  const show = label(stage, '', true);
  let resize = true;
  const redo = (): void => {
    rect.set({ width: S, height: S, scale: 1, x: 20, y: 20 });
    rect.scaleOf({ x: 0, y: 0 }, 2, 2, resize);
    show(`rect.scaleOf({ x: 0, y: 0 }, 2, 2, ${resize})\nscaleX ${rect.scaleX}  scaleY ${rect.scaleY}  width ${Math.round(rect.width!)}  height ${Math.round(rect.height!)}`);
  };
  toggle(stage, 'resize', resize, (v) => ((resize = v), redo()), 1800);

  return stage.dispose;
};

export default mount;
