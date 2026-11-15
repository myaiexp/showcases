// Static batching: meshes under a BatchGroup keep a cached batch instead of re-batching per frame
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BatchGroup,
  DirectionalLight,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 1), Vector3.zero(), Vector3.axisPY());

  // Create a batch group parent node
  const batchGroup = new BatchGroup(scene);
  const rockShape = new SphereShape({ radius: 0.35, verticalDetail: 6, horizonalDetail: 8 });
  const rockMaterial = new LambertMaterial();
  const count = stage.preview ? 1500 : 6000;
  const rocks: Mesh[] = [];
  for (let i = 0; i < count; i++) {
    // The first argument is always the owning scene; joining the group is done by setting parent
    const rock = new Mesh(scene);
    rock.parent = batchGroup;
    rock.primitive = rockShape;
    const m = rockMaterial.createInstance();
    m.albedoColor = new Vector4(0.45 + 0.3 * ((i * 7) % 10) / 10, 0.42, 0.38, 1);
    rock.material = m;
    // A golden-angle spiral: a fixed, even scatter
    const r = Math.sqrt(i / count) * 30;
    const a = i * 2.39996;
    rock.position.setXYZ(Math.cos(a) * r, 0, Math.sin(a) * r);
    rocks.push(rock);
  }

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 300);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 28, 38), Vector3.zero(), Vector3.axisPY());
  camera.controller = new OrbitCameraController();
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  let grouped = true;
  myApp.on('tick', (_dt, elapsed) => {
    // Moving meshes updates the cached batch in place; only adding, removing or hiding rebuilds it
    const t = elapsed * 0.0015;
    for (let i = 0; i < rocks.length; i += 1) {
      const p = rocks[i]!.position;
      p.y = 0.5 * Math.sin(t + Math.hypot(p.x, p.z) * 0.35);
    }
    const info = myApp.device.frameInfo;
    stage.caption(`${grouped ? 'BatchGroup' : 'no group'}: ${count} meshes, ${info.drawCalls} draw calls, CPU ${info.elapsedTimeCPU.toFixed(1)} ms`);
  });
  if (stage.bar) {
    toggle(stage.bar, 'under BatchGroup', true, (v) => {
      grouped = v;
      // Re-parenting is a content change: done once here, never every frame
      for (const r of rocks) r.parent = v ? batchGroup : scene.rootNode;
    });
  }
  myApp.run();
});
