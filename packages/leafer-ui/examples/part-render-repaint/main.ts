// Advanced: seeing the repaint region with and without partial rendering
import { App, Rect, Ellipse, RenderEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle usePartRender: the flash grows from the ball\'s box to the whole canvas.', paper: 'transparent' });
  const u = sizer(stage);
  const app = stage.own(
    new App({
      view: stage.view,
      fill: '#222',
      tree: { usePartRender: true }, // the default
      sky: {},
    }),
  );
  // Static background rects, and one moving ball
  for (let i = 0; i < 24; i++) app.tree.add(Rect.one({ fill: `hsl(${i * 14}, 40%, 35%)` }, (i % 6) * u(45) + u(10), Math.floor(i / 6) * u(45) + u(10), u(38), u(38)));
  const ball = new Ellipse({ width: u(24), height: u(24), fill: '#FFE04B' });
  app.tree.add(ball);

  // The sky layer shows the last repaint region, fading out.
  const flash = new Rect({ stroke: '#FF4B4B', strokeWidth: 3, fill: 'rgba(255,75,75,0.15)', hittable: false, opacity: 0 });
  app.sky.add(flash);
  app.tree.on(RenderEvent.END, (e: RenderEvent) => {
    const b = e.renderBounds;
    if (b) flash.set({ x: b.x, y: b.y, width: b.width, height: b.height, opacity: 1 });
  });
  const say = label(stage, 'usePartRender: true', true);
  const setPart = (on: boolean): void => {
    app.tree.config.usePartRender = on; // takes effect while running
    say(`usePartRender: ${on}`);
  };

  stage.loop((dt, t) => {
    ball.set({ x: stage.width / 2 + Math.cos(t * 1.6) * stage.width * 0.3, y: stage.height / 2 + Math.sin(t * 2.1) * stage.height * 0.3 });
    flash.opacity = Math.max(0, (flash.opacity ?? 0) - dt * 2.5);
  });

  if (stage.preview) {
    let on = true;
    stage.every(2500, () => setPart((on = !on)));
  } else checkbox(stage.bar!, 'usePartRender', true, setPart);

  return stage.dispose;
};

export default mount;
