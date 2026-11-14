// Input source rays: intersectsRay picking and select, real and simulated
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape } from '../../shared/xr.ts';

/** What the picking code needs from an input source; XrInputSource and the simulation both fit. */
interface Pointer {
  getOrigin(): pc.Vec3;
  getDirection(): pc.Vec3;
  selecting: boolean;
  colour: pc.Color;
  hit: Target | null;
}
interface Target {
  entity: pc.Entity;
  material: pc.StandardMaterial;
  on: boolean;
}

const BASE = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'];

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { interactive: false, autoRotate: 0, yaw: 0, pitch: -8 });
  const { app, camera } = scene;
  const canvas = scene.stage.canvas;

  const targets: Target[] = BASE.map((hex, i) => {
    const material = xrMaterial(hex);
    const entity = xrShape(app.root, 'box', material, [(i - 2) * 0.75, 1.2 + (i % 2) * 0.25, -2.5], 0.5);
    return { entity, material, on: false };
  });
  const paint = (t: Target): void => {
    t.material.emissive = t.on ? new pc.Color(0.9, 0.9, 0.9) : new pc.Color(0, 0, 0);
    t.material.update();
  };
  const toggle = (t: Target | null): void => {
    if (!t) return;
    t.on = !t.on;
    paint(t);
  };

  // Simulated controllers: plain objects with the same getOrigin/getDirection as XrInputSource.
  const sim = (x: number, colour: pc.Color): Pointer & { origin: pc.Vec3; dir: pc.Vec3 } => {
    const origin = new pc.Vec3(x, 1.0, -0.4);
    const dir = new pc.Vec3(0, 0, -1);
    return { origin, dir, getOrigin: () => origin, getDirection: () => dir, selecting: false, colour, hit: null };
  };
  const left = sim(-0.3, new pc.Color(0.4, 0.8, 1));
  const right = sim(0.3, new pc.Color(1, 0.7, 0.3));
  const pointers = new Map<unknown, Pointer>([['left', left], ['right', right]]);

  // The full view aims the right controller at the mouse; click is its primary action.
  const mouse = new pc.Vec2(0.5, 0.45);
  const ac = new AbortController();
  if (!ctx.preview) {
    canvas.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    }, { signal: ac.signal });
    canvas.addEventListener('pointerdown', () => {
      right.selecting = true;
      toggle(right.hit);
    }, { signal: ac.signal });
    window.addEventListener('pointerup', () => (right.selecting = false), { signal: ac.signal });
  }

  const ray = new pc.Ray();
  const point = new pc.Vec3();
  const end = new pc.Vec3();
  const near = new pc.Vec3();
  const far = new pc.Vec3();
  let t = 0;
  let nextSelect = 1.2;
  app.on('update', (dt: number) => {
    t += dt;
    const aim = new pc.Vec3();
    if (ctx.preview) {
      left.dir.set(Math.sin(t * 0.9 + 2) * 0.6, -0.1 + Math.sin(t * 0.7) * 0.1, -1).normalize();
      right.dir.set(Math.sin(t * 0.8) * 0.6, -0.1 + Math.sin(t * 1.1) * 0.1, -1).normalize();
      if (t > nextSelect) {
        nextSelect += 1.4;
        toggle(right.hit);
      }
    } else if (!scene.app.xr?.active) {
      // Mouse to a point on the plane z = -2.5, then from the controller to that point.
      const cam = camera.camera!;
      cam.screenToWorld(mouse.x * canvas.clientWidth, mouse.y * canvas.clientHeight, cam.nearClip, near);
      cam.screenToWorld(mouse.x * canvas.clientWidth, mouse.y * canvas.clientHeight, cam.farClip, far);
      aim.sub2(far, near).normalize();
      const s = (-2.5 - near.z) / aim.z;
      point.copy(aim).mulScalar(s).add(near);
      right.dir.sub2(point, right.origin).normalize();
      left.dir.set(-0.15, -0.05, -1).normalize();
    }
    for (const p of pointers.values()) {
      ray.set(p.getOrigin(), p.getDirection());
      let best = Infinity;
      p.hit = null;
      for (const target of targets) {
        const instance = target.entity.render?.meshInstances[0];
        if (instance?.aabb.intersectsRay(ray, point)) {
          const d = point.distance(ray.origin);
          if (d < best) {
            best = d;
            p.hit = target;
          }
        }
      }
      const length = p.hit ? best : 4;
      end.copy(p.getDirection()).mulScalar(length).add(p.getOrigin());
      const colour = p.selecting ? new pc.Color(1, 1, 1) : p.colour;
      app.drawLine(p.getOrigin(), end, colour);
    }
  });

  // The real path: an entity per input source as it is added, removed with it.
  const grips = new Map<unknown, pc.Entity>();
  const onAdd = (source: pc.XrInputSource): void => {
    const grip = xrShape(app.root, 'box', xrMaterial(source.handedness === 'left' ? '#4ab3e8' : '#f2a14e'), [0, 0, 0], [0.05, 0.05, 0.12]);
    grips.set(source, grip);
    const pointer: Pointer = { getOrigin: () => source.getOrigin(), getDirection: () => source.getDirection(), selecting: false, colour: new pc.Color(1, 1, 1), hit: null };
    pointers.set(source, pointer);
    const down = (): void => void (pointer.selecting = true);
    const up = (): void => void (pointer.selecting = false);
    source.on('selectstart', down);
    source.on('selectend', up);
    source.on('select', () => toggle(pointer.hit));
    source.once('remove', () => {
      pointers.delete(source);
      grips.get(source)?.destroy();
      grips.delete(source);
    });
  };
  app.xr?.input.on('add', onAdd);
  app.on('update', () => {
    for (const [source, grip] of grips) {
      const s = source as pc.XrInputSource;
      const p = s.getPosition();
      if (s.grip && p) grip.setPosition(p), grip.setRotation(s.getRotation()!);
      else grip.setPosition(s.getOrigin());
    }
  });

  if (ctx.preview) return () => scene.dispose();
  const panel = createPanel(el);
  panel.readout('Move the mouse to aim the right simulated controller, click to select. A real session replaces both with its own input sources.');
  const entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_VR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter VR' }]);
  return () => {
    ac.abort();
    app.xr?.input.off('add', onAdd);
    entry.dispose();
    scene.dispose();
  };
};

export default mount;
