// AR helpers for XR examples: transparent clear colour, pointer rays
import * as pc from 'playcanvas';

/**
 * An AR session is blended over the camera feed, so the camera's clear colour must be
 * transparent while it runs (ar/index.md). Returns the function that undoes the listeners.
 */
export function transparentInAr(app: pc.Application, camera: pc.Entity): () => void {
  const clear = camera.camera!.clearColor.clone();
  const onStart = (): void => {
    camera.camera!.clearColor = new pc.Color(clear.r, clear.g, clear.b, app.xr?.type === pc.XRTYPE_AR ? 0 : 1);
  };
  const onEnd = (): void => {
    camera.camera!.clearColor = clear;
  };
  app.xr?.on('start', onStart);
  app.xr?.on('end', onEnd);
  return () => {
    app.xr?.off('start', onStart);
    app.xr?.off('end', onEnd);
  };
}

/** Sets `ray` to the world-space ray under a canvas point given as 0 to 1 fractions. */
export function pointerRay(camera: pc.Entity, canvas: HTMLCanvasElement, x01: number, y01: number, ray: pc.Ray): pc.Ray {
  const cam = camera.camera!;
  const near = new pc.Vec3();
  const far = new pc.Vec3();
  cam.screenToWorld(x01 * canvas.clientWidth, y01 * canvas.clientHeight, cam.nearClip, near);
  cam.screenToWorld(x01 * canvas.clientWidth, y01 * canvas.clientHeight, cam.farClip, far);
  ray.origin.copy(near);
  ray.direction.sub2(far, near).normalize();
  return ray;
}

/** Tracks the pointer over a canvas as 0 to 1 fractions; `click` fires on pointer down. */
export function trackPointer(canvas: HTMLCanvasElement, signal: AbortSignal, click?: () => void): pc.Vec2 {
  const p = new pc.Vec2(0.5, 0.6);
  canvas.addEventListener(
    'pointermove',
    (e) => {
      const r = canvas.getBoundingClientRect();
      p.set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    },
    { signal },
  );
  if (click) canvas.addEventListener('pointerdown', click, { signal });
  return p;
}
