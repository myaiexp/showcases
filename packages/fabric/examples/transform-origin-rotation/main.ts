// Transformations: the origin point is the pivot of rotation, so originX and originY change how it turns
import { Canvas, Circle, Point, Rect, type TOriginX, type TOriginY } from 'fabric';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const OX = ['left', 'center', 'right'] as const;
const OY = ['top', 'center', 'bottom'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The black pin stays put. The rectangle turns around whichever of its own points sits on the pin: that point is its origin.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const pin = new Point(170, 120);
  const outline = new Rect({ left: pin.x, top: pin.y, width: 120, height: 70, fill: '', stroke: '#999', strokeDashArray: [4, 4], selectable: false, evented: false });
  const rect = new Rect({ width: 120, height: 70, fill: '#3b7dd8aa', selectable: false, evented: false });
  const mark = new Circle({ left: pin.x, top: pin.y, radius: 5, fill: '#2b2a33', selectable: false, evented: false });
  canvas.add(outline, rect, mark);

  let ox: TOriginX = 'left';
  let oy: TOriginY = 'top';
  let angle = 30;
  const apply = (): void => {
    rect.set({ originX: ox, originY: oy, angle });
    rect.setPositionByOrigin(pin, ox, oy); // left/top mean "the origin point's position": keep it on the pin
    rect.setCoords();
    say(stage.preview ? `${ox} ${oy}, ${angle.toFixed(0)}°` : `originX '${ox}', originY '${oy}', angle ${angle.toFixed(0)}°`);
    canvas.requestRenderAll();
  };
  apply();

  if (stage.bar) {
    select(stage.bar, 'originX', OX, (v) => { ox = v; apply(); }, ox);
    select(stage.bar, 'originY', OY, (v) => { oy = v; apply(); }, oy);
    slider(stage.bar, 'angle', -180, 180, 1, angle, (v) => { angle = v; apply(); }, (v) => `${v}°`);
  } else {
    const spots: [TOriginX, TOriginY][] = [['left', 'top'], ['center', 'center'], ['right', 'bottom'], ['right', 'top']];
    let k = 0;
    stage.every(1800, () => { [ox, oy] = spots[++k % spots.length]!; });
    stage.loop((_dt, t) => { angle = Math.sin(t * 1.5) * 50; apply(); });
  }
  return stage.dispose;
};

export default mount;
