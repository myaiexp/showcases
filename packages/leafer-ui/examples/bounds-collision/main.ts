// Advanced: bounding-box collision across parents
import { Leafer, Frame, Rect, DragEvent, Bounds } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the yellow rect over the orange one.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const rect1 = Rect.one({ fill: '#FEB027', draggable: true }, u(110), u(40), u(100), u(100));
  leafer.add(Frame.one({ children: [rect1] }, u(20), u(70), u(310), u(170))); // rect1 is inside a frame

  const rect2 = Rect.one({ fill: '#FFE04B', draggable: true }, u(150), u(0), u(100), u(100)); // rect2 is outside it
  leafer.add(rect2);

  // The world box bounds put both in one coordinate system.
  rect2.on(DragEvent.DRAG, () => {
    const rect2Bounds = new Bounds(rect2.worldBoxBounds);
    rect1.stroke = rect2Bounds.hit(rect1.worldBoxBounds) ? 'blue' : ''; // a blue outline on collision
    rect1.strokeWidth = 4;
  });

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(200), y: u(50) }, { x: u(190), y: u(130) });

  return stage.dispose;
};

export default mount;
