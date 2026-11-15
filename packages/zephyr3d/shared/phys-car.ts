// A simple four-wheel car and an autopilot for the vehicle examples
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { BoxShape, Collider, Mesh, NodePhysics, PerspectiveCamera, RigidBody, Vehicle, Wheel } from '@zephyr3d/scene';
import { cast, cylinderShape, mat, RED, type Kit, type Rgb } from './phys-kit.ts';

export interface CarWheel {
  wheel: Wheel;
  node: Mesh;
  front: boolean;
  /** -1 left, 1 right (in the car's own frame, front +Z). */
  side: number;
}

export interface Car {
  node: Mesh;
  body: RigidBody;
  vehicle: Vehicle;
  wheels: CarWheel[];
}

export interface CarOptions {
  position: Vector3;
  /** Turn the car about Y, radians (0: facing +Z). */
  heading?: number;
  color?: Rgb;
  /** Called for each wheel once built, to set its suspension and tyre properties. */
  tune?: (wheel: Wheel, front: boolean) => void;
}

/** The body is a dynamic box with a Vehicle; each wheel is a child node with a Wheel (front +Z, up +Y). */
export function buildCar(kit: Kit, opts: CarOptions): Car {
  const node = new Mesh(kit.scene, new BoxShape({ size: 1.8, sizeY: 0.6, sizeZ: 4 }), mat(opts.color ?? RED));
  node.position.set(opts.position);
  node.rotation = Quaternion.fromAxisAngle(Vector3.axisPY(), opts.heading ?? 0);
  cast(kit, node);
  const body = new RigidBody();
  body.mass = 1200;
  body.linearDamping = 0.1; // no rolling resistance otherwise
  const shell = new Collider();
  shell.size = new Vector3(1.8, 0.6, 4);
  const vehicle = new Vehicle();
  vehicle.maxEngineForce = 6000;
  vehicle.maxBrakeForce = 60;
  vehicle.maxSteerAngle = 30;
  node.physics = new NodePhysics({ body, colliders: [shell], vehicle });

  const tyre = cylinderShape(0.4, 0.3);
  const rubber = mat([0.08, 0.08, 0.08]);
  const wheels: CarWheel[] = [];
  for (const front of [true, false]) {
    for (const side of [-1, 1]) {
      const w = new Mesh(kit.scene, tyre, rubber);
      w.parent = node;
      // Where the wheel's centre is with the suspension at rest; a cylinder lies on its side so its axis is the axle
      w.position.setXYZ(side * 1.05, -0.4, front ? 1.3 : -1.3);
      w.rotation = Quaternion.fromAxisAngle(Vector3.axisPZ(), Math.PI / 2);
      cast(kit, w);
      const wheel = new Wheel();
      wheel.radius = 0.4;
      wheel.suspensionRestLength = 0.3;
      wheel.steer = front ? 1 : 0;
      wheel.handbrake = front ? 0 : 1;
      wheel.drive = 0.25;
      opts.tune?.(wheel, front);
      w.physics = new NodePhysics({ wheel });
      wheels.push({ wheel, node: w, front, side });
    }
  }
  return { node, body, vehicle, wheels };
}

/** Wheel shares of the engine force: 0.5 on each driven pair, or 0.25 on all four. */
export function setDrive(car: Car, mode: 'front' | 'rear' | 'all'): void {
  for (const { wheel, front } of car.wheels) wheel.drive = mode === 'all' ? 0.25 : (mode === 'front') === front ? 0.5 : 0;
}

/**
 * Steers towards the point on a circle (radius `radius` about the origin) a little ahead of
 * the car, and holds `speed` m/s. Cards use it as the driver.
 */
export function autoDrive(car: Car, radius = 14, speed = 7): void {
  const p = car.node.getWorldPosition();
  const fwd = car.node.worldMatrix.transformVectorAffine(new Vector3(0, 0, 1), new Vector3());
  fwd.y = 0;
  fwd.inplaceNormalize();
  const angle = Math.atan2(p.z, p.x) + 0.7;
  const to = new Vector3(Math.cos(angle) * radius - p.x, 0, Math.sin(angle) * radius - p.z).inplaceNormalize();
  // The car's left is up x forward; steering is positive to the left
  const left = new Vector3(fwd.z, 0, -fwd.x);
  const dot = left.x * to.x + left.z * to.z;
  car.vehicle.steering = Math.max(-1, Math.min(1, dot * 2.5));
  car.vehicle.throttle = Math.max(0, Math.min(1, (speed - car.vehicle.speed) * 0.4));
  car.vehicle.brake = 0;
}

/** A camera behind and above `node`, smoothed; call the returned function every frame with the frame time in ms. */
export function chaseCamera(kit: Kit, node: Mesh, distance = 9, height = 4): (dtMs: number) => void {
  const camera = new PerspectiveCamera(kit.scene, Math.PI / 3, 0.1, 500);
  kit.scene.mainCamera = camera;
  const p0 = node.getWorldPosition();
  const eye = new Vector3(p0.x, p0.y + height, p0.z - distance);
  return (dtMs) => {
    const dt = Math.min(dtMs, 100) / 1000;
    const p = node.getWorldPosition();
    const back = node.worldMatrix.transformVectorAffine(new Vector3(0, 0, -1), new Vector3());
    back.y = 0;
    back.inplaceNormalize();
    const t = 1 - Math.exp(-4 * dt);
    eye.setXYZ(eye.x + (p.x + back.x * distance - eye.x) * t, eye.y + (p.y + height - eye.y) * t, eye.z + (p.z + back.z * distance - eye.z) * t);
    camera.lookAt(eye, new Vector3(p.x, p.y + 1, p.z), Vector3.axisPY());
  };
}
