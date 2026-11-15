// A triangle filled by hand: named vertex buffers, an index buffer, vertexColor and cullMode
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, getEngine, getInput, Mesh, OrbitCameraController, PerspectiveCamera, Primitive, Scene, UnlitMaterial } from '@zephyr3d/scene';
import { select, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const material = new UnlitMaterial();
  // A lone triangle has one face: with the winding it is drawn in, the back is culled unless told otherwise.
  material.cullMode = 'none';
  // Vertex colours take part in shading only when asked for
  material.vertexColor = true;

  const triangle = new Primitive();
  // The buffer's name is its purpose: position as three float32, diffuse as four normalised uint8
  const vertices = myApp.device.createVertexBuffer('position_f32x3', new Float32Array([2, -2, 0, 0, 2, 0, -2, -2, 0]));
  const diffuse = myApp.device.createVertexBuffer('diffuse_u8normx4', new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255]));
  const indices = myApp.device.createIndexBuffer(new Uint16Array([0, 1, 2]));
  triangle.setVertexBuffer(vertices!);
  triangle.setVertexBuffer(diffuse!);
  triangle.setIndexBuffer(indices);
  const mesh = new Mesh(scene, triangle, material);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 100);
  scene.mainCamera.lookAt(new Vector3(0, 0, 6), Vector3.zero(), new Vector3(0, 1, 0));
  scene.mainCamera.controller = new OrbitCameraController();
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  myApp.on('tick', (_dt, ms) => {
    mesh.rotation.fromEulerAngle(0, ms * 0.0007, 0);
  });
  if (stage.bar) {
    toggle(stage.bar, 'vertexColor', true, (v) => (material.vertexColor = v));
    select(stage.bar, 'cullMode', ['none', 'back', 'front'] as const, 'none', (v) => (material.cullMode = v));
  } else {
    stage.caption('position_f32x3 + diffuse_u8normx4 + a Uint16 index buffer');
  }
  myApp.run();
});
