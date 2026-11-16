// Controls: the rotate handle is a Control using rotationWithSnapping, which obeys snapAngle and lockRotation
import { Canvas, Control, Point, Rect, controlsUtils } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'Turn the handle above the rectangle. With snapAngle set it jumps between angles.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 160, top: 125, width: 140, height: 70, fill: '#2e9e5b', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false, snapAngle: 45, snapThreshold: 10 });
  // the handle written out: this is what createObjectDefaultControls() puts under 'mtr'
  rect.controls.mtr = new Control({
    x: 0,
    y: -0.5,
    offsetY: -40,
    withConnection: true,
    actionName: 'rotate',
    actionHandler: controlsUtils.rotationWithSnapping,
    cursorStyleHandler: controlsUtils.rotationStyleHandler, // 'not-allowed' while lockRotation is true
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const show = (): void => {
    say(stage.preview ? `angle ${rect.angle.toFixed(1)}°  snap ${rect.snapAngle}°` : `angle ${rect.angle.toFixed(1)}°   snapAngle ${rect.snapAngle}°   snapThreshold ${rect.snapThreshold}°${rect.lockRotation ? '   locked' : ''}`);
    canvas.requestRenderAll();
  };
  show();
  canvas.on('object:rotating', show);

  if (stage.bar) {
    slider(stage.bar, 'snapAngle', 0, 90, 5, 45, (v) => { rect.snapAngle = v; show(); }, (v) => `${v}°`);
    slider(stage.bar, 'snapThreshold', 1, 45, 1, 10, (v) => { rect.snapThreshold = v; show(); }, (v) => `${v}°`);
    checkbox(stage.bar, 'lockRotation', false, (v) => { rect.lockRotation = v; show(); });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      rect.set({ angle: 0 });
      rect.setCoords();
      const h = controlPoint(rect, 'mtr');
      await ghost.drag(h, h.add(new Point(70, 30)), 900);
      const h2 = controlPoint(rect, 'mtr');
      await ghost.drag(h2, h2.add(new Point(30, 80)), 900);
      await stage.wait(600);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
