// saveScene writes the whole scene as JSON into the VFS; loadScene builds a new one from it
import { MemoryFS, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  DirectionalLight,
  getEngine,
  LambertMaterial,
  Mesh,
  PerspectiveCamera,
  PlaneShape,
  Scene,
} from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS: new MemoryFS() } });
  await myApp.ready();
  const resources = getEngine().resourceManager;

  // The live scene: a tower of boxes that the tick handler keeps twisting
  const live = new Scene();
  const light = new DirectionalLight(live);
  light.lookAt(new Vector3(1, 2, 1.5), Vector3.zero(), Vector3.axisPY());
  new Mesh(live, new PlaneShape({ size: 12 }), new LambertMaterial());
  const box = new BoxShape({ sizeX: 2, sizeY: 0.4, sizeZ: 0.6 });
  const blocks: Mesh[] = [];
  for (let i = 0; i < 10; i++) {
    const m = new LambertMaterial();
    m.albedoColor = new Vector4(0.3 + i * 0.07, 0.5, 1 - i * 0.07, 1);
    const b = new Mesh(live, box, m);
    b.position.setXYZ(0, 0.2 + i * 0.42, 0);
    blocks.push(b);
  }
  const camera = new PerspectiveCamera(live, Math.PI / 3, 0.1, 100);
  live.mainCamera = camera;
  camera.lookAt(new Vector3(5, 4.5, 6), new Vector3(0, 2, 0), Vector3.axisPY());
  getEngine().setRenderable(live, 0);

  let twist = 0;
  myApp.on('tick', (dt) => {
    twist += dt * 0.0008;
    blocks.forEach((b, i) => b.rotation.fromEulerAngle(0, twist * (i + 1) * 0.3, 0));
  });

  const out = stage.readout();
  const save = async (): Promise<void> => {
    await resources.saveScene(live, '/scenes/tower.json');
    const json = (await getEngine().VFS.readFile('/scenes/tower.json', { encoding: 'utf8' })) as string;
    if (out) out.textContent = `saveScene → /scenes/tower.json (${json.length} bytes)`;
    stage.caption('saved: showing the live scene');
  };
  const load = async (): Promise<void> => {
    // A new Scene object built from the file, with the twist frozen as it was when saved
    const restored = await resources.loadScene('/scenes/tower.json');
    if (!restored) return;
    getEngine().setRenderable(restored, 0);
    stage.caption('loadScene: showing the restored copy (frozen)');
    // Back to the live scene after a moment, so the difference shows
    setTimeout(() => getEngine().setRenderable(live, 0), 2000);
  };
  await save();
  if (stage.bar) {
    button(stage.bar, 'saveScene', () => void save());
    button(stage.bar, 'loadScene', () => void load());
  } else {
    stage.every(3500, (i) => void (i % 2 ? load() : save()));
  }
  myApp.run();
});
