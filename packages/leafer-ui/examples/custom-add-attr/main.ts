// Custom: add a data attribute
import { Leafer, PropertyEvent, Rect, RectData, boundsType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive, caption } from '../../shared/shapes.ts';

class AttrDemoRect extends Rect {
  override get __tag(): string {
    return 'AttrDemoRect';
  }
  declare left: number;
}
class AttrDemoRectData extends RectData {}
AttrDemoRect.registerUI();
AttrDemoRect.registerData(AttrDemoRectData as never);
// 1. add the attribute with its default value and a handler (boundsType: re-layout and re-render)
AttrDemoRect.addAttr('left', 0, boundsType);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide left: the JSON in the caption follows.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.5;
  const custom = new AttrDemoRect({ left: 0, x: 30, y: stage.height / 2 - S / 2 - 12, width: S, height: S, fill: '#4B8BFF' });
  leafer.add(custom);
  const note = caption(stage, leafer);
  custom.on(PropertyEvent.CHANGE, (e: PropertyEvent) => {
    if (e.attrName === 'left') {
      custom.x = 30 + (e.newValue as number); // the attribute is only data: use it as you like
      note.text = JSON.stringify({ tag: custom.tag, left: custom.left, width: custom.width });
    }
  });
  drive(stage, 'left', [0, stage.width - S - 60, 1], 0, (v) => (custom.left = v), 4);

  return stage.dispose;
};

export default mount;
