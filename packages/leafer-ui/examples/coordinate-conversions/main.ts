// Advanced: converting a pointer position between coordinate systems
import { Leafer, Group, Rect, Ellipse, PointerEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the canvas; ctrl + wheel to zoom and see world and page diverge.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      fill: '#333',
    }),
  );
  const group = new Group({ x: u(90), y: u(40), rotation: 15, scale: 1.2 });
  const rect = new Rect({ x: u(20), y: u(10), width: u(110), height: u(80), fill: GREEN, cornerRadius: 6 });
  group.add(rect);
  leafer.add(group);

  const dot = new Ellipse({ width: 10, height: 10, around: 'center', fill: '#FF4B4B', hittable: false });
  leafer.add(dot);
  const say = label(stage, 'move the pointer');
  const f = (p: { x: number; y: number }): string => `${Math.round(p.x)}, ${Math.round(p.y)}`;

  leafer.on(PointerEvent.MOVE, (e: PointerEvent) => {
    const page = e.getPagePoint(); // world -> page (inside the zoom layer)
    dot.set(page); // placed in page coordinates
    say(`world  ${f(e)}\npage   ${f(page)}\nlocal  ${f(rect.getLocalPoint(e))}\ninner  ${f(rect.getInnerPoint(e))}\nbox    ${f(rect.getBoxPoint(e))}`);
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.glide(u(100), u(70), 700);
      await ghost.glide(u(210), u(110), 900);
      await ghost.glide(u(130), u(150), 800);
    });
  }

  return stage.dispose;
};

export default mount;
