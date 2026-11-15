// The library's two orthographic depth helpers, copied from src/utils (it does not export them)
//
// Both are `@ignore` in the JSDoc and src/index.js never re-exports src/utils, so a named import
// from 'postprocessing' fails at run time even though the typings declare them.

/** Converts orthographic (linear) depth in [0, 1] to view Z. */
export function orthographicDepthToViewZ(depth: number, near: number, far: number): number {
  return depth * (near - far) - near;
}

/** Converts view Z (negative in front of the camera) to orthographic depth in [0, 1]. */
export function viewZToOrthographicDepth(viewZ: number, near: number, far: number): number {
  return Math.min(Math.max((viewZ + near) / (near - far), 0.0), 1.0);
}
