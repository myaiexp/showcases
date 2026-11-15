// onAwake and onEnable wait until the entity is active in the hierarchy
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};

class Late extends Script {
  override onAwake(): void {
    sink(`onAwake    (isActiveInHierarchy ${this.entity.isActiveInHierarchy})`);
  }
  override onEnable(): void {
    sink('onEnable');
  }
  override onStart(): void {
    sink('onStart');
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The entity starts inactive. Scripts added to it stay silent until isActive is true.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const log = eventLog(stage, 8);
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  let entity: Entity | undefined;
  const build = (): void => {
    log.clear();
    entity?.destroy();
    entity = solid(root, PrimitiveMesh.createSphere(engine, 0.8, 24), phong(engine, PALETTE.cyan));
    entity.isActive = false;
    entity.addComponent(Late);
    log.log('entity.isActive = false; addComponent(Late)  (nothing yet)');
  };
  const wake = (): void => {
    if (entity && !entity.isActive) {
      log.log('entity.isActive = true');
      entity.isActive = true;
    }
  };
  build();
  if (!stage.preview) {
    button(stage.bar, 'isActive = true', wake);
    button(stage.bar, 'Rebuild inactive', build);
  }
  let last = 0;
  let phase = 0;
  tick(root, (dt, t) => {
    if (stage.preview && t - last > 1.6) {
      last = t;
      phase = (phase + 1) % 2;
      if (phase === 0) build();
      else wake();
    }
    entity?.transform.rotate(0, 60 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
