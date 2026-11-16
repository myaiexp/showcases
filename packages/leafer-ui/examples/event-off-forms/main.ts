// Interaction: off with a listener, a type, nothing, an array or a string
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';
import { logLines, tour, visit } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick an off() form, then hover and click the rect." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const p = { x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1) };
  const rect = new Rect({ ...p, width: S * 1.4, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const c = { x: p.x + S * 0.7, y: p.y + S / 2 };
  const onEnter = (e: PointerEvent): void => ((rect.fill = '#42dd89'), log(e.type));
  const onLeave = (e: PointerEvent): void => ((rect.fill = GREEN), log(e.type));
  const forms = [
    'off(ENTER, onEnter)',
    'off(LEAVE)',
    'off()',
    'off([ENTER, UP], onEnter)',
    "off('pointer.enter pointer.up', onEnter)",
  ] as const;
  type Form = (typeof forms)[number];
  const setup = (form: Form): void => {
    rect.off();
    rect.on(PointerEvent.ENTER, onEnter);
    rect.on(PointerEvent.UP, onEnter);
    rect.on(PointerEvent.LEAVE, onLeave);
    if (form === forms[0]) rect.off(PointerEvent.ENTER, onEnter);
    if (form === forms[1]) rect.off(PointerEvent.LEAVE);
    if (form === forms[2]) rect.off();
    if (form === forms[3]) rect.off([PointerEvent.ENTER, PointerEvent.UP], onEnter);
    if (form === forms[4]) rect.off('pointer.enter pointer.up', onEnter);
    log('-- ' + form);
  };
  if (stage.bar) {
    setup(forms[0]);
    select(stage.bar, 'form', forms, setup, forms[0]);
  } else {
    const ghost = stage.ghost(leafer);
    tour(stage, forms, async (f) => {
      setup(f);
      await visit(stage, ghost, c, 900, true);
    });
  }

  return stage.dispose;
};

export default mount;
