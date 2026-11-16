// App & engine config: auto-panning at the edge during a drag
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, sizer, viewReadout } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a square to the edge of the canvas and hold it there.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      move: { dragOut: true, autoDistance: 2 },
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.glide(u(130), u(90), 400);
      ghost.down();
      await ghost.glide(stage.width - 4, u(90), 600); // to the edge
      await stage.wait(1500); // hold: the view pans by itself
      ghost.up();
      leafer.set({ x: 0, y: 0 });
      await stage.wait(500);
    });
  } else slider(stage.bar!, 'autoDistance (px)', 1, 20, 1, 2, (n) => (leafer.config.move!.autoDistance = n));

  return stage.dispose;
};

export default mount;
