// Interaction: on_ with a bind object and off_ with the returned ids
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';
import { logLines, tour, visit } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover with the listeners on, remove them, hover again." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const p = { x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1) };
  const rect = new Rect({ ...p, width: S * 1.4, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const c = { x: p.x + S * 0.7, y: p.y + S / 2 };
  const owner = { name: 'owner' };
  let ids: ReturnType<typeof rect.on_> | undefined;
  const listen = (): void => {
    ids = rect.on_(
      [PointerEvent.ENTER, PointerEvent.LEAVE],
      function (this: typeof owner, e: PointerEvent) {
        (e.current as Rect).fill = e.type === PointerEvent.ENTER ? '#42dd89' : GREEN;
        log(this.name + ' heard ' + e.type);
      },
      owner,
    );
    log('-- on_()');
  };
  const unlisten = (): void => {
    if (ids) rect.off_(ids);
    ids = undefined;
    log('-- off_(ids)');
  };
  if (stage.bar) {
    listen();
    button(stage.bar, 'on_()', () => ids || listen());
    button(stage.bar, 'off_(ids)', unlisten);
  } else {
    const ghost = stage.ghost(leafer);
    tour(stage, [true, false], async (on) => {
      if (on) listen();
      else unlisten();
      await visit(stage, ghost, c, 800);
    });
  }

  return stage.dispose;
};

export default mount;
