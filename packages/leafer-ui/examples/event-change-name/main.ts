// Event: renaming enter and leave to pointerenter and pointerleave (full view only)
import { Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverLoop } from '../../shared/basics.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The names are changed while this page is open: hover the rect and read which strings the listeners use.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = Math.min(stage.width * 0.4, stage.height * 0.5);
  const rect = new Rect({ x: (stage.width - s) / 2, y: stage.height - s - 14, width: s, height: s, fill: GREEN, cornerRadius: 12 });
  leafer.add(rect);

  // The change is global: other cards listen with the constants, so a card keeps the default strings.
  let enter = PointerEvent.ENTER;
  let leave = PointerEvent.LEAVE;
  if (!stage.preview) {
    const old = [PointerEvent.ENTER, PointerEvent.LEAVE];
    PointerEvent.changeName(PointerEvent.ENTER, 'pointerenter');
    PointerEvent.changeName(PointerEvent.LEAVE, 'pointerleave');
    enter = 'pointerenter';
    leave = 'pointerleave';
    stage.onDispose(() => {
      PointerEvent.changeName('pointerenter', old[0]!);
      PointerEvent.changeName('pointerleave', old[1]!);
    });
  }
  rect.on(enter, (e: PointerEvent) => ((e.current as Rect).fill = '#42dd89', log(`on('${enter}')`)));
  rect.on(leave, (e: PointerEvent) => ((e.current as Rect).fill = GREEN, log(`on('${leave}')`)));
  if (stage.preview) hoverLoop(stage, leafer, { x: stage.width / 2, y: rect.y! + s / 2 }, 900);
  return stage.dispose;
};

export default mount;
