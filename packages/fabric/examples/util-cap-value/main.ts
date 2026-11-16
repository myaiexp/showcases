// util.capValue clamps a dragged dot; util.getRandomInt scatters dots
import { Canvas, Circle, Point, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { button, slider } from '../../shared/controls.ts';
import { BLUE, GOLD, drift, handle, put } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag the blue dot anywhere: its left and top go through capValue(min, value, max), so it stays in the box. Scatter drops gold dots at getRandomInt(min, max) coordinates (both ends included).',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const box = { x0: 70, x1: 250, y0: 50, y1: 170 };
  const frame = new Rect({ left: 160, top: 110, width: 180, height: 120, fill: 'rgba(59,125,216,0.08)', stroke: '#3b7dd8', strokeWidth: 1, strokeDashArray: [5, 4], selectable: false, evented: false });
  const dot = handle(160, 110, BLUE);
  canvas.add(frame, dot);

  const fit = (): void => {
    frame.set({ left: (box.x0 + box.x1) / 2, top: (box.y0 + box.y1) / 2, width: box.x1 - box.x0, height: box.y1 - box.y0 });
    frame.setCoords();
    put(dot, new Point(util.capValue(box.x0, dot.left, box.x1), util.capValue(box.y0, dot.top, box.y1)));
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', ({ target }) => {
    const raw = new Point(target.left, target.top);
    put(target, new Point(util.capValue(box.x0, raw.x, box.x1), util.capValue(box.y0, raw.y, box.y1)));
    say(`raw (${Math.round(raw.x)}, ${Math.round(raw.y)})\ncapped (${Math.round(target.left)}, ${Math.round(target.top)})`);
  });

  const scatter = (): void => {
    const markers: Circle[] = [];
    for (let i = 0; i < 14; i++) {
      const x = util.getRandomInt(box.x0, box.x1);
      const y = util.getRandomInt(box.y0, box.y1);
      markers.push(new Circle({ left: x, top: y, radius: 4, fill: GOLD, selectable: false, evented: false }));
    }
    canvas.add(...markers);
    stage.after(1100, () => {
      canvas.remove(...markers);
      canvas.requestRenderAll();
    });
    say(`getRandomInt(${box.x0}, ${box.x1}) → ${markers[0]!.left}`);
  };

  if (stage.bar) {
    slider(stage.bar, 'box width', 40, 260, 10, 180, (v) => ((box.x0 = 160 - v / 2), (box.x1 = 160 + v / 2), fit()));
    slider(stage.bar, 'box height', 40, 180, 10, 120, (v) => ((box.y0 = 110 - v / 2), (box.y1 = 110 + v / 2), fit()));
    button(stage.bar, 'scatter', scatter);
  } else {
    stage.every(1500, scatter);
    stage.loop((_dt, t) => {
      // the raw position strays far outside, the clamp keeps it inside
      const raw = drift(t, 160, 110, 150, 100, 0.9);
      put(dot, new Point(util.capValue(box.x0, raw.x, box.x1), util.capValue(box.y0, raw.y, box.y1)));
      canvas.requestRenderAll();
    });
  }
  fit();
  return stage.dispose;
};

export default mount;
