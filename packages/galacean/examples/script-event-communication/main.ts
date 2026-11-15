// engine.on, once, dispatch and off for scripts talking to each other
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};

class Listener extends Script {
  private readonly onTrigger = (...args: unknown[]): void => {
    sink(`on 'Trigger'  ${JSON.stringify(args[0])}`);
    this.entity.transform.rotate(0, 45, 0);
  };
  override onAwake(): void {
    this.engine.on('Trigger', this.onTrigger);
    this.engine.once('TriggerOnce', (...args: unknown[]) => sink(`once 'TriggerOnce'  ${JSON.stringify(args[0])}`));
  }
  override onDestroy(): void {
    this.engine.off('Trigger', this.onTrigger);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: "The listener script registers 'Trigger' with on and 'TriggerOnce' with once; the buttons dispatch from outside." });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const log = eventLog(stage, 9);
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  const cube: Entity = solid(root, PrimitiveMesh.createCuboid(engine, 1.5, 1.5, 1.5), phong(engine, PALETTE.green));
  cube.addComponent(Listener);
  let n = 0;
  const fire = (): void => {
    log.log(`dispatch('Trigger', { eventData: 'mydata ${++n}' })`);
    engine.dispatch('Trigger', { eventData: `mydata ${n}` });
  };
  const fireOnce = (): void => {
    log.log("dispatch('TriggerOnce', { count: " + n + ' })');
    engine.dispatch('TriggerOnce', { count: n });
  };
  const unlisten = (): void => {
    log.log("engine.off('Trigger')  (all listeners)");
    engine.off('Trigger');
  };
  if (!stage.preview) {
    button(stage.bar, "dispatch 'Trigger'", fire);
    button(stage.bar, "dispatch 'TriggerOnce'", fireOnce);
    button(stage.bar, "off 'Trigger'", unlisten);
  }
  let last = 0;
  let step = 0;
  tick(root, (_dt, t) => {
    if (stage.preview && t - last > 1.1) {
      last = t;
      const phase = step++ % 6;
      if (phase === 5) {
        unlisten();
        engine.on('Trigger', (...a: unknown[]) => sink(`on 'Trigger' ${JSON.stringify(a[0])}`)); // listen again for the next loop
      } else if (phase === 2 || phase === 3) fireOnce();
      else fire();
    }
  });
  return stage.dispose;
};

export default mount;
