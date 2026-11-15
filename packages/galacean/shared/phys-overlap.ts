// Overlap queries with a JS stand-in for the missing overlapMultiple
//
// `physics.overlapBoxAll/SphereAll/CapsuleAll` call `pxScene.overlapMultiple`, which the
// physx.release.js in @galacean/engine-physics-physx 1.6.13 does not export (it has overlapAny
// only), so the native call throws "overlapMultiple is not a function". The examples still make
// the real call; when it throws they fall back to this approximate test (crates as spheres) and say so.
import { type ColliderShape, type Entity, StaticCollider, Vector3 } from '@galacean/engine';

let nativeBroken = false;

export interface Overlap {
  entities: Entity[];
  /** True when the answer came from the engine's own overlap call. */
  native: boolean;
}

const layerOf = (e: Entity): number => (e.getComponent(StaticCollider)?.collisionLayer ?? 1) as number;

/**
 * Calls `native()`; if the engine throws, tests the crates' centres with `inside` instead.
 * `reach` is the radius a crate counts as, so the stand-in is a little generous.
 */
export function overlap(crates: Entity[], mask: number, native: () => readonly ColliderShape[], inside: (centre: Vector3, reach: number) => boolean, reach = 0.55): Overlap {
  if (!nativeBroken) {
    try {
      return { entities: native().map((s) => s.collider.entity), native: true };
    } catch {
      nativeBroken = true;
    }
  }
  return { entities: crates.filter((e) => (layerOf(e) & mask) !== 0 && inside(e.transform.worldPosition, reach)), native: false };
}

/** Distance from `p` to the segment a-b. */
export function segmentDistance(p: Vector3, a: Vector3, b: Vector3): number {
  const ab = b.clone().subtract(a);
  const t = Math.max(0, Math.min(1, Vector3.dot(p.clone().subtract(a), ab) / Math.max(1e-9, Vector3.dot(ab, ab))));
  return Vector3.distance(p, a.clone().add(ab.scale(t)));
}

export const note = (r: Overlap): string => (r.native ? '' : '\n(JS stand-in: this PhysX build lacks overlapMultiple)');
