// Card camera: fit the settled graph once, then sway around the vertical axis without fighting zoomToFit
import type { AnyGraph } from './ghost.ts';
import type { Stage } from './stage.ts';

export interface Spin {
  /** Fits the graph to the view at once, then keeps swaying from the fitted position. */
  fit(padding?: number): void;
}

/**
 * Sways the camera left and right (+-`sweep` radians, one swing every 2*PI/`speed` seconds) around
 * the origin's vertical axis, from wherever `fit()` left it. A sway keeps the fitted view valid:
 * a full turn would show elongated layouts end-on and leave them tiny. `get` returns the graph
 * (a Kapsule graph is itself a function, so it cannot be passed bare).
 *
 * Do not call `cameraPosition()` with a transition while this runs: each call in the loop ends
 * a running `zoomToFit` tween, so the camera would never reach the fitted distance (it stays at
 * the distance it had when the first frame ran, which can be the library's 1000 units).
 */
export function spin(stage: Stage, get: () => AnyGraph | null, speed = 0.5, sweep = 0.8): Spin {
  let base: { x: number; y: number; z: number } | null = null;
  let t0 = 0;
  let now = 0;
  stage.loop((_dt, t) => {
    now = t;
    const g = get();
    if (!base || !g) return;
    const a = sweep * Math.sin((t - t0) * speed);
    const c = Math.cos(a);
    const s = Math.sin(a);
    g.cameraPosition({ x: base.x * c + base.z * s, y: base.y, z: base.z * c - base.x * s }, { x: 0, y: 0, z: 0 });
  });
  return {
    fit(padding = 10) {
      const g = get();
      if (!g) return;
      g.scene().updateMatrixWorld(true); // objects made since the last render have a stale matrixWorld
      g.zoomToFit(0, padding);
      const p = g.camera().position;
      // A little back off, for the sides the sway turns towards.
      base = { x: p.x * 1.1, y: p.y * 1.1, z: p.z * 1.1 };
      t0 = now;
    },
  };
}

/** In a full view: fit the camera to the layout once, when it first settles. */
export function fitOnce(graph: AnyGraph, padding = 40): void {
  let done = false;
  graph.onEngineStop(() => {
    if (done) return;
    done = true;
    graph.scene().updateMatrixWorld(true);
    graph.zoomToFit(600, padding);
  });
}

/** Fits the camera to the graph at once and returns its distance from the origin. */
export function fitNow(graph: AnyGraph, padding = 20): number {
  graph.scene().updateMatrixWorld(true); // objects made since the last render have a stale matrixWorld
  graph.zoomToFit(0, padding);
  const p = graph.camera().position;
  return Math.hypot(p.x, p.y, p.z);
}

/** Like `fitNow`, but first turns the camera to look at the graph from a corner, so depth shows. */
export function diagonalFit(graph: AnyGraph, padding = 20): void {
  const d = fitNow(graph, padding);
  graph.cameraPosition({ x: d * 0.45, y: d * 0.35, z: d * 0.82 }, { x: 0, y: 0, z: 0 });
  graph.scene().updateMatrixWorld(true);
  graph.zoomToFit(0, padding);
}
