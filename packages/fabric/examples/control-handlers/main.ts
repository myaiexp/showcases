// One custom Control wired to each controlsUtils action handler
import { Canvas, Control, Point, Rect, controlsUtils, type TransformActionHandler } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const u = controlsUtils;
const HANDLERS: Record<string, { run: TransformActionHandler; action: string; cursor: string }> = {
  scalingEqually: { run: u.scalingEqually, action: 'scale', cursor: 'nwse-resize' },
  scalingX: { run: u.scalingX, action: 'scaleX', cursor: 'ew-resize' },
  scalingY: { run: u.scalingY, action: 'scaleY', cursor: 'ns-resize' },
  skewHandlerX: { run: u.skewHandlerX, action: 'skewX', cursor: 'ew-resize' },
  skewHandlerY: { run: u.skewHandlerY, action: 'skewY', cursor: 'ns-resize' },
  rotationWithSnapping: { run: u.rotationWithSnapping, action: 'rotate', cursor: 'crosshair' },
  changeWidth: { run: u.changeWidth, action: 'resizing', cursor: 'ew-resize' },
};
const SPOTS: Record<string, { x: number; y: number; offsetX?: number; offsetY?: number }> = {
  'right middle': { x: 0.5, y: 0 },
  'bottom middle': { x: 0, y: 0.5 },
  'bottom right': { x: 0.5, y: 0.5 },
  'above the top': { x: 0, y: -0.5, offsetY: -36 },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'Pick a handler and a spot: the single red control now runs that action. Corner or side controls are just x/y positions.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 170, top: 125, width: 130, height: 90, fill: '#3b7dd8', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
  const tool = new Control({ sizeX: 18, sizeY: 18, actionHandler: u.scalingEqually, cursorStyleHandler: u.scaleCursorStyleHandler });
  rect.controls = { tool };
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const wire = (name: string, spot: string): void => {
    const h = HANDLERS[name]!;
    Object.assign(tool, { offsetX: 0, offsetY: 0, ...SPOTS[spot]!, actionHandler: h.run, actionName: h.action, cursorStyle: h.cursor, withConnection: SPOTS[spot]!.offsetY !== undefined });
    tool.cursorStyleHandler = () => h.cursor;
    rect.set({ scaleX: 1, scaleY: 1, skewX: 0, skewY: 0, angle: 0, width: 130, height: 90 });
    rect.setCoords();
    show();
  };
  const show = (): void => {
    say(`${tool.actionName}: scale ${rect.scaleX.toFixed(2)}, ${rect.scaleY.toFixed(2)}  skew ${rect.skewX.toFixed(0)}°, ${rect.skewY.toFixed(0)}°  angle ${rect.angle.toFixed(0)}°  width ${rect.width.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  canvas.on('object:scaling', show);
  canvas.on('object:skewing', show);
  canvas.on('object:rotating', show);
  canvas.on('object:resizing', show);

  const names = Object.keys(HANDLERS);
  const spots = Object.keys(SPOTS);
  let handler = names[0]!;
  let spot = spots[2]!;
  wire(handler, spot);

  if (stage.bar) {
    select(stage.bar, 'handler', names, (v) => wire((handler = v), spot));
    select(stage.bar, 'spot', spots, (v) => wire(handler, (spot = v)), spot);
    checkbox(stage.bar, 'keep the default controls', false, (v) => {
      rect.controls = v ? { ...u.createObjectDefaultControls(), tool } : { tool };
      rect.setCoords();
      canvas.requestRenderAll();
    });
  } else {
    const ghost = stage.ghost(canvas);
    const pairs: [string, string, number, number][] = [
      ['scalingEqually', 'bottom right', 30, 20], ['scalingX', 'right middle', 30, 0], ['scalingY', 'bottom middle', 0, 24],
      ['skewHandlerX', 'bottom middle', 22, 0], ['skewHandlerY', 'right middle', 0, 18], ['rotationWithSnapping', 'above the top', 60, 20], ['changeWidth', 'right middle', 35, 0],
    ];
    let i = 0;
    stage.repeat(async () => {
      const [n, s, dx, dy] = pairs[i++ % pairs.length]!;
      wire(n, s);
      const p = controlPoint(rect, 'tool');
      await ghost.drag(p, new Point(p.x + dx, p.y + dy), 800);
      await stage.wait(300);
    }, 100);
  }
  return stage.dispose;
};

export default mount;
