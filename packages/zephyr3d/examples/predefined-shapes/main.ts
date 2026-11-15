// The built-in shapes: SphereShape, BoxShape, PlaneShape and CylinderShape with Lambert materials
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  CylinderShape,
  DirectionalLight,
  Mesh,
  PlaneShape,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { lambert, orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1.5, 1), Vector3.zero(), Vector3.axisPY());

  // One primitive and one material per mesh: new Mesh(scene, primitive, material)
  const sphereShape = new SphereShape({ radius: 1 });
  const sphere = new Mesh(scene, sphereShape, lambert(1, 0.35, 0.3));
  sphere.position.setXYZ(-4.5, 0, 0);
  const box = new Mesh(scene, new BoxShape({ size: 1.8 }), lambert(0.95, 0.85, 0.2));
  box.position.setXYZ(-1.5, 0, 0);
  const plane = new Mesh(scene, new PlaneShape({ size: 2.4 }), lambert(0.3, 0.8, 0.5));
  plane.position.setXYZ(1.5, 0, 0);
  const cylinderShape = new CylinderShape({ topRadius: 1, bottomRadius: 1, height: 2 });
  const cylinder = new Mesh(scene, cylinderShape, lambert(0.4, 0.55, 1));
  cylinder.position.setXYZ(4.5, 0, 0);

  const camera = orbitCamera(scene, new Vector3(0, 3.5, 9), 100);
  camera.near = 0.1;

  myApp.on('tick', (_dt, ms) => {
    const a = ms * 0.0006;
    sphere.rotation.fromEulerAngle(0.3, a, 0);
    box.rotation.fromEulerAngle(0.4, a, 0.2);
    plane.rotation.fromEulerAngle(-0.9, a, 0);
    cylinder.rotation.fromEulerAngle(0.5, a, 0);
  });

  if (stage.bar) {
    // A shape's creation options can be changed afterwards; it rebuilds its vertex data.
    slider(stage.bar, 'sphere detail', [3, 40, 1], 20, (v) => (sphereShape.options = { verticalDetail: v, horizonalDetail: v }));
    slider(stage.bar, 'cylinder topRadius', [0, 1.5, 0.1], 1, (v) => (cylinderShape.options = { topRadius: v }));
    slider(stage.bar, 'cylinder radialDetail', [3, 40, 1], 20, (v) => (cylinderShape.options = { radialDetail: v }));
  } else {
    stage.caption('SphereShape, BoxShape, PlaneShape, CylinderShape');
  }
  myApp.run();
});
