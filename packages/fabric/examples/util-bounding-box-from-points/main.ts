// util.makeBoundingBoxFromPoints: the box around any list of points
import { Canvas, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { BLUE, GOLD, at, drift, handle, overlay, poly, put } from '../../shared/geometry.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag any dot. makeBoundingBoxFromPoints takes plain {x, y} points and returns { left, top, width, height }: the dashed box.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = briefStatus(stage);
  const start = [[90, 70], [200, 50], [250, 120], [180, 175], [100, 150], [150, 105]];
  const dots = start.map(([x, y]) => handle(x!, y!, BLUE));
  canvas.add(...dots);

  overlay(canvas, (c) => {
    const pts = dots.map(at);
    poly(c, pts, '#9bb7e6', 'rgba(59,125,216,0.1)', 1.5);
    const box = util.makeBoundingBoxFromPoints(pts);
    c.save();
    c.strokeStyle = GOLD;
    c.lineWidth = 2;
    c.setLineDash([6, 4]);
    c.strokeRect(box.left, box.top, box.width, box.height);
    c.restore();
    say(`left ${Math.round(box.left)}  top ${Math.round(box.top)}\nwidth ${Math.round(box.width)}  height ${Math.round(box.height)}`);
  });

  const redraw = (): void => {
    for (const d of dots) d.setCoords();
    canvas.requestRenderAll();
  };
  canvas.on('object:moving', redraw);
  if (stage.preview)
    stage.loop((_dt, t) => {
      dots.forEach((d, i) => put(d, drift(t, start[i]![0]!, start[i]![1]!, 22, 18, 0.8 + i * 0.13, i)));
      canvas.requestRenderAll();
    });
  return stage.dispose;
};

export default mount;
