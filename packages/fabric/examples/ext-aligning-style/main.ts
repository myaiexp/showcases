// AligningGuidelines options: margin, width, colour, dashes, markers
import { Canvas, Circle, Rect, Triangle, type Point } from 'fabric';
import { AligningGuidelines } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'The options are plain fields on the instance, so they can change while you drag: margin is how close a shape must be before it snaps, width and color style the line, lineDash and xSize the ends. drawX is replaced here with dots, drawLine in "curved" with a Bézier.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(
    new Rect({ left: 70, top: 60, width: 70, height: 44, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 2 }),
    new Rect({ left: 230, top: 160, width: 90, height: 50, fill: '#d6f0e0', stroke: '#2e9e5b', strokeWidth: 2 }),
    new Circle({ left: 250, top: 60, radius: 24, fill: '#ffd9d4', stroke: '#e94b3c', strokeWidth: 2 }),
    new Triangle({ left: 90, top: 165, width: 56, height: 50, fill: '#ffe9a8', stroke: '#d99a1c', strokeWidth: 2 }),
  );
  const c = canvas.getObjects()[2]!;

  // The two drawing hooks from the README, as options. `this` is the AligningGuidelines instance.
  const guides = new AligningGuidelines(canvas, {
    margin: 10,
    width: 2,
    color: '#7b3fe4',
    xSize: 4,
  });
  const base = { drawLine: guides.drawLine, drawX: guides.drawX };
  const dots = function (this: AligningGuidelines, point: Point, dir: number): void {
    const g = this.canvas.getTopContext();
    const size = (this.xSize + 2) / this.canvas.getZoom();
    g.save();
    g.translate(point.x, point.y);
    g.beginPath();
    g.arc(0, 0, size, 0, Math.PI * 2);
    g.fillStyle = this.color;
    g.strokeStyle = this.color;
    if (dir === -1) g.fill();
    else g.stroke();
    g.restore();
  };
  const curved = function (this: AligningGuidelines, from: Point, to: Point): void {
    const g = this.canvas.getTopContext();
    g.save();
    g.transform(...this.canvas.viewportTransform);
    g.lineWidth = this.width / this.canvas.getZoom();
    g.strokeStyle = this.color;
    if (this.lineDash) g.setLineDash(this.lineDash);
    g.beginPath();
    g.moveTo(from.x, from.y);
    const mid = (from.x + to.x) / 2;
    g.bezierCurveTo(mid + 20, from.y - 30, mid - 20, to.y + 30, to.x, to.y);
    g.stroke();
    g.restore();
    this.drawX(from, -1);
    this.drawX(to, 1);
  };
  stage.onDispose(() => guides.dispose());

  type Look = 'default markers' | 'dot markers' | 'curved lines';
  const looks: Record<Look, () => void> = {
    'default markers': () => Object.assign(guides, base),
    'dot markers': () => Object.assign(guides, base, { drawX: dots }),
    'curved lines': () => Object.assign(guides, base, { drawX: dots, drawLine: curved }),
  };

  if (stage.bar) {
    slider(stage.bar, 'margin', 0, 30, 1, guides.margin, (v) => (guides.margin = v));
    slider(stage.bar, 'width', 1, 6, 1, guides.width, (v) => (guides.width = v));
    slider(stage.bar, 'xSize', 1, 12, 1, guides.xSize, (v) => (guides.xSize = v));
    select(stage.bar, 'color', ['#7b3fe4', '#e94b3c', '#2e9e5b', '#222'] as const, (v) => (guides.color = v));
    select(stage.bar, 'lineDash', ['solid', 'dashed 2,2', 'dashed 8,4'] as const, (v) => {
      guides.lineDash = v === 'solid' ? undefined : v === 'dashed 2,2' ? [2, 2] : [8, 4];
    });
    select(stage.bar, 'drawing', Object.keys(looks) as Look[], (v) => looks[v]());
  } else {
    const names = Object.keys(looks) as Look[];
    const g = stage.ghost(canvas);
    let i = 0;
    stage.repeat(async () => {
      looks[names[i++ % names.length]!]();
      guides.lineDash = i % 2 ? undefined : [4, 3];
      c.set({ left: 250, top: 60 });
      c.setCoords();
      canvas.requestRenderAll();
      await g.drag({ x: 250, y: 60 }, { x: 76, y: 118 }, 1300);
      await stage.wait(700);
      await g.dragTo({ x: 150, y: 164 }, 1000);
      await stage.wait(700);
    }, 300);
  }
  return stage.dispose;
};

export default mount;
