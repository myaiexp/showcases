// Controls: mouseDownHandler and mouseUpHandler turn controls into one-shot buttons (flip, recolour)
import { Canvas, Control, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { eventLog } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const COLOURS = ['#3b7dd8', '#e94b3c', '#2e9e5b', '#d99a1c'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'The two round buttons are Controls with no action handler: a press runs mouseDownHandler, a release runs mouseUpHandler.' });
  const canvas = stage.own(new Canvas(stage.el));
  const log = eventLog(stage, 4);

  const disc = (c: CanvasRenderingContext2D, left: number, top: number, obj: { getTotalAngle(): number }, fill: string): void => {
    c.translate(left, top);
    c.rotate(util.degreesToRadians(obj.getTotalAngle()));
    c.fillStyle = fill;
    c.strokeStyle = '#fff';
    c.lineWidth = 2;
    c.beginPath();
    c.arc(0, 0, 12, 0, Math.PI * 2);
    c.fill();
    c.stroke();
  };
  const flip = new Control({
    x: -0.5, y: -0.2, offsetX: -22, sizeX: 26, sizeY: 26, cursorStyle: 'pointer',
    mouseDownHandler: () => { log.add('mouseDownHandler', 'flip pressed'); return true; },
    mouseUpHandler: (_e, { target }) => {
      target.set('flipX', !target.flipX);
      log.add('mouseUpHandler', `flipX = ${target.flipX}`);
      canvas.requestRenderAll();
      return true;
    },
    render(c, left, top, _s, obj) {
      c.save();
      disc(c, left, top, obj, '#2b2a33');
      c.strokeStyle = '#fff'; // a double-headed arrow
      c.beginPath();
      c.moveTo(-6, 0); c.lineTo(6, 0); c.moveTo(-6, 0); c.lineTo(-3, -3); c.moveTo(-6, 0); c.lineTo(-3, 3);
      c.moveTo(6, 0); c.lineTo(3, -3); c.moveTo(6, 0); c.lineTo(3, 3);
      c.stroke();
      c.restore();
    },
  });
  let n = 0;
  const paint = new Control({
    x: -0.5, y: 0.2, offsetX: -22, sizeX: 26, sizeY: 26, cursorStyle: 'pointer',
    mouseUpHandler: (_e, { target }) => {
      target.set('fill', COLOURS[++n % COLOURS.length]);
      log.add('mouseUpHandler', `fill = ${target.fill}`);
      canvas.requestRenderAll();
      return true;
    },
    render(c, left, top, _s, obj) {
      c.save();
      disc(c, left, top, obj, COLOURS[(n + 1) % COLOURS.length]!); // shows the colour a click gives
      c.restore();
    },
  });
  // an asymmetric shape makes the flip visible
  const rect = new Rect({ left: 190, top: 110, width: 120, height: 90, fill: COLOURS[0]!, rx: 28, ry: 28, cornerStyle: 'circle', cornerColor: '#9db8e8', transparentCorners: false });
  rect.controls.flip = flip;
  rect.controls.paint = paint;
  canvas.add(rect);
  canvas.setActiveObject(rect);

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      await ghost.click(controlPoint(rect, 'flip'));
      await stage.wait(500);
      await ghost.click(controlPoint(rect, 'paint'));
      await stage.wait(500);
      await ghost.click(controlPoint(rect, 'paint'));
      await stage.wait(800);
    });
  }
  return stage.dispose;
};

export default mount;
