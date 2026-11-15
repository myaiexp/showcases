// Finding entities by name and path, from the scene and from an entity
import { type Entity, PrimitiveMesh, type BlinnPhongMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Each query returns an entity; the one it finds lights up.' });
  const { engine, root, scene } = stage;
  const camera = lit(stage, [0, 3, 9.5], [0, 0.5, 0]);
  const tag = labels(stage, camera);
  const sphere = PrimitiveMesh.createSphere(engine, 0.45, 20);
  const paints = new Map<Entity, BlinnPhongMaterial>();
  const make = (parent: Entity, name: string, pos: [number, number, number]): Entity => {
    const material = phong(engine, PALETTE.grey);
    const e = solid(parent, sphere, material, pos, name);
    paints.set(e, material);
    return e;
  };
  const camp = root.createChild('camp');
  make(camp, 'tent', [-3.2, 0, 0]);
  const fire = make(camp, 'fire', [0, 0, 0]);
  make(fire, 'flame', [0, 1.3, 0]);
  const crate = make(camp, 'crate', [3.2, 0, 0]);
  make(crate, 'lid', [0, 1.3, 0]);
  const queries: Record<string, () => Entity | null> = {
    "scene.findEntityByName('flame')": () => scene.findEntityByName('flame'),
    "scene.findEntityByPath('root/camp/fire/flame')": () => scene.findEntityByPath('root/camp/fire/flame'),
    'camp.getChild(0)': () => camp.getChild(0),
    "camp.findByName('lid')": () => camp.findByName('lid'),
    "camp.findByPath('crate/lid')": () => camp.findByPath('crate/lid'),
  };
  const names = Object.keys(queries);
  let pick = 0;
  let auto = true;
  const info = panel(stage);
  const found = tag.add('found', '#ffd36b');
  const choice = stage.preview ? undefined : select(stage.bar, 'query', names, (n) => {
    auto = false;
    pick = names.indexOf(n);
  });
  tick(root, (_dt, t) => {
    if (auto) {
      pick = Math.floor(t / 1.8) % names.length;
      if (choice) choice.value = names[pick]!;
    }
    const result = queries[names[pick]!]!();
    for (const [e, m] of paints) {
      const hit = e === result;
      m.baseColor.set(hit ? 1 : 0.4, hit ? 0.8 : 0.43, hit ? 0.25 : 0.5, 1);
      e.transform.setScale(hit ? 1.4 : 1, hit ? 1.4 : 1, hit ? 1.4 : 1);
    }
    if (result) found.at(result.transform.worldPosition, result.name);
    else found.hide();
    info.text(`${names[pick]}\n=> ${result ? result.name : 'null'}`);
  });
  return stage.dispose;
};

export default mount;
