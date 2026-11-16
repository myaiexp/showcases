// Layout: lockRatio keeps the proportions while resizing
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/resize'; // the resize plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With lockRatio the height follows resizeWidth().' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ x: 20, y: 20, width: S, height: S * 0.6, fill: '#32cd79', cornerRadius: 6 });
  leafer.add(rect);
  const show = label(stage, '', true);
  let w = S;
  const redo = (): void => {
    rect.set({ width: S, height: S * 0.6 });
    rect.resizeWidth(w);
    show(`lockRatio ${rect.lockRatio}\nresizeWidth(${Math.round(w)})  ->  ${Math.round(rect.width!)} x ${Math.round(rect.height!)}`);
  };
  toggle(stage, 'lockRatio', true, (v) => ((rect.lockRatio = v), redo()), 2400);
  drive(stage, 'width', [S * 0.5, S * 1.5, 1], w, (v) => ((w = v), redo()), 4.8);

  return stage.dispose;
};

export default mount;
