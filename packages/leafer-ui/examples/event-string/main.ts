// Basics: listening with the event type as a string
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverLoop, label, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the rect: the readout names the events.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({ x: u(100), y: u(50), width: u(160), height: u(100), fill: '#32cd79', draggable: true });
  leafer.add(rect);
  const say = label(stage, 'hover the rect', true);

  function onEnter(e: PointerEvent): void {
    (e.current as Rect).fill = '#42dd89';
    say('pointer.enter');
  }
  function onLeave(e: PointerEvent): void {
    (e.current as Rect).fill = '#32cd79';
    say('pointer.leave');
  }

  rect.on('pointer.enter', onEnter);
  rect.on('pointer.leave', onLeave);

  if (stage.preview) hoverLoop(stage, leafer, { x: u(180), y: u(100) });

  return stage.dispose;
};

export default mount;
