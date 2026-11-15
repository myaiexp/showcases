// worldToViewportPoint, viewportToScreenPoint, screenToViewportPoint and viewportToWorldPoint chained
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 3, 8], hint: 'Viewport space is 0..1 across the canvas; screen space is canvas pixels; z is the distance from the camera.' });
  const say = caption(stage);
  floor(root, engine, -1);
  const ball = add(root, PrimitiveMesh.createSphere(engine, 0.5), pbr(engine, [0.35, 0.8, 0.55], 0, 0.4)).entity;
  const viewport = new Vector3();
  const screen = new Vector3();
  const backViewport = new Vector3();
  const back = new Vector3();
  tick(ball, (_dt, t) => {
    ball.transform.setPosition(Math.sin(t) * 3, Math.sin(t * 1.4) * 0.8, Math.cos(t * 0.7) * 2.5);
    const world = ball.transform.worldPosition;
    camera.worldToViewportPoint(world, viewport);
    camera.viewportToScreenPoint(viewport, screen);
    camera.screenToViewportPoint(screen, backViewport);
    camera.viewportToWorldPoint(backViewport, back);
    const f = (v: Vector3): string => `${v.x.toFixed(2)}, ${v.y.toFixed(2)}, ${v.z.toFixed(2)}`;
    say(`world     ${f(world)}\nviewport  ${f(viewport)}\nscreen    ${f(screen)}\nback      ${f(back)}`);
  });
  return stage.dispose;
};

export default mount;
