// Data: waitParent runs a callback once the element has a parent
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, caption, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press "add to group": only then does the callback run and the rect become draggable.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group();
  leafer.add(group);
  const S = size(stage) * 0.6;
  const note = caption(stage, leafer);
  let rect: Rect | undefined;

  const make = (): void => {
    rect?.destroy();
    const r = (rect = new Rect({ ...mid(stage, S, S), width: S, height: S, fill: '#32cd79', opacity: 0.35 }));
    r.waitParent(() => {
      r.draggable = true; // the docs' callback
      r.opacity = 1;
      note.text = 'waitParent ran: draggable = true';
    });
    note.text = `rect.parent: ${String(r.parent)} (nothing to draw yet)`;
  };
  const add = (): void => void (rect && !rect.parent && group.add(rect));
  make();
  if (stage.bar) {
    button(stage.bar, 'add to group', add);
    button(stage.bar, 'new rect', make);
  } else {
    const ghost = stage.ghost(leafer);
    const c = mid(stage, S, S);
    script(stage, async () => {
      make();
      await stage.wait(1100);
      add();
      await stage.wait(700);
      await ghost.drag({ x: c.x + S / 2, y: c.y + S / 2 }, { x: c.x + S / 2 + 40, y: c.y + S / 2 - 20 }, 700);
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
