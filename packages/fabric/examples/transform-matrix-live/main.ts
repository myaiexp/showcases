// Transformations: calcOwnMatrix vs calcTransformMatrix of an object inside a group, live as things move
import { Canvas, Circle, Group, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { matrixText } from '../../shared/matrix-view.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'Drag, scale or rotate the group. The red rectangle\'s own matrix never changes: only the matrix that includes its group does.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 130, top: 100, width: 70, height: 44, fill: '#e94b3c' });
  const dot = new Circle({ left: 215, top: 145, radius: 24, fill: '#3b7dd8' });
  const group = new Group([rect, dot]);
  group.set({ left: 180, top: 120, angle: 15 });
  canvas.add(group);
  canvas.setActiveObject(group);

  const show = (): void => {
    // own: relative to the group's centre (the plane the rect lives in); transform: all the way to the canvas
    const row = (m: readonly number[]): string => m.map((v) => v.toFixed(2)).join(' ');
    if (stage.preview) say(`own       ${row(rect.calcOwnMatrix())}\nwith group ${row(rect.calcTransformMatrix())}`);
    else say(`rect.calcOwnMatrix()\n${matrixText(rect.calcOwnMatrix())}\nrect.calcTransformMatrix()\n${matrixText(rect.calcTransformMatrix())}`);
  };
  canvas.on('after:render', show);
  show();

  if (stage.bar) {
    slider(stage.bar, 'group angle', -180, 180, 1, 15, (v) => { group.rotate(v); group.setCoords(); canvas.requestRenderAll(); }, (v) => `${v}°`);
    slider(stage.bar, 'group scale', 0.5, 1.8, 0.05, 1, (v) => { group.set({ scaleX: v, scaleY: v }); group.setCoords(); canvas.requestRenderAll(); });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      group.set({ left: 180, top: 120, angle: 15, scaleX: 1, scaleY: 1 });
      group.setCoords();
      await ghost.drag(group.getCenterPoint(), new Point(150, 100), 800);
      const br = controlPoint(group, 'br');
      await ghost.drag(br, br.add(new Point(15, 12)), 700);
      await stage.wait(700);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
