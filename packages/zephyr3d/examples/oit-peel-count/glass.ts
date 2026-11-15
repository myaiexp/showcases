// Intersecting see-through spheres and a torus whose blend order changes as they move
import { Vector3, Vector4 } from '@zephyr3d/base';
import { DirectionalLight, LambertMaterial, Mesh, Scene, SphereShape, TorusShape } from '@zephyr3d/scene';

function glass(r: number, g: number, b: number, a: number): LambertMaterial {
  const m = new LambertMaterial();
  m.albedoColor = new Vector4(r, g, b, a);
  m.blendMode = 'blend';
  m.cullMode = 'none';
  return m;
}

/** Five overlapping translucent shapes; the returned update spins them through each other. */
export function glassScene(scene: Scene): (seconds: number) => void {
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 3), Vector3.zero(), Vector3.axisPY());
  const ball = new SphereShape({ radius: 1 });
  const colors: [number, number, number][] = [[1, 0.2, 0.2], [0.2, 1, 0.3], [0.25, 0.45, 1], [1, 0.9, 0.2]];
  const balls = colors.map((c) => new Mesh(scene, ball, glass(c[0], c[1], c[2], 0.45)));
  const ring = new Mesh(scene, new TorusShape({ outerRadius: 1.8, innerRadius: 0.3, numSlices: 48, numSegments: 16 }), glass(1, 1, 1, 0.35));
  return (s) => {
    balls.forEach((b, i) => {
      const a = s * 0.7 + (i * Math.PI) / 2;
      b.position.setXYZ(Math.cos(a) * 0.9, Math.sin(a * 1.3) * 0.4, Math.sin(a) * 0.9);
    });
    ring.rotation.fromEulerAngle(s * 0.5, s * 0.3, 0);
  };
}
