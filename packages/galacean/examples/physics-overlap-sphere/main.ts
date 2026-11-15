// scene.physics.overlapSphereAll: every shape inside a sphere
import { type ColliderShape, Layer, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { field } from '../../shared/phys-field.ts';
import { ghostSphere } from '../../shared/phys-ghost.ts';
import { overlap, note } from '../../shared/phys-overlap.ts';
import { PALETTE, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 10, 7], target: [0, 0, 0], floor: { w: 16, d: 9 }, hint: 'The query sphere is drawn as three circles.' });
  const crates = field(w, 6, 3, 1.9);
  const ball = ghostSphere(w.root, unlit(w.engine, PALETTE.white), 0.05);
  const center = new Vector3();
  const buffer: ColliderShape[] = [];
  let radius = 1.5;
  let auto = w.stage.preview;
  let mask: Layer = Layer.Everything;
  tick(w.root, (_dt, t) => {
    center.set(Math.sin(t * 0.45) * 4.5, 0.9, Math.cos(t * 0.7) * 1.8);
    if (auto) radius = 1.4 + Math.sin(t * 1.1) * 0.7;
    buffer.length = 0;
    const found = overlap(
      crates.crates,
      mask,
      () => w.physics.overlapSphereAll(center, radius, mask, buffer),
      (p, reach) => Vector3.distance(p, center) < radius + reach,
    );
    ball.set(center, radius);
    crates.reset();
    for (const e of found.entities) crates.light(e);
    w.say(`overlapSphereAll(r = ${radius.toFixed(2)}) -> ${found.entities.length}${note(found)}`);
  });
  if (!w.stage.preview) {
    slider(w.stage.bar, 'radius', 0.5, 3, 0.1, radius, (v) => {
      auto = false;
      radius = v;
    });
    checkbox(w.stage.bar, 'layerMask = Layer1 only', false, (v) => (mask = v ? Layer.Layer1 : Layer.Everything));
  }
  return w.stage.dispose;
};

export default mount;
