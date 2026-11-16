// skewHandlerX and skewHandlerY on the side handles instead of scale-or-skew
import { Canvas, Point, Rect, controlsUtils } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'The side handles skew straight away; by default they scale and only skew with shift held.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 160, top: 120, width: 110, height: 70, fill: '#d99a1c', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const c = rect.controls;
  // top and bottom handles slide the edge sideways (skewX); left and right slide it up and down (skewY)
  for (const key of ['mt', 'mb'] as const) Object.assign(c[key]!, { actionHandler: controlsUtils.skewHandlerX, cursorStyleHandler: controlsUtils.skewCursorStyleHandler, actionName: 'skewing' });
  for (const key of ['ml', 'mr'] as const) Object.assign(c[key]!, { actionHandler: controlsUtils.skewHandlerY, cursorStyleHandler: controlsUtils.skewCursorStyleHandler, actionName: 'skewing' });

  const show = (): void => {
    say(`skewX ${rect.skewX.toFixed(1)}°  skewY ${rect.skewY.toFixed(1)}°`);
    canvas.requestRenderAll();
  };
  show();
  canvas.on('object:skewing', show);

  if (stage.bar) {
    button(stage.bar, 'reset', () => { rect.set({ skewX: 0, skewY: 0 }); rect.setCoords(); show(); });
    checkbox(stage.bar, 'lockSkewingX', false, (v) => { rect.lockSkewingX = v; });
    checkbox(stage.bar, 'lockSkewingY', false, (v) => { rect.lockSkewingY = v; });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      rect.set({ skewX: 0, skewY: 0 });
      rect.setCoords();
      const top = controlPoint(rect, 'mt');
      await ghost.drag(top, top.add(new Point(25, 0)), 800);
      const right = controlPoint(rect, 'mr');
      await ghost.drag(right, right.add(new Point(0, 18)), 800);
      await stage.wait(700);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
