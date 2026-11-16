// Card drivers: keep a still scene alive in a 200px card without pointer input
import type { Stage } from './frame.ts';
import type { Entity } from './types.ts';

/**
 * The default camera (and any camera with look-controls) rewrites its rotation every tick
 * from look-controls' own yaw and pitch objects (look-controls.js updateOrientation), so a
 * card turns those, the way a mouse drag would. A camera without look-controls is turned
 * through its object3D.
 */
export function sway(stage: Stage, opts: { yaw?: number; pitch?: number; seconds?: number; camera?: Entity } = {}): void {
  const { yaw = 14, pitch = 0, seconds = 9 } = opts;
  const deg = Math.PI / 180;
  const t0 = performance.now();
  let raf = 0;
  const step = (now: number): void => {
    const camera = opts.camera ?? stage.scene.camera?.el;
    const phase = (((now - t0) / 1000) * 2 * Math.PI) / seconds;
    const look = camera?.components['look-controls'] as { yawObject?: { rotation: { y: number } }; pitchObject?: { rotation: { x: number } } } | undefined;
    if (look?.yawObject && look.pitchObject) {
      look.yawObject.rotation.y = Math.sin(phase) * yaw * deg;
      look.pitchObject.rotation.x = Math.sin(phase * 0.5) * pitch * deg;
    } else if (camera) {
      camera.object3D.rotation.set(Math.sin(phase * 0.5) * pitch * deg, Math.sin(phase) * yaw * deg, 0);
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  stage.own(() => cancelAnimationFrame(raf));
}
