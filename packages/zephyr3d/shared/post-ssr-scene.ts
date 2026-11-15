// The reflection scene for the SSR examples: a polished floor, a row of balls from smooth to rough, a tall box
import { Vector3 } from '@zephyr3d/base';
import { BoxShape, DirectionalLight, Mesh, PlaneShape, SphereShape, type Scene } from '@zephyr3d/scene';
import { pbr } from './post-scene.ts';

/** Returns the balls, so a card can bob them. The floor's roughness is the one SSR looks at (ssrMaxRoughness). */
export function reflectionScene(scene: Scene, floorRoughness = 0.08): { balls: Mesh[] } {
  scene.env.sky.skyType = 'scatter';
  scene.env.light.type = 'ibl';
  scene.env.light.strength = 0.6;
  new DirectionalLight(scene).lookAt(new Vector3(8, 10, 6), Vector3.zero(), Vector3.axisPY());

  new Mesh(scene, new PlaneShape({ size: 40 }), pbr(0.15, 0.17, 0.2, 1, floorRoughness));
  const balls: Mesh[] = [];
  const ball = new SphereShape({ radius: 0.8 });
  for (let i = 0; i < 5; i++) {
    const m = new Mesh(scene, ball, pbr(0.95, 0.35 + i * 0.12, 0.25, 0.1, 0.05 + i * 0.22));
    m.position.setXYZ(-4 + i * 2, 0.8, 0);
    balls.push(m);
  }
  const tower = new Mesh(scene, new BoxShape({ sizeX: 1.2, sizeY: 4, sizeZ: 1.2 }), pbr(0.2, 0.6, 0.9, 0, 0.5));
  tower.position.setXYZ(0, 2, -3.5);
  return { balls };
}
