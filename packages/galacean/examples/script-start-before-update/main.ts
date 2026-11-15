// Every onStart runs before the frame's onUpdate calls
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};

class Counter extends Script {
  updateCount = 0;
  override onStart(): void {
    this.updateCount = 0;
    sink(`${this.entity.name}.onStart`);
  }
  override onUpdate(): void {
    this.updateCount++;
    if (this.updateCount === 1) sink(`${this.entity.name}.onUpdate`);
  }
}

class Reader extends Script {
  other?: Counter;
  override onStart(): void {
    this.other = this.engine.sceneManager.activeScene.findEntityByName('A')?.getComponent(Counter) ?? undefined;
    sink(`${this.entity.name}.onStart   reads A.updateCount = ${this.other?.updateCount}`);
  }
  override onUpdate(): void {
    this.entity.transform.rotate(0, this.other ? (this.other.updateCount % 120) * 0.02 + 0.3 : 0, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Rebuild adds the scripts again and logs the first frame in order.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 7]);
  const log = eventLog(stage, 9);
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  const made: Entity[] = [];
  const build = (): void => {
    for (const e of made.splice(0)) e.destroy();
    log.clear();
    const mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
    const a = solid(root, mesh, phong(engine, PALETTE.amber), [-1.8, 0, 0], 'A');
    const b = solid(root, mesh, phong(engine, PALETTE.cyan), [1.8, 0, 0], 'B');
    made.push(a, b);
    a.addComponent(Counter);
    b.addComponent(Reader);
  };
  build();
  if (!stage.preview) button(stage.bar, 'Rebuild', build);
  let last = 0;
  tick(root, (dt, t) => {
    if (stage.preview && t - last > 3.5) {
      last = t;
      build();
    }
    made[0]?.transform.rotate(0, 90 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
