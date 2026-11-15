// Two cameras on one scene, each drawing into its own viewport rectangle of the canvas
import { Camera, CameraClearFlags, PrimitiveMesh, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Viewport values are fractions of the canvas (x, y from the bottom-left, then width, height).' });
  const { engine, root } = stage;
  const main = lit(stage, [0, 2, 7]);
  main.viewport = new Vector4(0, 0, 0.62, 1);
  const top = root.createChild('top camera');
  top.transform.setPosition(0, 9, 0.01);
  top.transform.lookAt(top.transform.position.clone().set(0, 0, 0));
  const topCamera = top.addComponent(Camera);
  topCamera.viewport = new Vector4(0.64, 0.52, 0.34, 0.46);
  topCamera.clearFlags = CameraClearFlags.All;
  topCamera.priority = 1;
  const ring = solid(root, PrimitiveMesh.createTorus(engine, 1.4, 0.3, 16, 32), phong(engine, PALETTE.amber));
  const ball = solid(root, PrimitiveMesh.createSphere(engine, 0.5, 20), phong(engine, PALETTE.cyan));
  const info = panel(stage);
  if (!stage.preview) {
    slider(stage.bar, 'main width', 0.3, 1, 0.01, 0.62, (v) => (main.viewport = new Vector4(0, 0, v, 1)));
    slider(stage.bar, 'inset x', 0, 0.7, 0.01, 0.64, (v) => (topCamera.viewport = new Vector4(v, topCamera.viewport.y, topCamera.viewport.z, topCamera.viewport.w)));
  }
  tick(root, (dt, t) => {
    ring.transform.rotate(40 * dt, 0, 20 * dt);
    ball.transform.setPosition(Math.cos(t) * 2.4, 0, Math.sin(t) * 2.4);
    const a = main.viewport;
    const b = topCamera.viewport;
    info.text(`main viewport  ${a.x.toFixed(2)}, ${a.y.toFixed(2)}, ${a.z.toFixed(2)}, ${a.w.toFixed(2)}\ntop viewport   ${b.x.toFixed(2)}, ${b.y.toFixed(2)}, ${b.z.toFixed(2)}, ${b.w.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
