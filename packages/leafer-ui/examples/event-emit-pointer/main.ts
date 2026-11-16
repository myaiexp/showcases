// Interaction: faking hover by emitting pointer.enter and pointer.leave
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';
import { logLines } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Press the buttons: nothing touches the rect with a pointer." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const p = { x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1) };
  const rect = new Rect({ ...p, width: S * 1.4, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const c = { x: p.x + S * 0.7, y: p.y + S / 2 };
  rect.on(PointerEvent.ENTER, (e: PointerEvent) => {
    (e.current as Rect).fill = '#2b8cff';
    log('heard pointer.enter');
  });
  rect.on(PointerEvent.LEAVE, (e: PointerEvent) => {
    (e.current as Rect).fill = GREEN;
    log('heard pointer.leave');
  });
  const enter = (): void => void rect.emit('pointer.enter', { current: rect });
  const leave = (): void => void rect.emit('pointer.leave', { current: rect });
  if (stage.bar) {
    button(stage.bar, "emit('pointer.enter')", enter);
    button(stage.bar, "emit('pointer.leave')", leave);
  } else {
    let on = false;
    stage.every(1100, () => ((on = !on), on ? enter() : leave()));
  }

  return stage.dispose;
};

export default mount;
