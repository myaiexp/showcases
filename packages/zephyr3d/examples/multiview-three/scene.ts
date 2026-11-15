// The sample scene both multi-view examples render: a floor, pillars and orbiting balls
import { Vector3, Vector4 } from '@zephyr3d/base';
import { BoxShape, DirectionalLight, LambertMaterial, Mesh, PlaneShape, Scene, SphereShape } from '@zephyr3d/scene';

function lambert(r: number, g: number, b: number): LambertMaterial {
  const m = new LambertMaterial();
  m.albedoColor = new Vector4(r, g, b, 1);
  return m;
}

/** Builds the scene and returns a per-frame update that moves the balls. */
export function sampleScene(): { scene: Scene; update: (seconds: number) => void } {
  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 3, 2), Vector3.zero(), Vector3.axisPY());
  new Mesh(scene, new PlaneShape({ size: 20 }), lambert(0.35, 0.4, 0.45));
  const pillar = new BoxShape({ sizeX: 1, sizeY: 3, sizeZ: 1 });
  for (let i = 0; i < 4; i++) {
    const p = new Mesh(scene, pillar, lambert(0.9, 0.75, 0.4));
    p.position.setXYZ(i % 2 ? 3 : -3, 1.5, i < 2 ? 3 : -3);
  }
  const ball = new SphereShape({ radius: 0.5 });
  const balls = [lambert(1, 0.3, 0.3), lambert(0.3, 1, 0.4), lambert(0.3, 0.5, 1)].map((m) => new Mesh(scene, ball, m));
  const update = (s: number): void => {
    balls.forEach((b, i) => {
      const a = s * (0.6 + i * 0.25) + (i * Math.PI * 2) / 3;
      b.position.setXYZ(Math.cos(a) * 4.5, 0.5 + Math.abs(Math.sin(s * 2 + i)) * 1.5, Math.sin(a) * 4.5);
    });
  };
  return { scene, update };
}
