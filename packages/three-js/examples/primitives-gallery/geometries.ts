// The catalogue: one factory per built-in geometry, with a display name
import * as THREE from 'three/webgpu';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';

export interface GeometrySpec {
  name: string;
  /** Line geometries (Edges, Wireframe) are drawn with LineSegments instead of a Mesh. */
  lines?: boolean;
  make: () => THREE.BufferGeometry;
}

// The manual's heart outline, used by ShapeGeometry and ExtrudeGeometry.
function heart(): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -2.5;
  const y = -5;
  shape.moveTo(x + 2.5, y + 2.5);
  shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
  shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
  shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
  return shape;
}

// A wavy vase silhouette for LatheGeometry: x is the radius, y the height.
function vaseProfile(): THREE.Vector2[] {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i < 10; i++) points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8));
  return points;
}

// TubeGeometry needs a Curve; a CatmullRomCurve3 through a few points is the shortest way.
function tubePath(): THREE.Curve<THREE.Vector3> {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-6, -2, 0),
    new THREE.Vector3(-2, 3, 2),
    new THREE.Vector3(2, -3, -2),
    new THREE.Vector3(6, 2, 0),
  ]);
}

// ParametricGeometry maps (u, v) in [0,1]^2 to a point: here a Moebius strip.
function moebius(u: number, v: number, target: THREE.Vector3): void {
  const a = u * Math.PI * 2;
  const w = (v - 0.5) * 2;
  const r = 4 + w * Math.cos(a / 2);
  target.set(r * Math.cos(a), r * Math.sin(a), w * Math.sin(a / 2));
}

export const SPECS: readonly GeometrySpec[] = [
  { name: 'BoxGeometry', make: () => new THREE.BoxGeometry(8, 8, 8) },
  { name: 'CapsuleGeometry', make: () => new THREE.CapsuleGeometry(3, 5, 4, 12) },
  { name: 'CircleGeometry', make: () => new THREE.CircleGeometry(7, 24) },
  { name: 'ConeGeometry', make: () => new THREE.ConeGeometry(6, 8, 16) },
  { name: 'CylinderGeometry', make: () => new THREE.CylinderGeometry(4, 4, 8, 12) },
  { name: 'DodecahedronGeometry', make: () => new THREE.DodecahedronGeometry(7) },
  { name: 'EdgesGeometry', lines: true, make: () => new THREE.EdgesGeometry(new THREE.BoxGeometry(8, 8, 8)) },
  {
    name: 'ExtrudeGeometry',
    make: () => new THREE.ExtrudeGeometry(heart(), { steps: 2, depth: 2, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 2 }),
  },
  { name: 'IcosahedronGeometry', make: () => new THREE.IcosahedronGeometry(7) },
  { name: 'LatheGeometry', make: () => new THREE.LatheGeometry(vaseProfile(), 24) },
  { name: 'OctahedronGeometry', make: () => new THREE.OctahedronGeometry(7) },
  { name: 'ParametricGeometry', make: () => new ParametricGeometry(moebius, 60, 8) },
  { name: 'PlaneGeometry', make: () => new THREE.PlaneGeometry(9, 9, 2, 2) },
  { name: 'RingGeometry', make: () => new THREE.RingGeometry(2, 7, 18) },
  { name: 'ShapeGeometry', make: () => new THREE.ShapeGeometry(heart()) },
  { name: 'SphereGeometry', make: () => new THREE.SphereGeometry(7, 12, 8) },
  { name: 'TetrahedronGeometry', make: () => new THREE.TetrahedronGeometry(7) },
  { name: 'TorusGeometry', make: () => new THREE.TorusGeometry(5, 2, 8, 24) },
  { name: 'TorusKnotGeometry', make: () => new THREE.TorusKnotGeometry(5, 1.6, 100, 12) },
  { name: 'TubeGeometry', make: () => new THREE.TubeGeometry(tubePath(), 40, 1.2, 8, false) },
  { name: 'WireframeGeometry', lines: true, make: () => new THREE.WireframeGeometry(new THREE.SphereGeometry(7, 10, 8)) },
];

// The six shown in a gallery card.
export const PREVIEW_NAMES = [
  'BoxGeometry',
  'ConeGeometry',
  'TorusKnotGeometry',
  'IcosahedronGeometry',
  'LatheGeometry',
  'TorusGeometry',
];
