// Custom: what each attribute handler triggers
import { LayoutEvent, Leafer, Rect, RectData, RenderEvent, boundsType, createAttr, dataType, surfaceType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

class HandlerDemoRect extends Rect {
  override get __tag(): string {
    return 'HandlerDemoRect';
  }
  declare inset: number;
  declare tint: number;
  declare note: string;
  declare canUse: boolean;
}
class HandlerDemoRectData extends RectData {}
HandlerDemoRect.registerUI();
HandlerDemoRect.registerData(HandlerDemoRectData as never);
HandlerDemoRect.addAttr('inset', 0, boundsType); // layout + render
HandlerDemoRect.addAttr('tint', 0, surfaceType); // render only
HandlerDemoRect.addAttr('note', '', dataType); // neither
createAttr(true)(HandlerDemoRect.prototype, 'canUse'); // a normal attribute: never in the JSON

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press each button and read how many layouts and renders followed.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.55;
  const custom = new HandlerDemoRect({ ...mid(stage, S), width: S, height: S, fill: '#32cd79' });
  leafer.add(custom);
  const note = caption(stage, leafer);
  note.height = 40;
  note.y = stage.height - (stage.preview ? 34 : 44);
  let layouts = 0, renders = 0;
  leafer.on(LayoutEvent.END, () => layouts++);
  leafer.on(RenderEvent.END, () => renders++);
  const actions: [string, () => void][] = [
    ['boundsType: inset', () => (custom.inset = Math.round(Math.random() * 20) + 1)],
    ['surfaceType: tint', () => (custom.tint = Math.round(Math.random() * 20) + 1)],
    ['dataType: note', () => (custom.note = String(Math.random()))],
    ['createAttr: canUse', () => (custom.canUse = !custom.canUse)],
  ];
  const run = (k: number): void => {
    const [name, act] = actions[k]!;
    layouts = renders = 0;
    act();
    stage.after(250, () => {
      note.text = `${name}\nlayouts ${layouts}, renders ${renders}, JSON keys: ${Object.keys(custom.toJSON()).filter((j) => ['inset', 'tint', 'note', 'canUse'].includes(j)).join(', ')}`;
    });
  };
  if (stage.bar) actions.forEach(([name], k) => button(stage.bar!, name, () => run(k)));
  else { let k = 0; stage.every(1500, () => run(k++ % actions.length)); }

  return stage.dispose;
};

export default mount;
