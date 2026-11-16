// Layout: offsetX and offsetY shift an element without touching x and y
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid, drive, toggle } from '../../shared/shapes.ts';
import { box, outline } from '../../shared/layout-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed outline is where x and y put the rect. offsetX and offsetY move it away; around adds its own shift.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const at = mid(stage, S, S);
  const home = outline(leafer, '#aaa');
  home.show({ ...at, y: at.y - 14, width: S, height: S });
  const rect = new Rect({ x: at.x, y: at.y - 14, width: S, height: S, fill: '#32cd79', cornerRadius: 8, opacity: 0.9 });
  leafer.add(rect);
  const show = label(stage, '', true);
  const refresh = (): void => show(`x ${rect.x}  y ${rect.y}  offsetX ${Math.round(rect.offsetX!)}  offsetY ${Math.round(rect.offsetY!)}\nworldBoxBounds ${box(rect.worldBoxBounds)}`);
  const range: [number, number, number] = [-60, 60, 1];
  if (stage.bar) {
    drive(stage, 'offsetX', range, 0, (v) => ((rect.offsetX = v), refresh()));
    drive(stage, 'offsetY', range, 0, (v) => ((rect.offsetY = v), refresh()));
    toggle(stage, 'around: center', false, (v) => ((rect.around = v ? 'center' : undefined), refresh()));
  } else {
    stage.loop((_dt, t) => {
      rect.set({ offsetX: Math.sin(t * 1.4) * 40, offsetY: Math.cos(t * 1.1) * 25 });
      refresh();
    });
    stage.every(2500, () => (rect.around = rect.around ? undefined : 'center'));
  }

  return stage.dispose;
};

export default mount;
