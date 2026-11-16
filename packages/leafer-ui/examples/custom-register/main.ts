// Custom: register an element and import it from JSON
import { Leafer, Rect, UI } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

// 1. register  2. a globally unique tag (the JS form of the docs' decorator)
class RegisterDemoRect extends Rect {
  override get __tag(): string {
    return 'RegisterDemoRect';
  }
}
RegisterDemoRect.registerUI();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press copy to rebuild the element from its JSON.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.5;
  const custom = new RegisterDemoRect({ x: 30, y: stage.height / 2 - S / 2 - 12, width: S, height: S, fill: '#4B8BFF', draggable: true });
  leafer.add(custom);
  const note = caption(stage, leafer);
  let copy: UI | undefined;
  const go = (): void => {
    const json = custom.toJSON(); // { tag: 'RegisterDemoRect', ... }
    copy?.destroy();
    copy = UI.one({ ...json, x: stage.width - S - 30, fill: '#FEB027' }); // the tag finds the class
    leafer.add(copy);
    note.text = `tag ${String(json.tag)}, copy is a ${copy.constructor.name}`;
  };
  go();
  if (stage.bar) button(stage.bar, 'copy', go);
  else stage.every(1400, go);

  return stage.dispose;
};

export default mount;
