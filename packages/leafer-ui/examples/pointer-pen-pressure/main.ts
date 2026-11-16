// PointerEvent: pen properties arriving through simulated input
import { Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'On a pen or touch screen the properties are real. Here pointerDown is called with pen data of rising pressure.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const w = stage.width * 0.6;
  const rect = new Rect({ x: (stage.width - w) / 2, y: stage.height - 96, width: w, height: 60, fill: GREEN, cornerRadius: 10 });
  const bar = new Rect({ x: rect.x, y: rect.y! + 66, width: 0, height: 8, fill: '#ff4b4b', hittable: false });
  leafer.add([rect, bar]);

  rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
    bar.width = w * e.pressure;
    log(`${e.pointerType}  pressure ${e.pressure.toFixed(2)}  tilt ${e.tiltX ?? '-'}, ${e.tiltY ?? '-'} `);
  });
  rect.on(PointerEvent.UP, () => stage.after(400, () => (bar.width = 0)));

  const send = (pressure: number, tilt: number): void => {
    const origin = { preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() {} };
    const data = { x: stage.width / 2, y: rect.y! + 30, pointerType: 'pen', pressure, tiltX: tilt, tiltY: -tilt, buttons: 1, origin, time: Date.now() };
    leafer.interaction?.pointerDown(data as never);
    leafer.interaction?.pointerUp(data as never);
  };
  if (stage.preview) {
    script(stage, async () => {
      for (const [p, t] of [[0.2, 10], [0.5, 25], [0.9, 40]] as const) {
        send(p, t);
        await stage.wait(1100);
      }
    });
  } else {
    stage.every(1500, () => send(Math.random(), Math.round(Math.random() * 60 - 30)));
  }
  return stage.dispose;
};

export default mount;
