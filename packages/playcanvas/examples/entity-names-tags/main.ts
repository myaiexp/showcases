// Entity names and tags: add, remove, list and has, with a tag driving colour
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const TAGS = ['enemy', 'boss', 'flying'] as const;
const colourFor = (e: pc.Entity, mats: Record<'boss' | 'enemy' | 'plain', pc.StandardMaterial>): pc.StandardMaterial => {
  // The colour is read from the tags every time they change.
  if (e.tags.has('boss')) return mats.boss;
  if (e.tags.has('enemy')) return mats.enemy;
  return mats.plain;
};

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 9, pitch: -32, autoRotate: 8 }, floor: 14 });
  const { app } = scene;

  const mats = { boss: material('#e8794a'), enemy: material('#a78bfa'), plain: material('#7bc67b') };
  const names = ['goblin', 'goblin', 'imp', 'ogre'];
  const units = names.map((n, i) => {
    const e = addShape(app.root, i === 3 ? 'capsule' : 'box', null, [(i - 1.5) * 2.2, 0.8, 0], 1.4, n);
    e.tags.add('enemy');
    e.render!.material = colourFor(e, mats);
    return e;
  });
  units[3]!.tags.add('boss');
  units[3]!.render!.material = colourFor(units[3]!, mats);
  units[2]!.tags.add('flying');

  const refresh = (): void => units.forEach((u) => (u.render!.material = colourFor(u, mats)));
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    units.forEach((u, i) => {
      const lift = u.tags.has('flying') ? 1.4 + Math.sin(t * 2 + i) * 0.3 : 0.8;
      u.setLocalPosition((i - 1.5) * 2.2, lift, 0);
      u.rotate(0, 40 * dt, 0);
    });
    if (ctx.preview) {
      // Cards toggle the boss tag on the ogre and rename the imp.
      const on = Math.floor(t / 2) % 2 === 0;
      if (on !== units[3]!.tags.has('boss')) {
        on ? units[3]!.tags.add('boss') : units[3]!.tags.remove('boss');
        refresh();
      }
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const idx = { v: 0 };
    panel.select('entity', names.map((n, i) => `${i}: ${n}`), '0: goblin', (v) => (idx.v = Number(v[0])));
    for (const tag of TAGS) {
      panel.button(`toggle '${tag}'`, () => {
        const u = units[idx.v]!;
        u.tags.has(tag) ? u.tags.remove(tag) : u.tags.add(tag);
        refresh();
      });
    }
    panel.button('rename', () => (units[idx.v]!.name = `${units[idx.v]!.name}!`));
    panel.row();
    const info = panel.readout();
    app.on('update', () => (info.textContent = units.map((u, i) => `${i}: ${u.name} [${u.tags.list().join(', ')}]`).join('    ')));
    panel.row();
    panel.readout('tags.add(), tags.remove(), tags.list(), tags.has(). Names need not be unique; two goblins share one.');
  }

  return () => scene.dispose();
};

export default mount;
