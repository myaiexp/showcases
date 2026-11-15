// mergeScenes(source, dest): two scenes become one before being added
import { DirectLight, PrimitiveMesh, Scene } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { addCamera, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Source holds amber cubes, dest holds the camera, light and cyan cubes.' });
  const { engine, root } = stage;
  const manager = engine.sceneManager;
  const mesh = PrimitiveMesh.createCuboid(engine, 0.9, 0.9, 0.9);
  const info = panel(stage);
  let dest: Scene | undefined;
  let source: Scene | undefined;
  let merged = false;

  const build = (): void => {
    source = new Scene(engine, 'source');
    const rootA = source.createRootEntity('sourceRoot');
    for (const x of [-1.5, 0, 1.5]) solid(rootA, mesh, phong(engine, PALETTE.amber), [x, 1.1, 0], 'amber');
    dest = new Scene(engine, 'dest');
    dest.background.solidColor.set(0.03, 0.04, 0.07, 1);
    const rootB = dest.createRootEntity('destRoot');
    addCamera(rootB, [0, 1.2, 6.5], [0, 0.2, 0]);
    const light = rootB.createChild('light');
    light.transform.setRotation(-40, -35, 0);
    light.addComponent(DirectLight);
    dest.ambientLight.diffuseSolidColor.set(0.36, 0.38, 0.44, 1);
    for (const x of [-1.5, 0, 1.5]) solid(rootB, mesh, phong(engine, PALETTE.cyan), [x, -0.3, 0], 'cyan');
    info.text(`source.rootEntities ${source.rootEntitiesCount}  dest.rootEntities ${dest.rootEntitiesCount}\nmergeScenes(source, dest) ...`);
    merged = false;
  };
  const step = (): void => {
    if (!dest) return build();
    if (!merged) {
      manager.mergeScenes(source!, dest);
      manager.addScene(dest);
      merged = true;
      info.text(`merged: dest.rootEntities ${dest.rootEntitiesCount}, cubes ${dest.getRootEntity(0)?.childCount ?? 0} + ${dest.getRootEntity(1)?.childCount ?? 0}\naddScene(dest)`);
    } else {
      manager.removeScene(dest);
      dest.destroy();
      dest = undefined;
      source?.destroy();
      source = undefined;
      step();
    }
  };
  build();
  if (!stage.preview) button(stage.bar, 'Next (merge / reset)', step);
  let last = 0;
  tick(root, (dt, t) => {
    if (stage.preview && t - last > 2) {
      last = t;
      step();
    }
    for (const top of dest?.rootEntities ?? []) for (const cube of top.children) if (cube.name !== 'camera' && cube.name !== 'light') cube.transform.rotate(0, 40 * dt, 0);
  });
  stage.own(() => {
    source?.destroy();
    if (dest) {
      if (manager.scenes.includes(dest)) manager.removeScene(dest);
      dest.destroy();
    }
  });
  return stage.dispose;
};

export default mount;
