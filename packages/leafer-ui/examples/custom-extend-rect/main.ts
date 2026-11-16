// Custom: extend Rect with a dataType attribute
import { Leafer, Rect, RectData, dataType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, caption } from '../../shared/shapes.ts';

class TopDemoRect extends Rect {
  override get __tag(): string {
    return 'TopDemoRect';
  }
  declare top: number; // declare: the attribute is added below
}
class TopDemoRectData extends RectData {}
TopDemoRect.registerUI();
TopDemoRect.registerData(TopDemoRectData as never);
TopDemoRect.addAttr('top', 0, dataType);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide top: it changes the JSON, not the drawing.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.6;
  const custom = new TopDemoRect({ top: 50, ...mid(stage, S * 1.6, S * 0.4), width: S * 1.6, height: S * 0.4, fill: '#4B8BFF', draggable: true });
  leafer.add(custom);
  const note = caption(stage, leafer);
  drive(stage, 'top', [0, 100, 1], 50, (v) => {
    custom.top = v;
    const { tag, top, width } = custom.toJSON() as Record<string, unknown>;
    note.text = JSON.stringify({ tag, top, width });
  }, 4);

  return stage.dispose;
};

export default mount;
