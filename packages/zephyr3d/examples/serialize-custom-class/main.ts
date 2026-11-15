// registerClass makes a plain class serializable: a settings object round-trips through JSON
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { SerializableClass } from '@zephyr3d/scene';
import { Application, DirectionalLight, getEngine, LambertMaterial, Mesh, PerspectiveCamera, Scene, TorusShape } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

class GameSettings {
  speed = 1;
}

// A registration: the class name, its constructor and accessors for each saved property
const gameSettingsClass: SerializableClass = {
  name: 'GameSettings',
  ctor: GameSettings,
  getProps() {
    return [
      {
        name: 'speed',
        // 'float' values use the num lane. The accessor types don't narrow on `type`, hence the casts.
        type: 'float',
        get(this: GameSettings, value) {
          (value as unknown as { num: number[] }).num[0] = this.speed;
        },
        set(this: GameSettings, value) {
          this.speed = (value as unknown as { num: number[] }).num[0]!;
        },
      },
    ];
  },
};

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const resources = getEngine().resourceManager;
  resources.registerClass(gameSettingsClass);

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 2), Vector3.zero(), Vector3.axisPY());
  const m = new LambertMaterial();
  m.albedoColor = new Vector4(0.95, 0.6, 0.2, 1);
  const ring = new Mesh(scene, new TorusShape({ outerRadius: 1.2, innerRadius: 0.35, numSlices: 48, numSegments: 16 }), m);
  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 1.5, 4.5), Vector3.zero(), Vector3.axisPY());
  getEngine().setRenderable(scene, 0);

  // The settings the ring spins by: always the latest object restored from JSON
  let settings = new GameSettings();
  let angle = 0;
  myApp.on('tick', (dt) => {
    angle += dt * 0.001 * settings.speed;
    ring.rotation.fromEulerAngle(0.6, angle, 0);
  });

  const out = stage.readout();
  // Serialize, change the JSON as a save file would, and deserialize into a new object
  stage.every(2000, async (i) => {
    const data = await resources.serializeObject(settings);
    const json = JSON.parse(JSON.stringify(data)) as Record<string, unknown>;
    const edited = JSON.stringify(json).replace(/("speed"\s*:\s*)(-?[\d.e+-]+)/, `$1${[0.5, 2, 4, -1.5][i % 4]}`);
    const restored = await resources.deserializeObject<GameSettings>(null, JSON.parse(edited) as Record<string, unknown>);
    if (!restored) return;
    settings = restored;
    stage.caption(`deserializeObject → GameSettings { speed: ${settings.speed} }`);
    if (out) out.textContent = `serializeObject(settings):\n${JSON.stringify(data, null, 2)}\n\nedited and deserialized:\n${edited}`;
  });
  myApp.run();
});
