// Drag-to-orbit and wheel zoom around a target point, with an idle auto-rotate
import * as THREE from 'three';

export interface Orbit {
  /** The point the camera circles and looks at. Move it and the camera follows. */
  target: THREE.Vector3;
  /** Auto-rotate speed in rad/s; it stops for good once the reader drags. */
  autoRotate: number;
  update(dt: number): void;
  dispose(): void;
}

/**
 * Keeps the camera on a sphere around `target`. In a card (`interactive: false`) it
 * only auto-rotates; in the full view a drag orbits and the wheel zooms.
 */
export function createOrbit(
  camera: THREE.Camera,
  canvas: HTMLCanvasElement,
  target: THREE.Vector3,
  { interactive, autoRotate }: { interactive: boolean; autoRotate: number },
): Orbit {
  const offset = camera.position.clone().sub(target);
  const spherical = new THREE.Spherical().setFromVector3(offset);
  const ac = new AbortController();
  const orbit: Orbit = {
    target,
    autoRotate,
    update(dt) {
      spherical.theta += orbit.autoRotate * dt;
      spherical.phi = THREE.MathUtils.clamp(spherical.phi, 0.05, Math.PI - 0.05);
      camera.position.setFromSpherical(spherical).add(target);
      camera.lookAt(target);
    },
    dispose: () => ac.abort(),
  };

  if (interactive) {
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
        spherical.theta -= (e.clientX - drag.x) * 0.008;
        spherical.phi -= (e.clientY - drag.y) * 0.008;
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
        spherical.radius = THREE.MathUtils.clamp(spherical.radius * Math.exp(e.deltaY * 0.001), 0.2, 200);
      },
      { signal, passive: false },
    );
  }
  return orbit;
}
