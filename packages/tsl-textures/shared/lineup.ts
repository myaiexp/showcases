// Several textured models in a grid, each with a label, camera fitted to the grid
import * as THREE from 'three/webgpu';
import { geometry, type Shape } from './shapes.ts';
import type { Stage } from './stage.ts';

export interface Entry {
  material: THREE.Material;
  label: string;
}

export interface LineupOptions {
  /** Models per row (default: all in one row). */
  columns?: number;
  shape?: Shape;
  /** Turns per minute around y. */
  spin?: number;
  /** Labels under the models (on unless false). */
  labels?: boolean;
}

/** Adds one mesh per entry, laid out in rows; returns the meshes in entry order. */
export function lineup(stage: Stage, entries: readonly Entry[], opts: LineupOptions = {}): THREE.Mesh[] {
  const columns = Math.min(opts.columns ?? entries.length, entries.length);
  const rows = Math.ceil(entries.length / columns);
  const gap = 2.7;
  const geo = stage.own(geometry(opts.shape ?? 'sphere', stage.preview || entries.length > 6));
  const box = stage.renderer.domElement.parentElement!;

  const meshes = entries.map((entry, i) => {
    const mesh = new THREE.Mesh(geo, stage.own(entry.material));
    const col = i % columns;
    const row = Math.floor(i / columns);
    mesh.position.set((col - (columns - 1) / 2) * gap, ((rows - 1) / 2 - row) * gap, 0);
    stage.scene.add(mesh);
    return mesh;
  });

  const labels =
    opts.labels === false || stage.preview
      ? []
      : entries.map((entry) => {
          const div = document.createElement('div');
          div.className = 'tt-label';
          div.textContent = entry.label;
          box.append(div);
          return div;
        });
  stage.onDispose(() => labels.forEach((l) => l.remove()));

  // Fit the whole grid: distance for its height, or for its width at this aspect.
  const halfFov = THREE.MathUtils.degToRad(stage.camera.fov / 2);
  const fit = (): void => {
    const h = rows * gap;
    const w = columns * gap;
    const d = Math.max(h / (2 * Math.tan(halfFov)), w / (2 * Math.tan(halfFov) * stage.camera.aspect)) + 1.2;
    if (Math.abs(stage.camera.position.length() - d) > 0.01) stage.camera.position.setLength(d);
  };

  const spin = ((opts.spin ?? 2) * Math.PI * 2) / 60;
  const at = new THREE.Vector3();
  let lastAspect = 0;
  stage.frame((_t, dt) => {
    if (stage.camera.aspect !== lastAspect) {
      lastAspect = stage.camera.aspect;
      fit();
    }
    for (const mesh of meshes) mesh.rotation.y += spin * dt;
    labels.forEach((div, i) => {
      at.copy(meshes[i]!.position).add({ x: 0, y: -1.25, z: 0 }).project(stage.camera);
      div.style.left = `${((at.x + 1) / 2) * box.clientWidth}px`;
      div.style.top = `${((1 - at.y) / 2) * box.clientHeight}px`;
    });
  });
  return meshes;
}
