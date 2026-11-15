// destroy() on a component or an entity calls onDestroy; the component is recycled at the frame's end
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};

class Mortal extends Script {
  override onUpdate(dt: number): void {
    this.entity.transform.rotate(0, 90 * dt, 0);
  }
  override onDestroy(): void {
    sink(`onDestroy on ${this.entity.name}`);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Step 1 destroys only the script (the cube stays, frozen); step 2 destroys the whole entity.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const log = eventLog(stage, 9);
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  let cube: Entity | undefined;
  let script: Mortal | undefined;
  let stage2 = 0;
  const steps = [
    () => {
      log.clear();
      cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), phong(engine, PALETTE.violet), [0, 0, 0], 'cube');
      script = cube.addComponent(Mortal);
      log.log('created cube with a Mortal script');
    },
    () => {
      log.log('script.destroy()');
      script!.destroy();
      log.log(`  right after: script.destroyed = ${script!.destroyed}`);
    },
    () => {
      log.log('cube.destroy()');
      cube!.destroy();
      log.log(`  right after: cube.destroyed = ${cube!.destroyed}`);
    },
  ];
  const next = (): void => {
    steps[stage2]!();
    stage2 = (stage2 + 1) % steps.length;
  };
  next();
  if (!stage.preview) button(stage.bar, 'Next step', next);
  let last = 0;
  tick(root, (_dt, t) => {
    if (stage.preview && t - last > 1.6) {
      last = t;
      next();
    }
  });
  return stage.dispose;
};

export default mount;
