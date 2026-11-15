// One point in world, viewport and screen space
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Move the pointer over the canvas: screenToWorldPoint places the cyan ball where the pointer is, at the chosen distance.' });
  const { engine, root, canvas } = stage;
  const camera = lit(stage, [0, 1.5, 9], [0, 0, 0]);
  const tag = labels(stage, camera);
  const ball = solid(root, PrimitiveMesh.createSphere(engine, 0.35, 20), phong(engine, PALETTE.amber));
  const probe = solid(root, PrimitiveMesh.createSphere(engine, 0.2, 16), unlit(engine, PALETTE.cyan));
  probe.isActive = false;
  const label = tag.add('', '#ffd36b');
  const info = panel(stage);
  let depth = 9;
  const pointer = { x: -1, y: -1 };
  if (!stage.preview) {
    slider(stage.bar, 'depth (z, world units from camera)', 2, 20, 0.5, depth, (v) => (depth = v));
    const move = (e: PointerEvent): void => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    canvas.addEventListener('pointermove', move);
    stage.own(() => canvas.removeEventListener('pointermove', move));
  }
  const world = new Vector3();
  const view = new Vector3();
  const screen = new Vector3();
  const back = new Vector3();
  tick(root, (_dt, t) => {
    ball.transform.setPosition(Math.cos(t * 0.8) * 3.4, Math.sin(t * 1.3) * 1.5, Math.sin(t * 0.8) * 3);
    world.copyFrom(ball.transform.worldPosition);
    camera.worldToViewportPoint(world, view);
    camera.worldToScreenPoint(world, screen);
    label.at(world, `screen ${screen.x.toFixed(0)}, ${screen.y.toFixed(0)}`);
    let line = '';
    if (pointer.x >= 0) {
      const ratio = canvas.width / Math.max(1, canvas.clientWidth);
      camera.screenToWorldPoint(new Vector3(pointer.x * ratio, pointer.y * ratio, depth), back);
      probe.isActive = true;
      probe.transform.setPosition(back.x, back.y, back.z);
      line = `\nscreenToWorldPoint -> ${back.x.toFixed(2)}, ${back.y.toFixed(2)}, ${back.z.toFixed(2)}`;
    }
    info.text(`world    ${world.x.toFixed(2)}, ${world.y.toFixed(2)}, ${world.z.toFixed(2)}\nviewport ${view.x.toFixed(3)}, ${view.y.toFixed(3)}\nscreen   ${screen.x.toFixed(0)}, ${screen.y.toFixed(0)} px${line}`);
  });
  return stage.dispose;
};

export default mount;
