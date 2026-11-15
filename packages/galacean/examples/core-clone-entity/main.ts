// entity.clone() copies an entity with its children and Script components
import { type Entity, PrimitiveMesh, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

class Orbit extends Script {
  speed = 90;
  override onUpdate(dt: number): void {
    this.entity.transform.rotate(0, this.speed * dt, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The template in the middle has a child and a script; every clone gets both.' });
  const { engine, root } = stage;
  lit(stage, [0, 6, 8.5]);
  const template = solid(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), phong(engine, PALETTE.amber), [0, 0, 0], 'template');
  solid(template, PrimitiveMesh.createSphere(engine, 0.3, 16), phong(engine, PALETTE.white), [0, 0.9, 0], 'child');
  template.addComponent(Orbit);
  const clones: Entity[] = [];
  const info = panel(stage);
  const add = (): void => {
    const copy = template.clone();
    const angle = clones.length * 0.55;
    copy.name = `clone ${clones.length + 1}`;
    copy.transform.setPosition(Math.cos(angle) * (2.4 + clones.length * 0.12), 0, Math.sin(angle) * (2.4 + clones.length * 0.12));
    copy.getComponent(Orbit)!.speed = 90 + clones.length * 25;
    root.addChild(copy);
    clones.push(copy);
  };
  const clear = (): void => {
    for (const c of clones.splice(0)) c.destroy();
  };
  if (!stage.preview) {
    button(stage.bar, 'template.clone()', add);
    button(stage.bar, 'Clear', clear);
  }
  let last = 0;
  tick(root, (_dt, t) => {
    if (stage.preview && t - last > 0.45) {
      last = t;
      if (clones.length >= 12) clear();
      else add();
    }
    const copy = clones.at(-1);
    info.text(`clones ${clones.length}\nlast clone: ${copy ? `${copy.childCount} child, Orbit ${copy.getComponent(Orbit) ? 'present' : 'missing'}` : 'none yet'}`);
  });
  return stage.dispose;
};

export default mount;
