// Custom: a data processing class
import { Leafer, Rect, RectData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, caption } from '../../shared/shapes.ts';

// 1. the data class: empty when there is no special logic
class DataDemoRectData extends RectData {}
class DataDemoRect extends Rect {
  override get __tag(): string {
    return 'DataDemoRect';
  }
}
DataDemoRect.registerUI();
// 2. register it so the data does not pollute the class Rect inherits from
DataDemoRect.registerData(DataDemoRectData as never);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the rect; the data class is what holds its values.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.55;
  const custom = new DataDemoRect({ ...mid(stage, S), width: S, height: S, fill: '#32cd79', draggable: true });
  leafer.add(custom);
  const note = caption(stage, leafer);
  note.text = `custom.__ instanceof DataDemoRectData: ${custom.__ instanceof DataDemoRectData}`;
  stage.loop((_dt, t) => (custom.rotation = Math.sin(t) * 15));

  return stage.dispose;
};

export default mount;
