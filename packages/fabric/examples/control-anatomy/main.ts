// A new Control on a Rect: x, y, offsetX/Y, sizeX/Y and withConnection
import { Canvas, Control, Rect, controlsUtils } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'The red handle is a Control added to rect.controls. Its position is x/y (fractions of the box) plus offsetX/offsetY (pixels). Drag it: it scales the rectangle.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 160, top: 120, width: 130, height: 90, fill: '#3b7dd8', cornerStyle: 'circle', cornerColor: '#9db8e8', transparentCorners: false });
  const extra = new Control({
    x: 0.5, // 0.5 is the right edge of the bounding box, -0.5 the left
    y: -0.5, // -0.5 is the top edge
    offsetX: 30, // then 30 screen pixels further right
    offsetY: -30,
    sizeX: 22,
    sizeY: 22,
    withConnection: true, // draw a line from the control to the box
    actionName: 'scale',
    cursorStyle: 'nesw-resize',
    actionHandler: controlsUtils.scalingEqually,
  });
  rect.controls.extra = extra;
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const refresh = (): void => {
    rect.setCoords(); // control positions are cached in oCoords
    say(stage.preview ? `x ${extra.x.toFixed(2)}  y ${extra.y.toFixed(2)}` : `x ${extra.x.toFixed(2)}  y ${extra.y.toFixed(2)}  offset (${extra.offsetX}, ${extra.offsetY})  size ${extra.sizeX}x${extra.sizeY}`);
    canvas.requestRenderAll();
  };
  refresh();

  if (stage.bar) {
    slider(stage.bar, 'x', -1, 1, 0.05, extra.x, (v) => { extra.x = v; refresh(); });
    slider(stage.bar, 'y', -1, 1, 0.05, extra.y, (v) => { extra.y = v; refresh(); });
    slider(stage.bar, 'offsetX', -60, 60, 1, extra.offsetX, (v) => { extra.offsetX = v; refresh(); });
    slider(stage.bar, 'offsetY', -60, 60, 1, extra.offsetY, (v) => { extra.offsetY = v; refresh(); });
    slider(stage.bar, 'size', 8, 40, 1, extra.sizeX, (v) => { extra.sizeX = extra.sizeY = v; refresh(); });
    checkbox(stage.bar, 'withConnection', true, (v) => { extra.withConnection = v; refresh(); });
    canvas.on('object:scaling', refresh);
  } else {
    stage.loop((_dt, t) => {
      extra.x = Math.cos(t * 0.9) * 0.5;
      extra.y = Math.sin(t * 0.9) * 0.5;
      extra.offsetX = Math.sign(extra.x) * 30;
      extra.offsetY = Math.sign(extra.y) * 30;
      refresh();
    });
  }
  return stage.dispose;
};

export default mount;
