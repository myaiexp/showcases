// sendPointToPlane moves a point between viewport, canvas and group planes
import { Canvas, Circle, Group, Point, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { matrixText } from '../../shared/matrix-view.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'Drag the red dot. Its position is read in three planes: the canvas, the viewport (zoomed and panned pixels) and the rotated group\'s own plane.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const plate = new Rect({ left: 0, top: 0, width: 150, height: 90, fill: '#3b7dd844', stroke: '#3b7dd8', strokeWidth: 1.5 });
  const group = new Group([plate, new Circle({ left: 0, top: 0, radius: 4, fill: '#3b7dd8' })]);
  group.set({ left: 190, top: 120, angle: 22 });
  const dot = new Circle({ left: 120, top: 70, radius: 9, fill: '#e94b3c', stroke: '#fff', strokeWidth: 2, hasControls: false, hasBorders: false });
  group.set({ selectable: false, evented: false });
  canvas.add(group, dot);
  canvas.setActiveObject(dot);

  const base = canvas.getZoom();
  const show = (): void => {
    const p = dot.getCenterPoint(); // a point of the canvas plane
    const vpt = canvas.viewportTransform;
    // calcPlaneChangeMatrix(from, to) = invert(to) x from; a plane's matrix maps its points to the viewport
    const inViewport = util.sendPointToPlane(p, vpt, undefined);
    const inGroup = util.sendPointToPlane(p, undefined, group.calcTransformMatrix());
    const back = util.sendPointToPlane(inGroup, group.calcTransformMatrix(), undefined);
    const f = (q: Point): string => `(${q.x.toFixed(0)}, ${q.y.toFixed(0)})`;
    say(`canvas   ${f(p)}\nviewport ${f(inViewport)}\ngroup    ${f(inGroup)}${stage.preview ? '' : `\ngroup -> canvas ${f(back)}\ngroup plane matrix\n${matrixText(group.calcTransformMatrix())}`}`);
  };
  canvas.on('after:render', show);
  show();

  const zoom = (k: number): void => {
    canvas.zoomToPoint(new Point(stage.width / 2, stage.height / 2), base * k);
    canvas.requestRenderAll();
  };
  if (stage.bar) slider(stage.bar, 'zoom', 0.6, 1.8, 0.05, 1, zoom, (v) => `${v.toFixed(2)}x`);
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      dot.set({ left: 120, top: 70 });
      dot.setCoords();
      await ghost.drag(dot.getCenterPoint(), new Point(210, 150), 900);
      await ghost.drag(dot.getCenterPoint(), new Point(250, 70), 800);
      await stage.wait(500);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
