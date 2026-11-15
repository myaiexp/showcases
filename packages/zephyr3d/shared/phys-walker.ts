// Walker input for the character examples: keyboard in the full view, a waypoint autopilot in cards
import { Vector3 } from '@zephyr3d/base';
import { getInput } from '@zephyr3d/scene';
import type { Mesh } from '@zephyr3d/scene';
import type { Kit } from './phys-kit.ts';

/** What the walker wants this step: a world-space direction (unit length or zero) and a jump. */
export interface Drive {
  x: number;
  z: number;
  jump: boolean;
}

export interface DriverOptions {
  /** Camera yaw in radians, when the keys are relative to a camera (0: forward is -Z). */
  yaw?: () => number;
  /** Keys that count as input besides WASD and arrows (read by the caller through `keys`). */
  keys?: Set<string>;
}

/**
 * Returns a function to call once per fixed step. In the full view it reads WASD / arrows /
 * space; in a card it walks `path` (x, z points) in a loop and jumps now and then.
 */
export function makeDriver(kit: Kit, hero: Mesh, path: readonly (readonly [number, number])[], opts: DriverOptions = {}): () => Drive {
  const keys = opts.keys ?? new Set<string>();
  let jumpPressed = false;
  if (!kit.stage.preview) {
    getInput().use((ev, type) => {
      if (type === 'keydown') {
        const key = ev.key.toLowerCase();
        keys.add(key);
        if (key === ' ') jumpPressed = true;
        return true;
      }
      if (type === 'keyup') {
        keys.delete(ev.key.toLowerCase());
        return true;
      }
      return false;
    });
  }
  let target = 0;
  let steps = 0;
  return () => {
    if (kit.stage.preview) {
      const p = hero.position;
      let [wx, wz] = path[target]!;
      if (Math.hypot(wx - p.x, wz - p.z) < 0.5) {
        target = (target + 1) % path.length;
        [wx, wz] = path[target]!;
      }
      const len = Math.hypot(wx - p.x, wz - p.z) || 1;
      steps++;
      return { x: (wx - p.x) / len, z: (wz - p.z) / len, jump: steps % 170 === 0 };
    }
    const right = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0);
    const forward = (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0);
    const len = Math.hypot(right, forward) || 1;
    const yaw = opts.yaw?.() ?? 0;
    const sin = Math.sin(yaw);
    const cos = Math.cos(yaw);
    const jump = jumpPressed;
    jumpPressed = false;
    return { x: (right * cos - forward * sin) / len, z: (-right * sin - forward * cos) / len, jump };
  };
}

/** Where the hero walks in the course's cards: a loop over the steps and back. */
export const COURSE_PATH: readonly (readonly [number, number])[] = [
  [0, 4],
  [2, -3],
  [7, -3],
  [7, 1],
  [3, 5],
];

export function lerpTo(v: Vector3, x: number, y: number, z: number, t: number): void {
  v.setXYZ(v.x + (x - v.x) * t, v.y + (y - v.y) * t, v.z + (z - v.z) * t);
}
