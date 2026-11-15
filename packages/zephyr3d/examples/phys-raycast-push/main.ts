// Physics raycast: ask the world what a ray hits, then push it with an impulse
import { Vector3 } from '@zephyr3d/base';
import { getInput } from '@zephyr3d/scene';
import type { Mesh } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { beam, BLUE, dynBox, floor, launch, marker, orbit, ORANGE, respawn, SLATE, startPhysics, staticBox, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 16, 14);
  const readout = stage.readout();
  const say = (text: string): void => {
    stage.caption(text);
    if (readout) readout.textContent = text;
  };
  say(stage.preview ? 'world.raycast, then applyImpulse' : 'click a box to push it; the grey pillar is static');

  const pillar = staticBox(kit, new Vector3(0.8, 2.4, 0.8), new Vector3(3.5, 1.2, -1), SLATE);
  pillar.name = 'pillar';

  const boxes: Mesh[] = [];
  respawn(
    kit,
    () => {
      boxes.length = 0;
      for (let i = 0; i < 9; i++) {
        const box = dynBox(kit, 0.9, new Vector3(-2.4 + (i % 3) * 1.5, 0.45, -2.5 + Math.floor(i / 3) * 1.5), i % 2 ? BLUE : ORANGE, 2);
        box.name = `box ${i + 1}`;
        boxes.push(box);
      }
      return [...boxes];
    },
    10000,
    'Reset',
  );

  const laser = beam(kit, YELLOW, 0.04);
  laser.show(false);
  const spot = marker(kit, 0.1, YELLOW);
  spot.showState = 'hidden';
  let hideAt = 0;
  let now = 0;
  kit.myApp.on('tick', (dtMs: number) => {
    now += dtMs;
    if (now > hideAt) {
      laser.show(false);
      spot.showState = 'hidden';
    }
  });

  // The query: the nearest collider along the ray, or null
  const push = (origin: Vector3, direction: Vector3): void => {
    const hit = kit.world.raycast(origin, direction, 100);
    if (!hit) return;
    laser.set(origin, hit.point);
    laser.show(true);
    spot.position.set(hit.point);
    spot.showState = 'visible';
    hideAt = now + 350;
    if (hit.body?.motionType === 'dynamic') {
      hit.body.applyImpulse(Vector3.scale(direction, 14));
      say(`pushed ${hit.node.name} at ${hit.distance.toFixed(2)} m`);
    } else {
      say(`${hit.node.name || 'floor'} cannot be pushed (distance ${hit.distance.toFixed(2)} m)`);
    }
  };

  const camera = orbit(kit, new Vector3(0, 5.5, 10), new Vector3(0, 0.8, -1));
  if (stage.bar) {
    let press: { x: number; y: number } | null = null;
    getInput().use((ev, type) => {
      if (type === 'pointerdown' && ev.button === 0) press = { x: ev.offsetX, y: ev.offsetY };
      else if (type === 'pointerup' && ev.button === 0 && press) {
        const moved = Math.hypot(ev.offsetX - press.x, ev.offsetY - press.y);
        press = null;
        if (moved < 4) {
          const ray = camera.constructRay(ev.offsetX, ev.offsetY);
          push(ray.origin, ray.direction);
        }
      }
      return false;
    });
  } else {
    const eye = new Vector3(0, 3.5, 9);
    stage.every(1300, (i) => {
      const targets = boxes.length ? [...boxes.map((b) => b.position), pillar.position] : [];
      const t = targets[(i * 4) % targets.length];
      if (t) push(eye, Vector3.sub(new Vector3(t.x, t.y + 0.1, t.z), eye, new Vector3()).inplaceNormalize());
    });
  }

  launch(kit);
});
