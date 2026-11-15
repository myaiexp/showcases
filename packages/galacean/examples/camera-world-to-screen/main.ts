// worldToScreenPoint turns a 3D position into canvas pixels for a DOM label
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, floor, pbr, tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 3, 8], hint: 'The label is a DOM element; its position comes from camera.worldToScreenPoint.' });
  floor(root, engine, -1);
  const ball = add(root, PrimitiveMesh.createSphere(engine, 0.6), pbr(engine, [0.95, 0.5, 0.25], 0, 0.4)).entity;
  const label = document.createElement('div');
  label.style.cssText = 'position:absolute;transform:translate(-50%,-140%);padding:2px 8px;border-radius:10px;background:#f4a259;color:#14110c;font:600 12px ui-monospace,monospace;pointer-events:none;white-space:pre';
  const host = stage.canvas.parentElement!;
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  host.append(label);
  stage.own(() => label.remove());
  const screen = new Vector3();
  tick(ball, (_dt, t) => {
    ball.transform.setPosition(Math.sin(t * 0.9) * 3, Math.sin(t * 1.7) * 0.6, Math.cos(t * 0.9) * 2);
    camera.worldToScreenPoint(ball.transform.worldPosition, screen);
    const k = stage.canvas.clientWidth / stage.canvas.width;
    label.style.left = `${screen.x * k + stage.canvas.offsetLeft}px`;
    label.style.top = `${screen.y * k + stage.canvas.offsetTop}px`;
    label.textContent = `screen ${Math.round(screen.x)}, ${Math.round(screen.y)}`;
  });
  return stage.dispose;
};

export default mount;
