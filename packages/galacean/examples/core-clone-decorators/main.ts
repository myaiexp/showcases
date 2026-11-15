// ignoreClone, assignmentClone, shallowClone and deepClone on four script fields
import { assignmentClone, deepClone, type Entity, ignoreClone, PrimitiveMesh, Script, shallowClone, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

class CustomScript extends Script {
  a = false;
  b = 1;
  c: Vector3[] = [new Vector3(0, 0, 0)];
  d: Vector3[] = [new Vector3(0, 0, 0)];
}
// The decorators are plain functions of (prototype, field name); applying them here is what `@ignoreClone` does.
ignoreClone(CustomScript.prototype, 'a');
assignmentClone(CustomScript.prototype, 'b');
shallowClone(CustomScript.prototype, 'c');
deepClone(CustomScript.prototype, 'd');

const FIELDS = ['a ignoreClone', 'b assignmentClone', 'c shallowClone', 'd deepClone'];
const SHORT = ['a ignore', 'b assign', 'c shallow', 'd deep'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Spheres show each field: top row the original, bottom row the clone. Size follows the value.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 0, stage.preview ? 7.2 : 11]);
  const tag = labels(stage, camera);
  const sphere = PrimitiveMesh.createSphere(engine, 0.5, 20);
  const make = (y: number): Entity[] => [0, 1, 2, 3].map((i) => solid(root, sphere, phong(engine, i < 2 ? PALETTE.amber : PALETTE.cyan), [(i - 1.5) * 2.7, y, 0]));
  const top = make(0.9);
  const bottom = make(-0.9);
  const heads = (stage.preview ? SHORT : FIELDS).map((f) => tag.add(f, '#cfd6e4'));
  const holder = root.createChild('script holder');
  const source = holder.addComponent(CustomScript);
  let clone: CustomScript | undefined;
  const info = panel(stage, 'bl');
  const steps = [
    () => {
      clone = undefined;
      source.a = true;
      source.b = 2;
      source.c[0]!.set(1, 1, 1);
      source.d[0]!.set(1, 1, 1);
    },
    () => (clone = holder.clone().getComponent(CustomScript)!),
    () => {
      clone!.c[0]!.set(2, 2, 2);
      clone!.d[0]!.set(2, 2, 2);
    },
  ];
  const text = [
    'script a=true b=2 c[0]=1 d[0]=1',
    'clone = entity.clone()',
    'clone.c[0].set(2,2,2); clone.d[0].set(2,2,2)  -> original c follows (shared), d does not',
  ];
  let index = 0;
  const next = (): void => {
    steps[index]!();
    index = (index + 1) % steps.length;
  };
  if (!stage.preview) button(stage.bar, 'Next step', next);
  next();
  let last = 0;
  const size = (e: Entity, v: number): void => e.transform.setScale(v, v, v);
  tick(root, (_dt, t) => {
    if (stage.preview && t - last > 1.8) {
      last = t;
      next();
    }
    const view = (s: CustomScript | undefined, row: Entity[]): void => {
      row.forEach((e) => (e.isActive = !!s));
      if (!s) return;
      size(row[0]!, s.a ? 1 : 0.4);
      size(row[1]!, s.b / 2);
      size(row[2]!, s.c[0]!.x);
      size(row[3]!, s.d[0]!.x);
    };
    view(source, top);
    view(clone, bottom);
    heads.forEach((h, i) => h.at(top[i]!.transform.worldPosition.clone().add(new Vector3(0, 0.9, 0))));
    info.text(`${text[(index + 2) % 3]}`);
  });
  return stage.dispose;
};

export default mount;
