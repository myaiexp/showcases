// Basics: listeners bound through the event object
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverLoop, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the rect.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = Rect.one(
    {
      fill: '#32cd79',
      draggable: true,
      event: {
        [PointerEvent.ENTER]: function (e: PointerEvent) {
          (e.current as Rect).fill = '#42dd89';
        },
        [PointerEvent.LEAVE]: function (e: PointerEvent) {
          (e.current as Rect).fill = '#32cd79';
        },
      },
    },
    u(100), u(50), u(160), u(100),
  );
  leafer.add(rect);

  if (stage.preview) hoverLoop(stage, leafer, { x: u(180), y: u(100) });

  return stage.dispose;
};

export default mount;
