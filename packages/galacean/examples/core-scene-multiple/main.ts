// Two scenes rendered at once: addScene and removeScene, each scene with its own camera viewport
import { DirectLight, PrimitiveMesh, Scene, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { addCamera, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Both scenes share one engine and canvas; each camera owns half of it.' });
  const { engine, root, scene } = stage;
  const manager = engine.sceneManager;
  const mesh = PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4);

  const build = (s: Scene, color: readonly [number, number, number], half: 0 | 1): void => {
    const rootEntity = s.getRootEntity() ?? s.createRootEntity('root');
    const camera = addCamera(rootEntity, [0, 1.5, 5]);
    camera.viewport = new Vector4(half * 0.5, 0, 0.5, 1);
    const light = rootEntity.createChild('light');
    light.transform.setRotation(-40, -35, 0);
    light.addComponent(DirectLight);
    s.ambientLight.diffuseSolidColor.set(0.35, 0.37, 0.42, 1);
    solid(rootEntity, mesh, phong(engine, color), [0, 0, 0], 'cube');
  };
  build(scene, PALETTE.amber, 0);
  const second = new Scene(engine, 'second');
  second.background.solidColor.set(0.04, 0.02, 0.08, 1);
  build(second, PALETTE.violet, 1);
  manager.addScene(second);

  const info = panel(stage);
  const show = (): void => info.text(`sceneManager.scenes.length = ${manager.scenes.length}\n${manager.scenes.map((s) => s.name || 'scene').join(', ')}`);
  const toggle = (): void => {
    if (manager.scenes.includes(second)) manager.removeScene(second);
    else manager.addScene(second);
    show();
  };
  if (!stage.preview) button(stage.bar, 'addScene / removeScene (second)', toggle);
  show();
  const timer = stage.preview ? setInterval(toggle, 1800) : undefined;
  stage.own(() => {
    clearInterval(timer);
    if (manager.scenes.includes(second)) manager.removeScene(second);
    second.destroy();
  });
  tick(root, (dt) => {
    for (const s of [scene, second]) s.getRootEntity()?.findByName('cube')?.transform.rotate(25 * dt, 45 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
