// Drag-to-orbit and wheel zoom for a camera entity, with an idle auto-rotate
import * as pc from 'playcanvas';

export interface Orbit {
  /** The point the camera circles and looks at. */
  target: pc.Vec3;
  /** Auto-rotate speed in degrees per second; it stops for good once the reader drags. */
  autoRotate: number;
  yaw: number;
  pitch: number;
  distance: number;
  dispose(): void;
}

export interface OrbitOptions {
  target?: pc.Vec3;
  /** Degrees. */
  yaw?: number;
  /** Degrees, negative looks down. */
  pitch?: number;
  distance?: number;
  autoRotate?: number;
  /** False in a card: only the auto-rotate runs. */
  interactive: boolean;
}

/**
 * Places `camera` on a sphere around the target every update. Plain DOM pointer events
 * keep this helper independent of the app's input devices; the Cameras chapter shows
 * the engine's own camera-controls script instead.
 */
export function createOrbit(app: pc.AppBase, camera: pc.Entity, options: OrbitOptions): Orbit {
  const canvas = app.graphicsDevice.canvas as HTMLCanvasElement;
  const ac = new AbortController();
  const orbit: Orbit = {
    target: options.target?.clone() ?? new pc.Vec3(),
    autoRotate: options.autoRotate ?? 12,
    yaw: options.yaw ?? 30,
    pitch: options.pitch ?? -20,
    distance: options.distance ?? 6,
    dispose: () => {
      ac.abort();
      app.off('update', update);
    },
  };
  const q = new pc.Quat();
  const offset = new pc.Vec3();
  const update = (dt: number): void => {
    orbit.yaw += orbit.autoRotate * dt;
    orbit.pitch = pc.math.clamp(orbit.pitch, -89, 89);
    q.setFromEulerAngles(orbit.pitch, orbit.yaw, 0);
    q.transformVector(pc.Vec3.BACK, offset).mulScalar(orbit.distance);
    camera.setPosition(offset.add(orbit.target));
    camera.lookAt(orbit.target);
  };
  app.on('update', update);
  update(0);

  if (options.interactive) {
    const { signal } = ac;
    let drag: { x: number; y: number } | null = null;
    canvas.style.cursor = 'grab';
    canvas.addEventListener(
      'pointerdown',
      (e) => {
        if (e.button !== 0) return;
        drag = { x: e.clientX, y: e.clientY };
        orbit.autoRotate = 0;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
      },
      { signal },
    );
    canvas.addEventListener(
      'pointermove',
      (e) => {
        if (!drag) return;
        orbit.yaw -= (e.clientX - drag.x) * 0.4;
        orbit.pitch -= (e.clientY - drag.y) * 0.4;
        drag = { x: e.clientX, y: e.clientY };
      },
      { signal },
    );
    const end = (): void => {
      drag = null;
      canvas.style.cursor = 'grab';
    };
    canvas.addEventListener('pointerup', end, { signal });
    canvas.addEventListener('pointercancel', end, { signal });
    canvas.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        orbit.distance = pc.math.clamp(orbit.distance * Math.exp(e.deltaY * 0.001), 0.3, 500);
      },
      { signal, passive: false },
    );
  }
  return orbit;
}
