// A Script logging its lifecycle hooks as the entity is created, disabled, enabled and destroyed
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};

class Probe extends Script {
  private updates = 0;
  override onAwake(): void {
    sink('onAwake');
  }
  override onEnable(): void {
    sink('onEnable');
  }
  override onStart(): void {
    sink('onStart');
  }
  override onUpdate(): void {
    if (++this.updates === 1) sink('onUpdate  (every frame)');
  }
  override onLateUpdate(): void {
    if (this.updates === 1) sink('onLateUpdate');
  }
  override onDisable(): void {
    sink('onDisable');
  }
  override onDestroy(): void {
    sink('onDestroy');
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The loop creates the entity, switches the script off and on, then destroys the entity.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const log = eventLog(stage, 9);
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  let entity: Entity | undefined;
  let probe: Probe | undefined;
  const steps: { text: string; run(): void }[] = [
    {
      text: 'addComponent(Probe)',
      run: () => {
        log.clear();
        entity = solid(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), phong(engine, PALETTE.amber));
        probe = entity.addComponent(Probe);
      },
    },
    { text: 'probe.enabled = false', run: () => ((probe!.enabled = false), log.log('-- enabled = false')) },
    { text: 'probe.enabled = true', run: () => ((probe!.enabled = true), log.log('-- enabled = true')) },
    { text: 'entity.destroy()', run: () => (log.log('-- entity.destroy()'), entity!.destroy()) },
  ];
  let index = 0;
  const next = (): void => {
    steps[index]!.run();
    index = (index + 1) % steps.length;
  };
  if (!stage.preview) button(stage.bar, 'Next step', next);
  next();
  let last = 0;
  tick(root, (_dt, t) => {
    if (t - last > (stage.preview ? 1.3 : 100000)) {
      last = t;
      next();
    }
    if (entity && !entity.destroyed) entity.transform.rotate(0, 1, 0);
  });
  return stage.dispose;
};

export default mount;
