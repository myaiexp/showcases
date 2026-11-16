// Custom: a Pen that redraws when size changes
import { Leafer, Pen, PenData, boundsType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

class SizedPenData extends PenData {
  _size = 0;
  setSize(value: number): void {
    this._size = value;
    (this as unknown as { __leaf: SizedPen }).__leaf.createShapes();
  }
}
class SizedPen extends Pen {
  override get __tag(): string {
    return 'SizedPen';
  }
  declare size: number;
  // Rebuilds the combined shapes for the current size
  createShapes(): void {
    this.clear();
    const size = (this.__ as unknown as { size: number }).size;
    const center = size / 2;
    this.setStyle({ fill: '#FF4B4B', windingRule: 'evenodd' });
    this.roundRect(0, 0, size, size, size / 3).arc(center, center, size / 4);
    this.setStyle({ x: center, y: center, fill: '#FEB027' });
    this.arc(0, 0, size / 5);
  }
}
SizedPen.registerUI();
SizedPen.registerData(SizedPenData as never);
SizedPen.addAttr('size', 0, boundsType);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide size.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const custom = new SizedPen({ size: 100, x: 0, y: 0 });
  leafer.add(custom);
  drive(stage, 'size', [40, 260, 2], size(stage) * 0.6, (v) => {
    custom.size = v;
    custom.set(mid(stage, v));
  }, 5);

  return stage.dispose;
};

export default mount;
