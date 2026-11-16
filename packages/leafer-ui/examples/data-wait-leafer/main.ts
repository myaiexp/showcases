// Data: waitLeafer runs a callback once the element is in an engine
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, caption, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press "add to leafer": the callback runs then, and the rect becomes draggable.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.6;
  const c = mid(stage, S, S);
  const note = caption(stage, leafer);
  let rect: Rect | undefined;

  const make = (): void => {
    rect?.destroy();
    const r = (rect = new Rect({ ...c, width: S, height: S, fill: '#32cd79', opacity: 0.35 }));
    r.waitLeafer(() => {
      r.draggable = true; // the docs' callback
      r.opacity = 1;
      note.text = `waitLeafer ran: rect.leafer is a ${r.leafer?.tag}`;
    });
    note.text = `rect.leafer: ${String(r.leafer)}`;
  };
  const add = (): void => void (rect && !rect.leafer && leafer.add(rect));
  make();
  if (stage.bar) {
    button(stage.bar, 'add to leafer', add);
    button(stage.bar, 'new rect', make);
  } else {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      make();
      await stage.wait(1100);
      add();
      await stage.wait(700);
      await ghost.drag({ x: c.x + S / 2, y: c.y + S / 2 }, { x: c.x + S / 2 - 40, y: c.y + S / 2 + 10 }, 700);
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
