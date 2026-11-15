// Vehicle: a rigid body, a Vehicle and four Wheel nodes, driven by throttle and steering
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { BoxShape, Collider, Mesh, NodePhysics, RigidBody, Vehicle, Wheel, getInput } from '@zephyr3d/scene';
import { button, select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { cast, cylinderShape, dynBox, floor, launch, mat, ORANGE, RED, SLATE, startPhysics, staticBox } from '../../shared/phys-kit.ts';
import { autoDrive, chaseCamera, type Car, type CarWheel } from '../../shared/phys-car.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 40, top: 14 });
  floor(kit, 80, 80);
  const readout = stage.readout();
  // Ramps and a row of crates to drive into
  for (const [x, z, a] of [[0, 18, -0.18], [-14, -8, -0.25]] as const) {
    staticBox(kit, new Vector3(4, 0.4, 8), new Vector3(x, 0.6, z), SLATE, Quaternion.fromAxisAngle(Vector3.axisPX(), a));
  }
  for (let i = 0; i < 6; i++) dynBox(kit, 0.8, new Vector3(4, 0.4 + Math.floor(i / 3) * 0.8, -2 + (i % 3) * 0.9), ORANGE, 20);

  // The car body: a dynamic rigid body with a box collider, and the Vehicle that drives it.
  // Its front is +Z (vehicle.forward) and its up +Y.
  const carNode = new Mesh(kit.scene, new BoxShape({ size: 1.8, sizeY: 0.6, sizeZ: 4 }), mat(RED));
  carNode.position.setXYZ(0, 1.2, 0);
  cast(kit, carNode);
  const body = new RigidBody();
  body.mass = 1200;
  body.linearDamping = 0.1;
  const shell = new Collider();
  shell.size = new Vector3(1.8, 0.6, 4);
  const vehicle = new Vehicle();
  vehicle.maxEngineForce = 6000;
  vehicle.maxSteerAngle = 30;
  carNode.physics = new NodePhysics({ body, colliders: [shell], vehicle });

  // Each wheel is a child node placed where the wheel's centre is with the suspension at
  // rest; the vehicle moves it with the suspension, steering and roll.
  const tyre = cylinderShape(0.4, 0.3);
  const rubber = mat([0.08, 0.08, 0.08]);
  const wheels: CarWheel[] = [];
  for (const front of [true, false]) {
    for (const side of [-1, 1]) {
      const node = new Mesh(kit.scene, tyre, rubber);
      node.parent = carNode;
      node.position.setXYZ(side * 1.05, -0.4, front ? 1.3 : -1.3);
      node.rotation = Quaternion.fromAxisAngle(Vector3.axisPZ(), Math.PI / 2);
      cast(kit, node);
      const wheel = new Wheel();
      wheel.radius = 0.4;
      wheel.suspensionRestLength = 0.3;
      wheel.steer = front ? 1 : 0;
      wheel.drive = 0.25;
      wheel.handbrake = front ? 0 : 1;
      node.physics = new NodePhysics({ wheel });
      wheels.push({ wheel, node, front, side });
    }
  }
  const car: Car = { node: carNode, body, vehicle, wheels };

  // Inputs stay until changed and apply at every simulation step
  const keys = new Set<string>();
  if (stage.bar) {
    getInput().use((ev, type) => {
      if (type === 'keydown') keys.add(ev.code);
      else if (type === 'keyup') keys.delete(ev.code);
      else return false;
      return true;
    });
  }
  const follow = chaseCamera(kit, carNode);
  kit.myApp.on('tick', (dtMs: number) => {
    if (stage.preview) autoDrive(car);
    else {
      const forward = keys.has('KeyW') || keys.has('ArrowUp');
      const back = keys.has('KeyS') || keys.has('ArrowDown');
      // Holding back at a standstill reverses; while moving it brakes
      const reversing = back && vehicle.speed < 0.5;
      vehicle.throttle = forward ? 1 : reversing ? -0.5 : 0;
      vehicle.brake = back && !reversing ? 1 : 0;
      vehicle.handbrake = keys.has('Space');
      // Positive steering turns left
      vehicle.steering = (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0) - (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0);
    }
    follow(dtMs);
    const text = `${(vehicle.speed * 3.6).toFixed(0)} km/h   wheels ${wheels.map((w) => (w.wheel.inContact ? '●' : '○')).join(' ')}`;
    stage.caption(text);
    if (readout) readout.textContent = text + '   (WASD / arrows, space: handbrake)';
  });

  if (stage.bar) {
    select(stage.bar, 'Drive', ['all', 'front', 'rear'] as const, 'all', (mode) => {
      for (const { wheel, front } of wheels) wheel.drive = mode === 'all' ? 0.25 : (mode === 'front') === front ? 0.5 : 0;
    });
    button(stage.bar, 'Reset car', () => {
      // Moving the node teleports the body; clear its motion too
      carNode.position.setXYZ(0, 1.2, 0);
      carNode.rotation = Quaternion.identity();
      body.setLinearVelocity(Vector3.zero());
      body.setAngularVelocity(Vector3.zero());
    });
  }
  launch(kit);
});
