// Transformations: setXY (canvas plane) and setRelativeXY (parent plane) put any origin point on a target
import { Canvas, Circle, Group, Point, Rect, type TOriginX, type TOriginY } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const OX = ['left', 'center', 'right'] as const;
const OY = ['top', 'center', 'bottom'] as const;
const METHODS = ['setXY', 'setRelativeXY'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'Click the canvas to choose a target (green). The rectangle moves so its chosen origin point lands there. In a rotated group the two methods disagree: only setXY speaks the canvas plane.' });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = status(stage);

  const rect = new Rect({ left: 0, top: 0, width: 90, height: 50, fill: '#d99a1ccc', stroke: '#8a5f0e', strokeWidth: 1.5 });
  const group = new Group([rect]);
  group.set({ left: 170, top: 120, angle: 25, selectable: false, evented: false });
  const target = new Circle({ radius: 6, fill: '#2e9e5b', stroke: '#fff', strokeWidth: 2, selectable: false, evented: false });
  const landed = new Circle({ radius: 4, fill: '#e94b3c', selectable: false, evented: false });
  canvas.add(group, target, landed);

  let method: (typeof METHODS)[number] = 'setXY';
  let ox: TOriginX = 'left';
  let oy: TOriginY = 'top';
  const place = (to: Point): void => {
    // the same two arguments for both: a point and the origin of the rectangle that goes there
    if (method === 'setXY') rect.setXY(to, ox, oy);
    else rect.setRelativeXY(to, ox, oy);
    group.set('dirty', true);
    group.setCoords();
    target.setPositionByOrigin(to, 'center', 'center');
    const onCanvas = rect.getPositionByOrigin(ox, oy).transform(group.calcTransformMatrix()); // where that corner really is now
    landed.setPositionByOrigin(onCanvas, 'center', 'center');
    say(`${method}(p, '${ox}', '${oy}')${stage.preview ? '' : '   '} ${onCanvas.distanceFrom(to) < 0.5 ? 'hits' : 'misses'}${stage.preview ? '' : ' the target'}`);
    canvas.requestRenderAll();
  };
  let last = new Point(150, 100);
  place(last);
  canvas.on('mouse:down', (e) => place((last = e.scenePoint)));

  if (stage.bar) {
    select(stage.bar, 'method', METHODS, (v) => { method = v; place(last); });
    select(stage.bar, 'originX', OX, (v) => { ox = v; place(last); }, ox);
    select(stage.bar, 'originY', OY, (v) => { oy = v; place(last); }, oy);
  } else {
    const spots = [new Point(110, 90), new Point(230, 80), new Point(220, 170), new Point(100, 165)];
    let i = 0;
    stage.every(1000, () => {
      i++;
      if (i % 4 === 0) { method = METHODS[(i / 4) % 2]!; ox = OX[(i / 2) % 3 | 0]!; oy = OY[(i / 3) % 3 | 0]!; }
      place((last = spots[i % spots.length]!));
    });
  }
  return stage.dispose;
};

export default mount;
