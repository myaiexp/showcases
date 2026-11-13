// Procedural "population" grid on a globe: one positioned cell per land point, no data files
import * as THREE from 'three/webgpu';

export interface Cell {
  /** World matrix that places a unit box on the sphere and stretches it outward. */
  matrix: THREE.Matrix4;
  /** 0..1, how tall (and how bright) the box is. */
  amount: number;
}

/** Smooth made-up density field; undefined where there is "no data" (sea). */
export function sample(latDeg: number, lonDeg: number): number | undefined {
  const la = THREE.MathUtils.degToRad(latDeg);
  const lo = THREE.MathUtils.degToRad(lonDeg);
  const land = Math.sin(lo * 2 + 1) * Math.cos(la * 3) + 0.6 * Math.sin(lo * 5 - la * 2) + 0.3 * Math.cos(lo * 9 + la * 4);
  if (land < 0.15) return undefined;
  const peak = Math.sin(lo * 7 + 2) * Math.sin(la * 6 + 1);
  return THREE.MathUtils.clamp(0.15 + 0.55 * (peak * 0.5 + 0.5) + 0.3 * (land - 0.15), 0, 1) ** 2;
}

/** Same helper-node trick as the manual: rotate helpers to lat/lon, read a world matrix. */
export function makeCells(stepDeg: number): Cell[] {
  const lonHelper = new THREE.Object3D();
  const latHelper = new THREE.Object3D();
  const positionHelper = new THREE.Object3D();
  const originHelper = new THREE.Object3D();
  lonHelper.add(latHelper);
  latHelper.add(positionHelper);
  positionHelper.add(originHelper);
  positionHelper.position.z = 1; // the sphere's surface
  originHelper.position.z = 0.5; // so a unit box grows outward instead of from its centre

  const cells: Cell[] = [];
  const width = 0.005 * stepDeg;
  for (let lat = -60; lat <= 80; lat += stepDeg) {
    for (let lon = -180; lon < 180; lon += stepDeg) {
      const amount = sample(lat, lon);
      if (amount === undefined) continue;
      lonHelper.rotation.y = THREE.MathUtils.degToRad(lon);
      latHelper.rotation.x = -THREE.MathUtils.degToRad(lat);
      positionHelper.scale.set(width, width, THREE.MathUtils.lerp(0.01, 0.4, amount));
      originHelper.updateWorldMatrix(true, false);
      cells.push({ matrix: originHelper.matrixWorld.clone(), amount });
    }
  }
  return cells;
}

/** Blue (low) to green (high), as the manual's hue lerp. */
export function colorFor(amount: number, target = new THREE.Color()): THREE.Color {
  return target.setHSL(THREE.MathUtils.lerp(0.7, 0.3, amount), 1, THREE.MathUtils.lerp(0.4, 0.8, amount));
}
