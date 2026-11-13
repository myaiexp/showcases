// AssetContainer.instantiateModelsToScene as a template for duplicates
import { ArcRotateCamera, Color4, HemisphericLight, LoadAssetContainerAsync, Vector3 } from '@babylonjs/core';
import type { InstantiatedEntries, TransformNode } from '@babylonjs/core';
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { sampleGlb } from '../../shared/sample-model.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  registerBuiltInLoaders();
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.1, 13, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.04, 0.05, 0.09, 1);
  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.004;
  });

  // The template: loaded once and never added to the scene itself.
  const template = await LoadAssetContainerAsync(await sampleGlb(), scene);

  let cloneMaterials = false;
  let count = 0;
  const live: InstantiatedEntries[] = [];
  const SLOTS = 7;

  const spawn = (slot = count % SLOTS): void => {
    // nameFunction renames the clones; cloneMaterials gives each its own material copies.
    const entries = template.instantiateModelsToScene((name) => `p${count}-${name}`, cloneMaterials);
    const root = entries.rootNodes[0] as TransformNode;
    root.position.x = (slot - (SLOTS - 1) / 2) * 2.1;
    root.metadata = { slot };
    for (const group of entries.animationGroups) group.start(true, 1, group.from, group.to, false);
    live.push(entries);
    count++;
    update();
  };
  const disposeOldest = (): void => {
    live.shift()?.dispose(); // removes only what this call created
    update();
  };

  let readout: HTMLElement | undefined;
  const update = (): void => {
    if (readout) readout.textContent = `instances: ${live.length}  |  scene meshes: ${scene.meshes.length}  |  materials: ${scene.materials.length}`;
  };

  let timer = 0;
  if (ctx.preview) {
    for (let i = 0; i < 5; i++) spawn();
    timer = window.setInterval(() => {
      const slot = (live[0]?.rootNodes[0]?.metadata as { slot: number } | undefined)?.slot ?? 0;
      disposeOldest();
      spawn(slot);
    }, 1200);
  } else {
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    panel.check('cloneMaterials', cloneMaterials, (on) => (cloneMaterials = on));
    panel.button('instantiateModelsToScene()', () => spawn());
    panel.button('entries.dispose() on the oldest', disposeOldest);
    for (let i = 0; i < 3; i++) spawn();
  }

  return () => {
    window.clearInterval(timer);
    stage.dispose();
  };
};

export default mount;
