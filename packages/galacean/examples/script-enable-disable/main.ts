// onEnable and onDisable fire for the script's enabled flag, its entity's isActive and an ancestor's isActive
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};

class Watcher extends Script {
  override onEnable(): void {
    sink('onEnable');
  }
  override onDisable(): void {
    sink('onDisable');
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Each step flips one switch; the log shows the hook it triggers.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const log = eventLog(stage, 9);
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  const parent = root.createChild('parent');
  const child: Entity = solid(parent, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), phong(engine, PALETTE.green));
  const watcher = child.addComponent(Watcher);
  const steps: { text: string; run(): void }[] = [
    { text: 'watcher.enabled = false', run: () => (watcher.enabled = false) },
    { text: 'watcher.enabled = true', run: () => (watcher.enabled = true) },
    { text: 'child.isActive = false', run: () => (child.isActive = false) },
    { text: 'child.isActive = true', run: () => (child.isActive = true) },
    { text: 'parent.isActive = false  (an ancestor)', run: () => (parent.isActive = false) },
    { text: 'parent.isActive = true', run: () => (parent.isActive = true) },
  ];
  let index = 0;
  const next = (): void => {
    const step = steps[index]!;
    log.log(`> ${step.text}`);
    step.run();
    index = (index + 1) % steps.length;
  };
  if (!stage.preview) button(stage.bar, 'Next switch', next);
  let last = 0;
  tick(root, (dt, t) => {
    if (stage.preview && t - last > 1.2) {
      last = t;
      next();
    }
    child.transform.rotate(0, 50 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
