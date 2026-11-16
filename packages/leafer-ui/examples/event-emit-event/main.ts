// Interaction: emitEvent with an event object and current bound
import { Leafer, Rect, type IEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';
import { logLines } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Send the event." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const p = { x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1) };
  const rect = new Rect({ ...p, width: S * 1.4, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const c = { x: p.x + S * 0.7, y: p.y + S / 2 };
  let n = 0;
  rect.on('file.save', (e: IEvent & { text?: string }) => {
    (e.current as Rect).fill = n % 2 ? '#2b8cff' : '#FEB027';
    log('file.save #' + n + ' "' + e.text + '"\ne.current === rect: ' + (e.current === rect));
  });
  const send = (): void => {
    n++;
    rect.emitEvent({ type: 'file.save', text: 'a custom payload' } as IEvent);
  };
  if (stage.bar) button(stage.bar, 'emitEvent()', send);
  else stage.every(1200, send);

  return stage.dispose;
};

export default mount;
