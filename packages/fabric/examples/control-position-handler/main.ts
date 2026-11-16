// A Control with its own positionHandler riding a Circle's rim, setting radius
import { Canvas, Circle, Control, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { controlPoint } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'The only control sits on the circle itself, wherever the angle slider puts it. Dragging it changes the radius.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const circle = new Circle({ left: 160, top: 120, radius: 60, fill: '#2e9e5b', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
  let rimAngle = -40; // degrees, 0 is the right

  const rim = new Control({
    sizeX: 16,
    sizeY: 16,
    cursorStyle: 'ew-resize',
    actionName: 'resizing',
    // dim is the object's size on screen, finalMatrix puts object-centred points on the canvas
    positionHandler: (dim, finalMatrix) => {
      const a = (rimAngle * Math.PI) / 180;
      return new Point((Math.cos(a) * dim.x) / 2, (Math.sin(a) * dim.y) / 2).transform(finalMatrix);
    },
    // the pointer arrives in scene coordinates: the new radius is its distance from the centre
    actionHandler: (_e, transform, x, y) => {
      const target = transform.target as Circle;
      const radius = Math.max(8, new Point(x, y).distanceFrom(target.getCenterPoint()) / target.scaleX);
      target.set('radius', radius);
      return true;
    },
  });
  circle.controls = { rim }; // replaces the default eight handles of this one circle
  canvas.add(circle);
  canvas.setActiveObject(circle);

  const refresh = (): void => {
    circle.setCoords();
    say(`radius ${circle.radius.toFixed(0)}, rim at ${Math.round(rimAngle)}°`);
    canvas.requestRenderAll();
  };
  refresh();
  canvas.on('object:resizing', refresh);

  if (stage.bar) slider(stage.bar, 'rim angle', -180, 180, 1, rimAngle, (v) => { rimAngle = v; refresh(); }, (v) => `${v}°`);
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      rimAngle = -40;
      circle.set('radius', 60);
      refresh();
      const p = controlPoint(circle, 'rim');
      await ghost.drag(p, p.add(new Point(35, -10)), 800);
      await ghost.drag(controlPoint(circle, 'rim'), controlPoint(circle, 'rim').add(new Point(-60, 20)), 900);
      await stage.wait(500);
    });
  }
  return stage.dispose;
};

export default mount;
