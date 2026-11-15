// XRManager.origin: the camera ends up at origin + the tracked pose
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { arrow, PALETTE, unlit, v3 } from '../../shared/core-kit.ts';
import { add, blinn, tick } from '../../shared/gfx-kit.ts';
import { room, xrWorld } from '../../shared/xr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { camera: [4, 3.5, 7], target: [0, 1, 0], hint: 'No headset here: the pose is simulated, the origin is real.' });
  room(w);
  const { engine } = w.stage;
  // The XR camera entity lives under the origin, as the docs require.
  const head = w.origin.createChild('camera');
  add(head, PrimitiveMesh.createCuboid(engine, 0.32, 0.2, 0.22), blinn(engine, [...PALETTE.cyan]), [0, 0, 0], 'headset');
  add(head, PrimitiveMesh.createCuboid(engine, 0.1, 0.1, 0.3), blinn(engine, [...PALETTE.red]), [0, 0, -0.25], 'nose');
  const axes = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)].map((a, i) => ({ a, arrow: arrow(w.root, unlit(engine, [PALETTE.red, PALETTE.green, PALETTE.blue][i]!), 0.04) }));
  const out = panel(w.stage, 'tl');
  const off = new Vector3(0, 0, 0);
  let moving = w.stage.preview;
  tick(w.root, (_dt, t) => {
    if (moving) off.set(Math.sin(t * 0.3) * 1.5, 0, Math.cos(t * 0.3) * 0.8);
    w.origin.transform.setPosition(off.x, off.y, off.z);
    const pose = new Vector3(Math.sin(t * 0.9) * 0.8, 1.6 + Math.sin(t * 1.8) * 0.12, Math.sin(t * 0.45) * 0.8);
    head.transform.setPosition(pose.x, pose.y, pose.z);
    head.transform.setRotation(0, Math.sin(t * 0.9) * 35, 0);
    for (const { a, arrow: ar } of axes) ar.set(w.origin.transform.worldPosition, a.clone().scale(0.8));
    out.text(`origin ${v3(w.origin.transform.worldPosition)}\npose   ${v3(pose)}\ncamera ${v3(head.transform.worldPosition)}`);
  });
  if (!w.stage.preview) {
    for (const axis of ['x', 'y', 'z'] as const) slider(w.stage.bar, `origin.${axis}`, -3, 3, 0.1, 0, (v) => {
      moving = false;
      off[axis] = v;
    });
  }
  return w.stage.dispose;
};

export default mount;
