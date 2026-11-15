// Rendering benchmark in miniature: many instantiated glTF models under ten point lights
import { AssetType, type Entity, type GLTFResource, PointLight } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeGltfUrl, releaseUrls } from '../../shared/assets-kit.ts';
import { slider } from '../../shared/controls.ts';
import { addCamera, createStage } from '../../shared/stage.ts';
import { tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';

const LIGHTS = 10;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Software rendering in headless browsers is slow; on a real GPU hundreds of models run smoothly.' });
  const { engine, root, scene } = stage;
  stage.own(releaseUrls);
  addCamera(root, [0, 9, 17], [0, 0, 0]);
  scene.ambientLight.diffuseSolidColor.set(0.12, 0.13, 0.16, 1);
  const gltf = await engine.resourceManager.load<GLTFResource>({ type: AssetType.GLTF, url: cubeGltfUrl([0.85, 0.85, 0.9], 0.45) });
  if (ctx.signal.aborted) return stage.dispose;
  const models: Entity[] = [];
  const grid = root.createChild('grid');
  const place = (count: number): void => {
    while (models.length < count) {
      const m = gltf.instantiateSceneRoot();
      grid.addChild(m);
      models.push(m);
    }
    while (models.length > count) models.pop()!.destroy();
    const side = Math.ceil(Math.sqrt(count));
    models.forEach((m, i) => m.transform.setPosition(((i % side) - (side - 1) / 2) * 1.3, 0, (Math.floor(i / side) - (side - 1) / 2) * 1.3));
  };
  const initial = stage.preview ? 36 : 100;
  place(initial);
  if (!stage.preview) slider(stage.bar, 'models', 10, 400, 10, initial, place);
  const lights = Array.from({ length: LIGHTS }, (_, i) => {
    const e = root.createChild(`light ${i}`);
    const light = e.addComponent(PointLight);
    light.distance = 7;
    light.color.set(0.5 + 0.5 * Math.sin(i * 1.3), 0.5 + 0.5 * Math.sin(i * 2.1 + 2), 0.5 + 0.5 * Math.sin(i * 0.7 + 4), 1);
    return e;
  });
  const info = panel(stage, 'bl');
  let smooth = 0;
  tick(root, (_dt, t) => {
    smooth = smooth * 0.95 + engine.time.actualDeltaTime * 1000 * 0.05;
    lights.forEach((e, i) => e.transform.setPosition(Math.cos(t * 0.6 + i) * (3 + (i % 3)), 1.2, Math.sin(t * 0.6 + i * 1.7) * (3 + (i % 3))));
    grid.transform.setRotation(0, t * 6, 0);
    info.text(`${models.length} models, ${LIGHTS} point lights\nframe time ${smooth.toFixed(1)} ms`);
  });
  return stage.dispose;
};

export default mount;
