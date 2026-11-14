// raycastFirst from a sweeping scanner, and from the camera through the pointer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, addMarker, createPhysicsScene, every, PALETTE, respawn, tint, type ShapeKind } from '../../shared/physics.ts';

const FIELD: { shape: ShapeKind; at: [number, number, number]; size: number | [number, number, number] }[] = [
  { shape: 'box', at: [-2, 1.5, -3.5], size: [1.4, 3, 1.4] },
  { shape: 'cylinder', at: [1, 1.5, 3], size: 1.6 },
  { shape: 'box', at: [3, 1, -1], size: [2, 2, 2] },
  { shape: 'capsule', at: [-1, 1, 2], size: 0.9 },
  { shape: 'cone', at: [5, 0.75, 4], size: 1.5 },
  { shape: 'box', at: [6, 1.25, -4], size: [1, 2.5, 3] },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 18, pitch: -35, target: [1, 1, 0], floor: 18, autoRotate: 0, yaw: 0 });
  const { app, physics, camera, stage } = scene;
  let pointer: { x: number; y: number } | null = null;
  let readout: HTMLElement | null = null;

  // The colour each entity goes back to when the ray leaves it.
  const base = new Map<pc.Entity, string>([[scene.floor!, '#2f3442']]);
  FIELD.forEach((f, i) => {
    const colour = PALETTE[i % PALETTE.length]!;
    base.set(addBody(app, { type: 'static', name: `${f.shape} ${i}`, shape: f.shape, size: f.size, position: f.at, colour }), colour);
  });
  const balls = [0, 1].map((i) => addBody(app, { shape: 'sphere', name: `ball ${i}`, size: 1.1, colour: '#9fb0d0', body: { restitution: 0.4 } }));
  balls.forEach((b) => base.set(b, '#9fb0d0'));
  const dropBalls = (): void => balls.forEach((b, i) => respawn(b, [-1 + i * 3, 5 + i * 2, 0]));
  dropBalls();
  every(app, 6, dropBalls);

  const origin = new pc.Vec3(-8, 1.6, 0);
  const emitter = addMarker(app, '#ffd24a', 0.5, 'box');
  emitter.setPosition(origin);
  const dot = addMarker(app, '#ff4d4d', 0.35);
  const from = new pc.Vec3();
  const to = new pc.Vec3();
  let highlighted: pc.Entity | null = null;
  let time = 0;
  const tip = new pc.Vec3();
  app.on('update', (dt: number) => {
    time += dt;
    if (pointer) {
      // The docs' picking recipe: camera position to the pointer on the far clip plane.
      from.copy(camera.getPosition());
      camera.camera!.screenToWorld(pointer.x, pointer.y, camera.camera!.farClip, to);
    } else {
      from.copy(origin);
      const a = Math.sin(time * 0.6) * 0.75;
      to.set(origin.x + Math.cos(a) * 30, origin.y - 0.25 + Math.sin(time * 1.3) * 0.2, Math.sin(a) * 30);
    }
    const hit = physics.raycastFirst(from, to);
    if (highlighted && highlighted !== hit?.entity) {
      tint(highlighted, base.get(highlighted) ?? '#ffffff');
      highlighted = null;
    }
    dot.enabled = !!hit;
    if (hit) {
      dot.setPosition(hit.point);
      tint(hit.entity, '#ffffff', '#6b5a1f');
      highlighted = hit.entity;
      tip.copy(hit.normal).mulScalar(1.2).add(hit.point);
      app.drawLine(from, hit.point, pc.Color.RED, false);
      app.drawLine(hit.point, tip, pc.Color.YELLOW, false);
      if (readout) readout.textContent = `${hit.entity.name}, ${(hit.hitFraction * 100).toFixed(1)}% along the ray, normal ${hit.normal.x.toFixed(1)} ${hit.normal.y.toFixed(1)} ${hit.normal.z.toFixed(1)}`;
    } else {
      app.drawLine(from, to, pc.Color.GRAY, false);
      if (readout) readout.textContent = 'raycastFirst returned null';
    }
  });

  const ac = new AbortController();
  if (!ctx.preview) {
    const canvas = stage.canvas;
    canvas.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    }, { signal: ac.signal });
    canvas.addEventListener('pointerleave', () => (pointer = null), { signal: ac.signal });
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    panel.readout('Move the pointer over the scene to pick with a ray from the camera; leave it to return to the scanner.');
  }

  return () => {
    ac.abort();
    scene.dispose();
  };
};

export default mount;
