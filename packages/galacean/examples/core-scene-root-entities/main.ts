// A scene's root entities: create, add, get and remove
import { Entity, type Scene, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Each step edits the scene root list; the panel prints scene.rootEntities.' });
  const { engine, scene, root } = stage;
  lit(stage, [0, 2, 8]);
  const mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
  const palette = [PALETTE.red, PALETTE.green, PALETTE.blue, PALETTE.amber];
  const decorate = (e: Entity, i: number, x: number): Entity => {
    solid(e, mesh, phong(engine, palette[i % 4]!), [0, 0, 0], 'body');
    e.transform.setPosition(x, -1.2, 0);
    return e;
  };
  const extras: Entity[] = [];
  const steps: { code: string; run(s: Scene): void }[] = [
    { code: "scene.createRootEntity('a')", run: (s) => extras.push(decorate(s.createRootEntity('a'), 0, -3)) },
    { code: "scene.addRootEntity(new Entity(engine, 'b'))", run: (s) => {
        const b = decorate(new Entity(engine, 'b'), 1, -1);
        s.addRootEntity(b);
        extras.push(b);
      } },
    { code: 'scene.addRootEntity(0, c)  // at index 0', run: (s) => {
        const c = decorate(new Entity(engine, 'c'), 2, 1);
        s.addRootEntity(0, c);
        extras.push(c);
      } },
    { code: 'scene.getRootEntity(1)', run: (s) => void s.getRootEntity(1)?.transform.setScale(1.5, 1.5, 1.5) },
    { code: 'scene.removeRootEntity(c)', run: (s) => s.removeRootEntity(extras[2]!) },
    { code: 'scene.removeRootEntity(a); b.destroy(); c.destroy()', run: (s) => {
        s.removeRootEntity(extras[0]!);
        for (const e of extras) e.destroy();
        extras.length = 0;
      } },
  ];
  let index = -1;
  const info = panel(stage);
  const show = (): void =>
    info.text(`${steps[Math.max(index, 0)]!.code}\n\nscene.rootEntitiesCount ${scene.rootEntitiesCount}\nrootEntities: ${scene.rootEntities.map((e) => e.name).join(', ')}`);
  const next = (): void => {
    index = (index + 1) % steps.length;
    steps[index]!.run(scene);
    show();
  };
  if (!stage.preview) button(stage.bar, 'Next step', next);
  next();
  let last = 0;
  tick(root, (dt, t) => {
    if (stage.preview && t - last > 1.4) {
      last = t;
      next();
    }
    for (const e of extras) e.children[0]?.transform.rotate(0, 60 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
