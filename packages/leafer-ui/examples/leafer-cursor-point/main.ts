// App & Engine: reading the pointer position and the canvas bounds
import { Leafer, Rect, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the canvas.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN }, u(40), u(40), u(100), u(100)));
  const dot = new Ellipse({ width: 12, height: 12, around: 'center', fill: '#FF4B4B', hittable: false });
  leafer.add(dot);
  const say = label(stage, '', true);
  let client = { clientX: 0, clientY: 0 };
  const onMove = (e: PointerEvent): void => void (client = { clientX: e.clientX, clientY: e.clientY });
  window.addEventListener('pointermove', onMove);
  stage.onDispose(() => window.removeEventListener('pointermove', onMove));

  stage.loop(() => {
    const { cursorPoint, clientBounds } = leafer;
    dot.set({ x: cursorPoint.x, y: cursorPoint.y });
    const world = leafer.getWorldPointByClient(client); // browser client -> engine world
    say(`cursorPoint ${Math.round(cursorPoint.x)}, ${Math.round(cursorPoint.y)}\nclientBounds x ${Math.round(clientBounds.x)} y ${Math.round(clientBounds.y)}\nfrom client: ${Math.round(world.x)}, ${Math.round(world.y)}`);
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.glide(u(60), u(60), 700);
      await ghost.glide(u(220), u(90), 900);
      await ghost.glide(u(120), u(140), 800);
    });
  }

  return stage.dispose;
};

export default mount;
