// Basics: hover effects through rect.on()
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverLoop, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the rect, and drag it.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(100),
    y: u(50),
    width: u(160),
    height: u(100),
    fill: '#32cd79',
    stroke: 'black',
    strokeWidth: 2,
    draggable: true,
  });
  leafer.add(rect);

  function onEnter(e: PointerEvent): void {
    (e.current as Rect).fill = '#42dd89';
  }
  function onLeave(e: PointerEvent): void {
    (e.current as Rect).fill = '#32cd79';
  }

  rect.on(PointerEvent.ENTER, onEnter);
  rect.on(PointerEvent.LEAVE, onLeave);

  if (stage.preview) hoverLoop(stage, leafer, { x: u(180), y: u(100) });

  return stage.dispose;
};

export default mount;
