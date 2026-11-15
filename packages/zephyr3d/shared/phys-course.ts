// An obstacle course for the character examples: steps, a ledge, two ramps, loose crates
import { Quaternion, Vector3 } from '@zephyr3d/base';
import type { Mesh } from '@zephyr3d/scene';
import { dynBox, floor, GREY, SLATE, staticBox, type Kit, ORANGE } from './phys-kit.ts';

export interface Course {
  crates: Mesh[];
}

/** Floor 30 x 30; four 0.25 m steps; a 0.5 m ledge; a 25 degree ramp and a 55 degree one; four crates. */
export function buildCourse(kit: Kit): Course {
  floor(kit, 30, 30);
  // Steps 0.25 m high: stepHeight 0.3 lets the character walk up them
  for (let i = 0; i < 4; i++) {
    staticBox(kit, new Vector3(1, 0.25 * (i + 1), 3), new Vector3(3 + i, 0.125 * (i + 1), -3), GREY);
  }
  // A 0.5 m ledge: too high to step onto, it has to be jumped
  staticBox(kit, new Vector3(3, 0.5, 3), new Vector3(-4, 0.25, -3), SLATE);
  // A 25 degree ramp it can walk up, and a 55 degree one it slides down
  staticBox(kit, new Vector3(4, 0.2, 3), new Vector3(3, 0.8, 3), GREY, Quaternion.fromAxisAngle(Vector3.axisPZ(), (25 * Math.PI) / 180));
  staticBox(kit, new Vector3(3, 0.2, 3), new Vector3(-4, 1.1, 3), [0.6, 0.35, 0.3], Quaternion.fromAxisAngle(Vector3.axisPZ(), (-55 * Math.PI) / 180));
  const crates: Mesh[] = [];
  for (let i = 0; i < 4; i++) crates.push(dynBox(kit, 0.7, new Vector3(-1 + i * 0.9, 0.35, 1.5), ORANGE, 10));
  return { crates };
}

/** Layer of the small props the camera probe leaves out. */
export const LAYER_PROPS = 1;

/** Walls, a long wall, a low tunnel, five pillars and four crates (on LAYER_PROPS) for the camera examples. */
export function buildCameraWorld(kit: Kit): void {
  floor(kit, 30, 30);
  const wall = SLATE;
  const named = (m: Mesh, name: string): void => {
    m.name = name;
  };
  named(staticBox(kit, new Vector3(0.4, 3, 10), new Vector3(-3, 1.5, -2), wall), 'Long wall');
  named(staticBox(kit, new Vector3(8, 3, 0.4), new Vector3(2, 1.5, -7), wall), 'Back wall');
  // The tunnel: two side walls and a roof 2.2 m up
  named(staticBox(kit, new Vector3(0.4, 2.2, 6), new Vector3(4, 1.1, 2), wall), 'Tunnel wall');
  named(staticBox(kit, new Vector3(0.4, 2.2, 6), new Vector3(6.4, 1.1, 2), wall), 'Tunnel wall');
  named(staticBox(kit, new Vector3(2.8, 0.3, 6), new Vector3(5.2, 2.35, 2), wall), 'Tunnel roof');
  for (let i = 0; i < 5; i++) named(staticBox(kit, new Vector3(0.6, 3, 0.6), new Vector3(-8 + i * 1.6, 1.5, 4), GREY), `Pillar ${i + 1}`);
  for (let i = 0; i < 4; i++) {
    const crate = dynBox(kit, 0.7, new Vector3(-0.5 + i * 0.9, 0.35, 5), ORANGE, 10);
    crate.physics!.colliders[0]!.layer = LAYER_PROPS;
  }
}

/** Waypoints that take the hero through the tunnel and round the walls. */
export const CAMERA_PATH: readonly (readonly [number, number])[] = [
  [0, 8],
  [5.2, 7],
  [5.2, -3],
  [1, -4],
  [1, 3],
];
