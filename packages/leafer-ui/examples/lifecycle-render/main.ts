// Advanced: logging the events between a change and a render
import { Leafer, Rect, PropertyEvent, LayoutEvent, RenderEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the rect with the button (or drag it) and read the order.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(30), y: u(110), width: u(70), height: u(70), fill: GREEN, draggable: true });
  leafer.add(rect);

  const log: string[] = [];
  const say = label(stage, '');
  let pending = 0;
  const note = (line: string): void => {
    log.push(line);
    if (log.length > (stage.preview ? 8 : 14)) log.shift();
    if (!pending) pending = requestAnimationFrame(() => ((pending = 0), say(log.join('\n'))));
  };
  stage.onDispose(() => cancelAnimationFrame(pending));

  rect.on(PropertyEvent.CHANGE, (e: PropertyEvent) => note(`${PropertyEvent.CHANGE} ${e.attrName}`));
  for (const type of [LayoutEvent.REQUEST, LayoutEvent.BEFORE, LayoutEvent.LAYOUT, LayoutEvent.AFTER, RenderEvent.REQUEST, RenderEvent.BEFORE, RenderEvent.RENDER, RenderEvent.AFTER]) {
    leafer.on(type, () => note(type));
  }
  const move = (): void => void (rect.x = rect.x === u(30) ? u(150) : u(30));

  if (stage.preview) stage.every(1800, move);
  else button(stage.bar!, 'rect.x = ...', move);

  return stage.dispose;
};

export default mount;
