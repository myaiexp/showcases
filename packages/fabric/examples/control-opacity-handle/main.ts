// A Control whose handler edits opacity, riding the right edge like a slider knob
import { Canvas, Control, Point, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'Drag the knob on the right edge: top is opaque, bottom is transparent. The handle both reads and writes opacity.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 150, top: 120, width: 140, height: 150, fill: '#e94b3c', cornerStyle: 'circle', cornerColor: '#e8b4ae', transparentCorners: false, angle: 8 });
  const knob = new Control({
    sizeX: 20,
    sizeY: 20,
    cursorStyle: 'ns-resize',
    actionName: 'opacity',
    offsetX: 14,
    // opacity 1 is the top of the right edge, 0 the bottom
    positionHandler: (dim, finalMatrix, obj) => new Point(dim.x / 2 + knob.offsetX, (0.5 - obj.opacity) * dim.y).transform(finalMatrix),
    actionHandler: (_e, { target }, x, y) => {
      const local = util.sendPointToPlane(new Point(x, y), undefined, target.calcTransformMatrix());
      const next = Math.round(Math.min(1, Math.max(0.05, 0.5 - local.y / target.height)) * 100) / 100;
      const changed = next !== target.opacity;
      target.set('opacity', next);
      return changed;
    },
    render(c, left, top, _s, obj) {
      c.save();
      c.translate(left, top);
      c.rotate(util.degreesToRadians(obj.getTotalAngle()));
      c.fillStyle = '#fff';
      c.strokeStyle = '#2b2a33';
      c.lineWidth = 2;
      c.beginPath();
      c.arc(0, 0, 9, 0, Math.PI * 2);
      c.fill();
      c.stroke();
      c.fillStyle = '#2b2a33';
      c.beginPath();
      c.moveTo(0, 0);
      c.arc(0, 0, 6, -Math.PI / 2, -Math.PI / 2 + obj.opacity * Math.PI * 2);
      c.fill(); // the pie shows the current value
      c.restore();
    },
  });
  rect.controls = { knob };
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const show = (): void => {
    rect.setCoords();
    say(`opacity ${rect.opacity.toFixed(2)}`);
    canvas.requestRenderAll();
  };
  show();
  canvas.on('after:render', () => say(`opacity ${rect.opacity.toFixed(2)}`));

  if (stage.bar) slider(stage.bar, 'opacity', 0.05, 1, 0.01, 1, (v) => { rect.set('opacity', v); show(); }, (v) => v.toFixed(2));
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      rect.set('opacity', 1);
      show();
      const p = controlPoint(rect, 'knob');
      await ghost.drag(p, p.add(new Point(0, 90)), 1000);
      const q = controlPoint(rect, 'knob');
      await ghost.drag(q, q.add(new Point(0, -60)), 900);
      await stage.wait(500);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
