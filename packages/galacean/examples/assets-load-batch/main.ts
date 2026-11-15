// load([...]) resolves to an array in the order of the items, whatever order they finish in
import { AssetType, type GLTFResource, type Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeGltfUrl, pictureFrame, pngBlobUrl, releaseUrls, tile } from '../../shared/assets-kit.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { loadStudioEnv } from '../../shared/env.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Items: texture 1, texture 2, glTF, texture 3. The array comes back in that order.' });
  const { engine, root, scene } = stage;
  stage.own(releaseUrls);
  lit(stage, [0, 1, 9]);
  scene.ambientLight = await loadStudioEnv(engine);
  const urls = await Promise.all([pngBlobUrl(128, tile('1', 0)), pngBlobUrl(512, tile('2', 120)), pngBlobUrl(64, tile('3', 240))]);
  const results = (await engine.resourceManager.load([
    { type: AssetType.Texture2D, url: urls[0]! },
    { type: AssetType.Texture2D, url: urls[1]! },
    { type: AssetType.GLTF, url: cubeGltfUrl([0.3, 0.7, 0.9]) },
    { type: AssetType.Texture2D, url: urls[2]! },
  ])) as [Texture2D, Texture2D, GLTFResource, Texture2D];
  if (ctx.signal.aborted) return stage.dispose;
  const [t1, t2, model, t3] = results;
  const spots = [-3.9, -1.3, 1.3, 3.9];
  const frames = [pictureFrame(root, engine, t1, 2, [spots[0]!, 0, 0]), pictureFrame(root, engine, t2, 2, [spots[1]!, 0, 0]), null, pictureFrame(root, engine, t3, 2, [spots[3]!, 0, 0])];
  const cube = model.instantiateSceneRoot();
  cube.transform.setPosition(spots[2]!, 0, 0);
  root.addChild(cube);
  panel(stage, 'bl').text(`const [a, b, c, d] = await load([...four items])\nsizes ${t1.width}, ${t2.width}, glTF, ${t3.width}`);
  tick(root, (dt, t) => {
    frames.forEach((f, i) => f?.transform.setRotation(90 - Math.sin(t + i) * 20, 0, 0));
    cube.transform.rotate(25 * dt, 50 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
