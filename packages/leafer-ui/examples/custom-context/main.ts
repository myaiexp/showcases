// Custom: __draw with the 2D context
import { Leafer, UI, UIData } from 'leafer-ui';
import type { ILeaferCanvas } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

class ContextBox extends UI {
  override get __tag(): string {
    return 'ContextBox';
  }
  // 1. when width and height do not describe the shape, compute the bounds yourself
  override __updateBoxBounds(): void {
    const box = this.__layout.boxBounds;
    const { width, height } = this.__;
    box.x = 0;
    box.y = 0;
    box.width = width as number;
    box.height = height as number;
  }
  // 2. the hit-test path
  override __drawHitPath(hitCanvas: ILeaferCanvas): void {
    const { context } = hitCanvas;
    const { x, y, width, height } = this.__layout.boxBounds;
    context.beginPath();
    context.rect(x, y, width, height);
  }
  // 3. the content, with the raw 2D context
  override __draw(canvas: ILeaferCanvas): void {
    const { context } = canvas;
    const { width, height } = this.__;
    const w = width as number, h = height as number;
    canvas.setStrokeOptions(this.__); // reset the stroke state before stroking
    context.fillStyle = '#4B8BFF';
    context.fillRect(0, 0, w / 2, h);
    context.strokeStyle = '#4B8BFF';
    context.lineWidth = 2;
    context.strokeRect(w / 2, 0.5, w / 2, h - 1);
  }
}
class ContextBoxData extends UIData {}
ContextBox.registerUI();
ContextBox.registerData(ContextBoxData as never);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the box; hit testing follows __drawHitPath.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const custom = new ContextBox({ ...mid(stage, S * 1.4, S * 0.4), width: S * 1.4, height: S * 0.4, draggable: true });
  leafer.add(custom);
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const c = { x: stage.width / 2, y: stage.height / 2 };
      await ghost.drag(c, { x: c.x + 30, y: c.y + 30 }, 700);
      await stage.wait(400);
      await ghost.drag({ x: c.x + 30, y: c.y + 30 }, c, 700);
      await stage.wait(500);
    });
  } else drive(stage, 'height', [20, 200, 2], S * 0.4, (v) => (custom.height = v));

  return stage.dispose;
};

export default mount;
