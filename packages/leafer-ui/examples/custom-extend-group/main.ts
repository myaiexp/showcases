// Custom: a Group that builds its own children
import { Ellipse, Group, GroupData, Leafer, Rect, Text, dataType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, toggle, caption } from '../../shared/shapes.ts';

class BadgeGroup extends Group {
  override get __tag(): string {
    return 'BadgeGroup';
  }
  declare top: number;
  constructor(data?: Record<string, unknown>) {
    super(data);
    // The class builds its own children
    this.add([
      new Rect({ width: 140, height: 70, fill: '#4B8BFF', cornerRadius: 18 }),
      new Ellipse({ x: 14, y: 14, width: 42, height: 42, fill: '#FEB027' }),
      new Text({ x: 68, y: 24, text: 'badge', fill: 'white', fontSize: 22 }),
    ]);
  }
}
class BadgeGroupData extends GroupData {}
BadgeGroup.registerUI();
BadgeGroup.registerData(BadgeGroupData as never);
BadgeGroup.addAttr('top', 0, dataType);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle childlessJSON.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const custom = new BadgeGroup({ top: 50, ...mid(stage, 140, 70), draggable: true });
  leafer.add(custom);
  const note = caption(stage, leafer);
  toggle(stage, 'childlessJSON', false, (v) => {
    custom.childlessJSON = v;
    note.text = `toJSON keys: ${Object.keys(custom.toJSON()).join(', ')}`;
  }, 1800);

  return stage.dispose;
};

export default mount;
