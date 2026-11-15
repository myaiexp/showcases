// Full-view pointer to a point on the z = 0 plane, through the camera ray
import { type Camera, Plane, Ray, Vector2, Vector3 } from '@galacean/engine';
import type { Stage } from './stage.ts';

/** Latest pointer hit on the z = 0 plane (world x, y) or null; always null in cards. */
export function planePointer(stage: Stage, camera: Camera, onMove?: (x: number, y: number, down: boolean) => void): { hit: () => [number, number] | null } {
  let last: [number, number] | null = null;
  if (stage.preview) return { hit: () => null };
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const ray = new Ray();
  const at = new Vector2();
  const point = new Vector3();
  const { canvas } = stage;
  let down = false;
  const move = (e: PointerEvent): void => {
    const r = canvas.getBoundingClientRect();
    at.set(((e.clientX - r.left) * canvas.width) / r.width, ((e.clientY - r.top) * canvas.height) / r.height);
    camera.screenPointToRay(at, ray);
    const d = ray.intersectPlane(plane);
    if (d < 0) return;
    ray.getPoint(d, point);
    last = [point.x, point.y];
    onMove?.(point.x, point.y, down);
  };
  const press = (e: PointerEvent): void => {
    down = true;
    move(e);
  };
  const release = (): void => void (down = false);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerdown', press);
  window.addEventListener('pointerup', release);
  stage.own(() => {
    canvas.removeEventListener('pointermove', move);
    canvas.removeEventListener('pointerdown', press);
    window.removeEventListener('pointerup', release);
  });
  return { hit: () => last };
}
