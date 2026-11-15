// DynamicCollider.mass: one ball, two crates, same speed
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { ball, crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [3, 6, 10], target: [0, 0.5, 0], hint: 'Change the heavy crate\'s mass with the slider; it applies to the next round.' });
  const tags = tagger(w);
  let heavy = 12;
  rounds(w, 5, (_n, holder) => {
    tags.clear();
    for (const [z, mass] of [[-1.8, 1], [1.8, heavy]] as const) {
      const c = crate(holder, [0, 0.5, z], [1, 1, 1], mass === 1 ? PALETTE.green : PALETTE.red);
      c.body.mass = mass;
      const b = ball(holder, [-6, 0.5, z], 0.5, PALETTE.amber);
      b.body.mass = 2;
      b.body.linearVelocity = new Vector3(9, 0, 0);
      tags.add(c.entity, `mass ${mass}`);
    }
  });
  if (!w.stage.preview) slider(w.stage.bar, 'heavy mass', 2, 40, 1, heavy, (v) => (heavy = v));
  w.say('ball mass 2 at 9 m/s');
  return w.stage.dispose;
};

export default mount;
