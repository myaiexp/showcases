// PropertyEvent: watching attribute changes on an element and on the leafer
import { Leafer, LeaferEvent, PropertyEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the rect with the buttons, or drag it: every attribute that changes is reported.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = Math.min(stage.width * 0.28, stage.height * 0.35);
  const rect = new Rect({ x: (stage.width - s) / 2, y: stage.height - s - 14, width: s, height: s, fill: GREEN, cornerRadius: 10, draggable: true });
  leafer.add(rect);

  leafer.on(LeaferEvent.READY, () => {
    const show = (who: string, e: PropertyEvent): void => {
      const f = (v: unknown): string => (typeof v === 'number' ? String(Math.round(v * 10) / 10) : JSON.stringify(v));
      log(`${who} ${e.attrName}: ${f(e.oldValue)} -> ${f(e.newValue)}`);
    };
    rect.on(PropertyEvent.CHANGE, (e: PropertyEvent) => show('rect  ', e));
    leafer.on(PropertyEvent.CHANGE, (e: PropertyEvent) => show('leafer', e));
    const change = (n: number): void => {
      rect.fill = n % 2 ? '#4B8BFF' : GREEN;
      rect.rotation = n % 2 ? 15 : 0;
    };
    let n = 0;
    if (stage.bar) button(stage.bar, 'change fill and rotation', () => change(++n));
    else stage.every(1800, () => change(++n));
  });
  return stage.dispose;
};

export default mount;
