// World-space results: getWorldPosition, worldMatrix and the world bounding volume of a child node
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoxShape, DirectionalLight, Mesh, Scene, SphereShape, UnlitMaterial } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { floor, lambert, orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1.5, 1), Vector3.zero(), Vector3.axisPY());
  floor(scene, lambert(0.35, 0.4, 0.45), 30);

  // pivot turns; planet is its child, so planet.position is local but its world position orbits
  const pivot = new Mesh(scene, new BoxShape({ size: 0.4 }), lambert(1, 0.9, 0.2));
  pivot.position.setXYZ(0, 2, 0);
  const planet = new Mesh(scene, new SphereShape({ radius: 0.7 }), lambert(0.3, 0.6, 1));
  planet.parent = pivot;
  planet.position.setXYZ(4, 0, 0);
  planet.scale.setXYZ(1, 1, 1);

  // A translucent box drawn at the world bounding box of the planet
  const glass = new UnlitMaterial();
  glass.albedoColor = new Vector4(1, 0.5, 0.2, 0.3);
  glass.blendMode = 'blend';
  const boundsBox = new Mesh(scene, new BoxShape({ size: 1 }), glass);
  boundsBox.castShadow = false;

  orbitCamera(scene, new Vector3(0, 7, 12), 100, new Vector3(0, 1.5, 0));

  const out = stage.readout();
  let stretch = 1;
  myApp.on('tick', (_dt, ms) => {
    pivot.rotation.fromEulerAngle(ms * 0.0003, ms * 0.0006, 0);
    planet.scale.setXYZ(stretch, 1, 1);
    // World-space position and bounding volume follow the parent's rotation
    const wp = planet.getWorldPosition();
    const aabb = planet.getWorldBoundingVolume()?.toAABB();
    if (aabb) {
      boundsBox.position.set(aabb.center);
      boundsBox.scale.set(aabb.size);
    }
    if (out) {
      const m = planet.worldMatrix;
      out.textContent = [
        `planet.position (local)   ${fmt(planet.position)}`,
        `planet.getWorldPosition() ${fmt(wp)}`,
        `worldMatrix translation   ${m ? fmt(new Vector3(m.m03, m.m13, m.m23)) : '-'}`,
        `world AABB size           ${aabb ? fmt(aabb.size) : '-'}`,
      ].join('\n');
    }
  });

  if (stage.bar) {
    slider(stage.bar, 'planet scale x', [0.5, 3, 0.1], 1, (v) => (stretch = v));
  } else {
    stage.caption('local position vs world position; the box is the world bounding volume');
    stage.every(2500, (i) => (stretch = i % 2 ? 2.2 : 1));
  }
  myApp.run();
});

function fmt(v: { x: number; y: number; z: number }): string {
  return [v.x, v.y, v.z].map((n) => n.toFixed(2).padStart(6)).join(' ');
}
