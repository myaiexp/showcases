// Generated datasets on a globe: four value sets over the same cells, built as merged geometries
import * as THREE from 'three/webgpu';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

export interface DatasetInfo {
  name: string;
  /** Hue range the 0..1 amount maps over. */
  hueRange: [number, number];
}

export const DATASETS: DatasetInfo[] = [
  { name: 'Alpha', hueRange: [0.7, 0.3] },
  { name: 'Beta', hueRange: [0.9, 1.1] },
  { name: 'Alpha > Beta', hueRange: [0.6, 1.1] },
  { name: 'Beta > Alpha', hueRange: [0.0, 0.4] },
];

const rad = THREE.MathUtils.degToRad;

function isLand(lat: number, lon: number): boolean {
  const la = rad(lat);
  const lo = rad(lon);
  return Math.sin(lo * 2 + 1) * Math.cos(la * 3) + 0.6 * Math.sin(lo * 5 - la * 2) + 0.3 * Math.cos(lo * 9 + la * 4) >= 0.15;
}

function field(lat: number, lon: number, phase: number): number {
  const v = Math.sin(rad(lon) * 3 + phase) * Math.cos(rad(lat) * 4 - phase) + 0.5 * Math.sin(rad(lon + lat) * 6 + phase * 2);
  return THREE.MathUtils.clamp(v * 0.4 + 0.5, 0, 1) ** 2;
}

/** One 0..1 amount per dataset for a cell. The "greater than" sets are differences of the first two. */
function amounts(lat: number, lon: number): number[] {
  const a = field(lat, lon, 0);
  const b = field(lat, lon, 1.9);
  return [a, b, Math.min(1, Math.max(a - b, 0) * 2), Math.min(1, Math.max(b - a, 0) * 2)];
}

/**
 * One merged geometry per dataset. Morph targets need identical vertex counts, so the
 * cell list (the land mask) is shared and every dataset gets a box for every cell.
 */
export function makeDatasetGeometries(stepDeg: number): THREE.BufferGeometry[] {
  const lonHelper = new THREE.Object3D();
  const latHelper = new THREE.Object3D();
  const positionHelper = new THREE.Object3D();
  const originHelper = new THREE.Object3D();
  lonHelper.add(latHelper);
  latHelper.add(positionHelper);
  positionHelper.add(originHelper);
  positionHelper.position.z = 1;
  originHelper.position.z = 0.5;

  const width = 0.005 * stepDeg;
  const color = new THREE.Color();
  const lists: THREE.BufferGeometry[][] = DATASETS.map(() => []);

  for (let lat = -60; lat <= 80; lat += stepDeg) {
    for (let lon = -180; lon < 180; lon += stepDeg) {
      if (!isLand(lat, lon)) continue;
      lonHelper.rotation.y = rad(lon);
      latHelper.rotation.x = -rad(lat);
      amounts(lat, lon).forEach((amount, set) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        positionHelper.scale.set(width, width, THREE.MathUtils.lerp(0.01, 0.4, amount));
        originHelper.updateWorldMatrix(true, false);
        geometry.applyMatrix4(originHelper.matrixWorld);

        const [h0, h1] = (DATASETS[set] as DatasetInfo).hueRange;
        color.setHSL(THREE.MathUtils.lerp(h0, h1, amount), 1, THREE.MathUtils.lerp(0.4, 0.8, amount));
        const count = geometry.getAttribute('position').count;
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) color.toArray(colors, i * 3);
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        (lists[set] as THREE.BufferGeometry[]).push(geometry);
      });
    }
  }
  return lists.map((list) => {
    const merged = BufferGeometryUtils.mergeGeometries(list, false);
    list.forEach((g) => g.dispose());
    return merged;
  });
}
