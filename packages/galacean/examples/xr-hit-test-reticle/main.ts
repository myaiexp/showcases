// A reticle from XRHitTest when available, from a floor raycast otherwise
import { HitResult, PrimitiveMesh, Ray, StaticCollider, Vector2, Vector3 } from '@galacean/engine';
import { TrackableType, XRHitTest } from '@galacean/engine-xr';
import type { Mount } from '@/types.ts';
import { boxShape } from '../../shared/core-kit.ts';
import { ghost, panel } from '../../shared/core-ui.ts';
import { add, tick, unlit } from '../../shared/gfx-kit.ts';
import { room, xrWorld } from '../../shared/xr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await xrWorld(el, ctx, { physics: true, hint: 'Move the pointer over the floor.' });
  room(w);
  const { engine } = w.stage;
  const floor = w.root.createChild('hit floor');
  floor.transform.setPosition(0, -0.05, 0);
  floor.addComponent(StaticCollider).addShape(boxShape(12, 0.1, 12));
  const ring = add(w.root, PrimitiveMesh.createTorus(engine, 0.25, 0.03, 32, 8), unlit(engine, [1, 0.85, 0.3]), [0, 0.02, 0], 'reticle').entity;
  ring.transform.setRotation(90, 0, 0);
  const out = panel(w.stage, 'tl');
  const cursor = w.stage.preview ? ghost(w.stage) : undefined;
  const supported = w.xr.isSupportedFeature(XRHitTest) === true;
  const ray = new Ray();
  const hit = new HitResult();
  const at = new Vector2();
  const probe = new Vector3();
  const screen = new Vector3();
  let pointer: Vector2 | undefined;
  w.stage.canvas.addEventListener('pointermove', (e) => {
    const r = w.stage.canvas.getBoundingClientRect();
    pointer = new Vector2(((e.clientX - r.left) * w.stage.canvas.width) / r.width, ((e.clientY - r.top) * w.stage.canvas.height) / r.height);
  });
  tick(w.root, (_dt, t) => {
    let from = pointer;
    if (w.stage.preview) {
      probe.set(Math.sin(t * 0.6) * 2.5, 0, Math.cos(t * 0.45) * 1.5 - 0.5);
      w.camera.worldToScreenPoint(probe, screen);
      from = at.set(screen.x, screen.y);
      const ratio = w.stage.canvas.width / Math.max(1, w.stage.canvas.clientWidth);
      cursor!.move(screen.x / ratio / w.stage.canvas.clientWidth, screen.y / ratio / w.stage.canvas.clientHeight);
    }
    if (!from) return;
    w.camera.screenPointToRay(from, ray);
    const found = w.stage.scene.physics.raycast(ray, 50, hit);
    ring.isActive = found;
    if (found) ring.transform.setPosition(hit.point.x, 0.03, hit.point.z);
    out.text(`XRHitTest supported: ${supported}\npath: ${supported ? 'xrManager.getFeature(XRHitTest).screenHitTest(x, y, TrackableType.Plane)' : 'physics raycast on a stand-in floor'}\nTrackableType.Plane = ${TrackableType.Plane}`);
  });
  return w.stage.dispose;
};

export default mount;
