// Interaction: removing capture and bubble listeners with off
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';
import { logLines, tour, visit } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick an off() call, then hover the rect." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const p = { x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1) };
  const rect = new Rect({ ...p, width: S * 1.4, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const c = { x: p.x + S * 0.7, y: p.y + S / 2 };
  const onBubble = (): void => log('bubble listener');
  const onCapture = (): void => log('capture listener');
  const forms = ['off(ENTER, onCapture)', 'off(ENTER, onCapture, true)', 'off(ENTER, onBubble)', "off(ENTER, onCapture, { capture: true })"] as const;
  type Form = (typeof forms)[number];
  const setup = (form: Form): void => {
    rect.off();
    rect.on(PointerEvent.ENTER, onBubble);
    rect.on(PointerEvent.ENTER, onCapture, true);
    if (form === forms[0]) rect.off(PointerEvent.ENTER, onCapture); // wrong phase: removes nothing
    if (form === forms[1]) rect.off(PointerEvent.ENTER, onCapture, true);
    if (form === forms[2]) rect.off(PointerEvent.ENTER, onBubble);
    if (form === forms[3]) rect.off(PointerEvent.ENTER, onCapture, { capture: true });
    log('-- ' + form);
  };
  if (stage.bar) {
    setup(forms[0]);
    select(stage.bar, 'call', forms, setup, forms[0]);
  } else {
    const ghost = stage.ghost(leafer);
    tour(stage, forms, async (f) => {
      setup(f);
      await visit(stage, ghost, c, 900);
    });
  }

  return stage.dispose;
};

export default mount;
