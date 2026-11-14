// raycastAll options: filterTags, filterCallback and group masks
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, tint } from '../../shared/physics.ts';

const HEIGHTS = [1.4, 2.4, 1.8, 3, 1.6, 2.6, 2, 3.2];
const BOSSES = [2, 5];

type Mode = 'no filter' | "filterTags: ['enemy']" | "filterTags: ['enemy', 'boss']" | 'filterCallback: taller than 2.2' | 'filterCollisionMask: USER_1';
const MODES: Mode[] = ['no filter', "filterTags: ['enemy']", "filterTags: ['enemy', 'boss']", 'filterCallback: taller than 2.2', 'filterCollisionMask: USER_1'];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 19, pitch: -50, target: [0, 0, 0], floor: 20, autoRotate: 0, yaw: 0 });
  const { app, physics } = scene;
  let mode: Mode = 'no filter';
  let readout: HTMLElement | null = null;

  const targets = HEIGHTS.map((h, i) => {
    // Even slots are enemies, odd ones friends; two enemies are bosses as well.
    const enemy = i % 2 === 0;
    const e = addBody(app, { type: 'kinematic', name: `${enemy ? 'enemy' : 'friend'} ${i}`, size: [1.2, h, 1.2], position: [-7 + i * 2, h / 2, 0], colour: enemy ? '#e8794a' : '#4ab3e8' });
    e.tags.add(enemy ? 'enemy' : 'friend');
    if (BOSSES.includes(i)) e.tags.add('boss');
    // Set the group after the type; changing the type resets it.
    e.rigidbody!.group = enemy ? pc.BODYGROUP_USER_1 : pc.BODYGROUP_USER_2;
    return { e, enemy, colour: enemy ? '#e8794a' : '#4ab3e8' };
  });

  const options = (): Parameters<typeof physics.raycastAll>[2] => {
    switch (mode) {
      case "filterTags: ['enemy']":
        return { filterTags: ['enemy'], sort: true };
      case "filterTags: ['enemy', 'boss']":
        return { filterTags: ['enemy', 'boss'], sort: true };
      case 'filterCallback: taller than 2.2':
        return { filterCallback: (entity: pc.Entity) => entity.getLocalScale().y > 2.2, sort: true };
      case 'filterCollisionMask: USER_1':
        return { filterCollisionMask: pc.BODYGROUP_USER_1, sort: true };
      default:
        return { sort: true };
    }
  };

  const from = new pc.Vec3(-10, 1.2, 0);
  const to = new pc.Vec3(10, 1.2, 0);
  app.on('update', () => {
    const hits = physics.raycastAll(from, to, options());
    const hit = new Set(hits.map((h) => h.entity));
    for (const t of targets) tint(t.e, hit.has(t.e) ? '#ffffff' : t.colour, hit.has(t.e) ? '#7a6a20' : undefined);
    // Draw the ray as far as its last surviving hit.
    const last = hits[hits.length - 1];
    app.drawLine(from, to, new pc.Color(0.4, 0.15, 0.15), false);
    if (last) app.drawLine(from, last.point, pc.Color.YELLOW, false);
    if (readout) readout.textContent = `${mode}: ${hits.length} hit${hits.length === 1 ? '' : 's'}: ${hits.map((h) => h.entity.name).join(', ') || 'none'}`;
  });

  if (ctx.preview) {
    let i = 0;
    every(app, 2.5, () => (mode = MODES[++i % MODES.length]!));
  } else {
    const panel = createPanel(el);
    panel.select<Mode>('options', MODES, mode, (v) => (mode = v));
    panel.row();
    readout = panel.readout();
    panel.readout('orange: enemy (group USER_1)   blue: friend (USER_2)   tags: bosses are enemy 2 and 5');
  }

  return () => scene.dispose();
};

export default mount;
