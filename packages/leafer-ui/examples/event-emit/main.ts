// Basics: dispatching events with emit()
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The buttons emit pointer.enter / pointer.leave on the rect without touching it.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({ x: u(100), y: u(50), width: u(160), height: u(100), fill: '#32cd79', draggable: true });
  leafer.add(rect);

  rect.on('pointer.enter', (e: PointerEvent) => ((e.current as Rect).fill = '#42dd89'));
  rect.on('pointer.leave', (e: PointerEvent) => ((e.current as Rect).fill = '#32cd79'));

  const enter = (): void => void rect.emit('pointer.enter', { current: rect });
  const leave = (): void => void rect.emit('pointer.leave', { current: rect });

  if (stage.preview) {
    let on = false;
    stage.every(900, () => ((on = !on), on ? enter() : leave()));
  } else {
    button(stage.bar!, 'emit pointer.enter', enter);
    button(stage.bar!, 'emit pointer.leave', leave);
  }

  return stage.dispose;
};

export default mount;
