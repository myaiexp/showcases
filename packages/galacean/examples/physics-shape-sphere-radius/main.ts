// SphereColliderShape.radius decides which balls fit through a slot
import { type Entity, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { ball, PALETTE, rain, rnd, wall, world } from '../../shared/phys-kit.ts';

const RADII = [0.2, 0.35, 0.5, 0.65, 0.8];
const GAP = 1.2;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 11], target: [0, 2.5, 0], hint: 'Pick a radius and drop a ball: the slot is 1.2 wide.' });
  const len = 6;
  const cx = GAP / 2 + len / 2;
  wall(w.root, [-cx, 2, 0], [len, 0.4, 3], PALETTE.blue, 'platform left');
  wall(w.root, [cx, 2, 0], [len, 0.4, 3], PALETTE.blue, 'platform right');
  let radius = 0.5;
  const drop = (n: number, parent: Entity): Entity => {
    if (w.stage.preview) radius = RADII[n % RADII.length]!;
    const b = ball(parent, [rnd(n) * 0.1, 5.5, 0], radius, PALETTE.amber);
    b.body.linearVelocity = new Vector3(0, 0, 0);
    w.say(`radius ${radius.toFixed(2)}: diameter ${(radius * 2).toFixed(2)} vs slot ${GAP} -> ${radius * 2 < GAP ? 'falls through' : 'stays on top'}`);
    return b.entity;
  };
  const stream = rain(w, 2.2, 6, drop);
  if (!w.stage.preview) {
    slider(w.stage.bar, 'radius', 0.15, 0.9, 0.05, radius, (v) => (radius = v));
    button(w.stage.bar, 'Drop a ball', () => void drop(Math.floor(Math.random() * 1000), w.root));
    button(w.stage.bar, 'Clear', () => stream.clear());
  }
  return w.stage.dispose;
};

export default mount;
