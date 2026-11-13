// AssetContainer add, remove and move all from the scene, with KeepAssets
import { ArcRotateCamera, AssetContainer, Color3, Color4, HemisphericLight, KeepAssets, LoadAssetContainerAsync, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  registerBuiltInLoaders();
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 9, new Vector3(0, 1.2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.004;
  });

  // Loaded into a container: the totem exists, but is not in the scene yet.
  const totem = await LoadAssetContainerAsync(await sampleGlb(), scene);
  for (const node of totem.rootNodes) (node as unknown as { position: Vector3 }).position.x = -2.5;

  // Hand-made props that live in the scene from the start.
  const crateMat = new StandardMaterial('crate-mat', scene);
  crateMat.diffuseColor = new Color3(0.6, 0.45, 0.25);
  [0, 1, 2].forEach((i) => {
    const crate = MeshBuilder.CreateBox(`crate${i}`, { size: 0.9 }, scene);
    crate.position.set(1.8 + i * 1.1, 0.45, (i - 1) * 0.6);
    crate.material = crateMat;
  });
  const shelf = new AssetContainer(scene);

  let totemIn = false;
  const toggleTotem = (): void => {
    if (totemIn) totem.removeAllFromScene();
    else totem.addAllToScene();
    totemIn = !totemIn;
    update();
  };

  let readout: HTMLElement | undefined;
  const update = (): void => {
    if (readout) readout.textContent = `scene meshes: ${scene.meshes.length}  |  totem container meshes: ${totem.meshes.length}  |  shelf container meshes: ${shelf.meshes.length}`;
  };

  let timer = 0;
  if (ctx.preview) {
    toggleTotem();
    timer = window.setInterval(toggleTotem, 1300);
  } else {
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    panel.button('totem.addAllToScene()', () => {
      if (!totemIn) toggleTotem();
    });
    panel.button('totem.removeAllFromScene()', () => {
      if (totemIn) toggleTotem();
    });
    panel.row();
    panel.button('shelf.moveAllFromScene(keep)', () => {
      if (totemIn) toggleTotem(); // the totem has its own container
      // Everything else except the camera and the light goes into the shelf and leaves the scene.
      const keep = new KeepAssets();
      keep.cameras.push(camera);
      keep.lights.push(...scene.lights);
      shelf.moveAllFromScene(keep);
      update();
    });
    panel.button('shelf.addAllToScene()', () => {
      shelf.addAllToScene();
      update();
    });
    update();
  }

  return () => {
    window.clearInterval(timer);
    stage.dispose();
  };
};

export default mount;
