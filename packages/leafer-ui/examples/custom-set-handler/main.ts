// Custom: setWidth rounds the stored width up
import { Leafer, Rect, RectData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive, caption } from '../../shared/shapes.ts';

class CeilDemoRectData extends RectData {
  override _width = 0; // the private computed value
  // Becomes the setter for width, so never call super.setWidth()
  override setWidth(value: number): void {
    this._width = Math.ceil(value);
  }
}
class CeilDemoRect extends Rect {
  override get __tag(): string {
    return 'CeilDemoRect';
  }
}
CeilDemoRect.registerUI();
CeilDemoRect.registerData(CeilDemoRectData as never);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the fractional width.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.8;
  const custom = new CeilDemoRect({ x: 30, y: stage.height / 2 - 25, width: 40, height: 50, fill: '#FEB027' });
  leafer.add(custom);
  const note = caption(stage, leafer);
  drive(stage, 'width', [20, S + 40, 0.1], 40, (v) => {
    custom.width = Number(v.toFixed(1));
    note.text = `input ${v.toFixed(1)} -> custom.width ${custom.width}, __.width ${custom.__.width}`;
  }, 6);

  return stage.dispose;
};

export default mount;
