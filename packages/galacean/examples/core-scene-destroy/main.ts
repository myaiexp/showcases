// scene.destroy() removes the scene from sceneManager.scenes by itself
import { DirectLight, PrimitiveMesh, Scene, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { addCamera, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Four scenes, one quadrant each. Destroy them one by one, then they respawn.' });
  const { engine, root, scene } = stage;
  const manager = engine.sceneManager;
  const mesh = PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2);
  const colors = [PALETTE.red, PALETTE.green, PALETTE.blue, PALETTE.amber];
  const made: Scene[] = [];
  const spawn = (i: number): void => {
    const s = i === 0 ? scene : new Scene(engine, `scene ${i + 1}`);
    const r = i === 0 ? root : s.createRootEntity(`root ${i}`);
    const camera = addCamera(r, [0, 1.5, 4.5]);
    camera.viewport = new Vector4((i % 2) * 0.5, i < 2 ? 0.5 : 0, 0.5, 0.5);
    const light = r.createChild('light');
    light.transform.setRotation(-40, -35, 0);
    light.addComponent(DirectLight);
    solid(r, mesh, phong(engine, colors[i]!), [0, 0, 0], 'cube').transform.setRotation(20, 30, 0);
    s.background.solidColor.set(0.02 + i * 0.01, 0.025, 0.04, 1);
    if (i > 0) manager.addScene(s);
    made[i] = s;
  };
  [0, 1, 2, 3].forEach(spawn);
  const info = panel(stage);
  const show = (): void => info.text(`sceneManager.scenes.length = ${manager.scenes.length}`);
  let alive = 3;
  const kill = (): void => {
    if (alive === 0) {
      [1, 2, 3].forEach(spawn);
      alive = 3;
    } else {
      made[alive]?.destroy();
      alive--;
    }
    show();
  };
  if (!stage.preview) button(stage.bar, 'scene.destroy() next scene', kill);
  show();
  let last = 0;
  tick(root, (dt, t) => {
    if (stage.preview && t - last > 1.2) {
      last = t;
      kill();
    }
    for (const s of made) s?.getRootEntity()?.findByName('cube')?.transform.rotate(0, 60 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
