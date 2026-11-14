// A small named, tagged entity tree for the finding-entities examples, with match highlighting
import * as pc from 'playcanvas';
import { addShape, material } from './components.ts';

export interface Town {
  /** The entity everything sits under, named 'Root' as in an Editor scene. */
  root: pc.Entity;
  /** Marks exactly these entities and restores the rest. */
  highlight(matches: Iterable<pc.GraphNode | pc.Component | null | undefined>): void;
  /** Lets highlight() mark an entity you added yourself; it needs a render component. */
  track(entity: pc.Entity): void;
}

/** Three houses with a door and a window each, and a few tagged creatures around them. */
export function buildTown(app: pc.AppBase): Town {
  const root = new pc.Entity('Root');
  app.root.addChild(root);
  const base = new Map<pc.Entity, pc.Material>();
  const glow = material('#000000', { emissive: '#ffe066' });

  const piece = (parent: pc.Entity, type: string, colour: string, pos: [number, number, number], scale: [number, number, number] | number, name: string, tags: string[] = []): pc.Entity => {
    const mat = material(colour);
    const e = addShape(parent, type, mat, pos, scale, name);
    base.set(e, mat);
    if (tags.length) e.tags.add(...tags);
    return e;
  };

  const town = new pc.Entity('town');
  root.addChild(town);
  const colours = ['#c9ced9', '#e8c8a0', '#a8c8e8'];
  colours.forEach((c, i) => {
    const house = new pc.Entity(`house-${'ABC'[i]}`);
    house.setLocalPosition((i - 1) * 3.4, 0, 0);
    town.addChild(house);
    piece(house, 'box', c, [0, 0.8, 0], [2, 1.6, 2], 'walls');
    piece(house, 'cone', '#8a4a3a', [0, 2.1, 0], [2.6, 1, 2.6], 'roof');
    piece(house, 'box', '#6a4a2a', [0, 0.5, 1.02], [0.6, 1, 0.1], 'door', i === 1 ? ['locked'] : []);
    piece(house, 'box', '#bfe3ff', [0.65, 1.1, 1.02], [0.4, 0.4, 0.1], 'window');
  });
  // Creatures walk about between the houses; some share names and tags.
  const crew: [string, string, string[], [number, number]][] = [
    ['goblin', '#7bc67b', ['enemy'], [-4, 2.6]],
    ['goblin', '#7bc67b', ['enemy', 'flying'], [-1.2, 3.4]],
    ['bat', '#a78bfa', ['enemy', 'flying'], [1.4, 2.8]],
    ['ogre', '#e8794a', ['enemy', 'boss'], [4, 3]],
    ['villager', '#f2c14e', ['friend'], [0, 3.6]],
  ];
  const folk = new pc.Entity('folk');
  root.addChild(folk);
  for (const [name, colour, tags, [x, z]] of crew) piece(folk, name === 'ogre' ? 'capsule' : 'sphere', colour, [x, tags.includes('flying') ? 1.8 : 0.5, z], name === 'ogre' ? [0.9, 1.4, 0.9] : 0.8, name, tags);

  return {
    root,
    track(entity) {
      base.set(entity, entity.render!.material);
    },
    highlight(matches) {
      for (const [e, m] of base) e.render!.material = m;
      for (const m of matches) {
        const e = m && 'entity' in m ? (m.entity as pc.Entity) : (m as pc.Entity | null);
        if (e && base.has(e)) e.render!.material = glow;
      }
    },
  };
}
