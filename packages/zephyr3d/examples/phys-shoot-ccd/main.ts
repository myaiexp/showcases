// Projectiles: setLinearVelocity, ccd and the impulse of a collision event
import { Vector3 } from '@zephyr3d/base';
import { Collider, Mesh, NodePhysics, RigidBody, SphereShape, getInput } from '@zephyr3d/scene';
import type { Mesh as MeshType } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, cast, discard, dynBox, floor, launch, mat, orbit, ORANGE, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 12 });
  floor(kit, 24, 30);
  const readout = stage.readout();
  stage.caption('click to shoot: ccd on');

  let speed = 28;
  let ccd = true;
  const balls: MeshType[] = [];
  const say = (text: string): void => {
    stage.caption(text);
    if (readout) readout.textContent = text;
  };

  respawn(
    kit,
    () => {
      const crates: MeshType[] = [];
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 5; x++) {
          const crate = dynBox(kit, 0.8, new Vector3(-1.6 + x * 0.82, 0.4 + y * 0.81, -3), (x + y) % 2 ? BLUE : ORANGE);
          crate.name = `crate ${x},${y}`;
          // Events come on the physics data; a hard knock has a big impulse, resting contact a small one
          crate.physics!.on('collisionenter', (ev) => {
            if (ev.impulse > 5 && ev.otherNode?.name === 'ball') say(`${crate.name} hit, impulse ${ev.impulse.toFixed(1)} N·s`);
          });
          crates.push(crate);
        }
      }
      return crates;
    },
    9000,
    'Rebuild wall',
  );

  const ballShape = new SphereShape({ radius: 0.12 });
  const ballMaterial = mat(YELLOW);
  const shoot = (origin: Vector3, direction: Vector3): void => {
    const ball = new Mesh(kit.scene, ballShape, ballMaterial);
    ball.name = 'ball';
    ball.position.set(origin);
    const body = new RigidBody();
    body.mass = 1;
    // Fast and small: ccd stops it passing through a crate between two steps
    body.ccd = ccd;
    body.setLinearVelocity(Vector3.scale(direction, speed));
    const collider = new Collider();
    collider.shape = 'sphere';
    collider.radius = 0.12;
    ball.physics = new NodePhysics({ body, colliders: [collider] });
    cast(kit, ball);
    balls.push(ball);
    if (balls.length > 12) discard(kit, balls.shift()!);
  };

  const camera = orbit(kit, new Vector3(0, 2.5, 8), new Vector3(0, 1.4, -3));
  if (stage.bar) {
    toggle(stage.bar, 'ccd', true, (v) => (ccd = v));
    slider(stage.bar, 'Speed (m/s)', [10, 70, 1], speed, (v) => (speed = v));
    // A click that does not move shoots; a drag still orbits
    let press: { x: number; y: number } | null = null;
    getInput().use((ev, type) => {
      if (type === 'pointerdown' && ev.button === 0) press = { x: ev.offsetX, y: ev.offsetY };
      else if (type === 'pointerup' && ev.button === 0 && press) {
        const moved = Math.hypot(ev.offsetX - press.x, ev.offsetY - press.y);
        press = null;
        if (moved < 4) {
          const ray = camera.constructRay(ev.offsetX, ev.offsetY);
          shoot(Vector3.add(ray.origin, ray.direction), ray.direction);
        }
      }
      return false;
    });
  } else {
    // A shot every 1.4 s aimed at a different crate
    stage.every(1400, (i) => {
      const target = new Vector3(-1.4 + ((i * 7) % 5) * 0.8, 0.5 + ((i * 3) % 4) * 0.8, -3);
      const from = new Vector3(0, 1.6, 6);
      shoot(from, Vector3.sub(target, from, new Vector3()).inplaceNormalize());
    });
  }

  launch(kit);
});
