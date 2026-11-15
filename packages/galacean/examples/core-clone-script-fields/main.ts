// A cloned Script copies primitives by value and a Vector3 by reference
import { type Entity, PrimitiveMesh, Script, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

class CustomScript extends Script {
  /** boolean: spin or not. */
  a = false;
  /** number: spin speed. */
  b = 1;
  /** class type: the cube's scale. */
  c = new Vector3(1, 1, 1);
  override onUpdate(dt: number): void {
    if (this.a) this.entity.transform.rotate(0, this.b * 60 * dt, 0);
    this.entity.transform.setScale(this.c.x, this.c.y, this.c.z);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Step 3 edits only the clone, yet the original changes too: both scripts hold the same Vector3.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 2, 8]);
  const tag = labels(stage, camera);
  const mesh = PrimitiveMesh.createCuboid(engine, 1.2, 1.2, 1.2);
  const original = solid(root, mesh, phong(engine, PALETTE.amber), [-1.8, 0, 0], 'original');
  const script = original.addComponent(CustomScript);
  script.a = true;
  script.b = 2;
  script.c.set(1, 1, 1);
  let copy: Entity | undefined;
  const names = [tag.add('original', '#ffd36b'), tag.add('clone', '#7fe3f0')];
  const info = panel(stage);
  const steps = [
    { text: 'script.a = true; script.b = 2; script.c.set(1, 1, 1)', run: () => copy?.destroy() },
    {
      text: 'const clone = entity.clone()  // a, b copied by value, c by reference',
      run: () => {
        copy = original.clone();
        copy.name = 'clone';
        copy.transform.setPosition(1.8, 0, 0);
        root.addChild(copy);
      },
    },
    { text: 'cloneScript.c.set(1.7, 0.5, 1.7)  // the original changes as well', run: () => copy?.getComponent(CustomScript)?.c.set(1.7, 0.5, 1.7) },
  ];
  let index = 0;
  const next = (): void => {
    if (index === 0) script.c.set(1, 1, 1);
    steps[index]!.run();
    index = (index + 1) % steps.length;
  };
  if (!stage.preview) button(stage.bar, 'Next step', next);
  next();
  let last = 0;
  tick(root, (_dt, t) => {
    if (stage.preview && t - last > 1.8) {
      last = t;
      next();
    }
    names[0]!.at(original.transform.worldPosition.clone().add(new Vector3(0, 1.4, 0)));
    if (copy && !copy.destroyed) names[1]!.at(copy.transform.worldPosition.clone().add(new Vector3(0, 1.4, 0)));
    else names[1]!.hide();
    const cs = copy?.getComponent(CustomScript);
    info.text(
      `${steps[(index + steps.length - 1) % steps.length]!.text}\n\noriginal a=${script.a} b=${script.b} c=(${script.c.x}, ${script.c.y}, ${script.c.z})` +
        (cs && copy && !copy.destroyed ? `\nclone    a=${cs.a} b=${cs.b} c=(${cs.c.x}, ${cs.c.y}, ${cs.c.z})  same Vector3: ${cs.c === script.c}` : ''),
    );
  });
  return stage.dispose;
};

export default mount;
