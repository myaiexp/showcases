// DynamicCollider.linearDamping drags a body to a halt
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { ball, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 0.5, 14], target: [0, 0.5, 0], floor: false, hint: 'Balls fly at 7 m/s with gravity off; set the damping of the last lane yourself.' });
  const tags = tagger(w);
  const values = [0, 0.3, 0.8, 2];
  const round = rounds(w, 7, (_n, holder) => {
    tags.clear();
    values.forEach((d, i) => {
      const b = ball(holder, [-6.5, 2.4 - i * 1.6, 0], 0.4, [PALETTE.red, PALETTE.amber, PALETTE.green, PALETTE.cyan][i]!);
      b.body.useGravity = false;
      b.body.linearDamping = d;
      b.body.linearVelocity = new Vector3(7, 0, 0);
      tags.add(b.entity, `linearDamping ${d}`);
    });
  });
  if (!w.stage.preview) slider(w.stage.bar, 'last lane', 0, 4, 0.1, 2, (v) => {
    values[3] = v;
    round.restart();
  });
  w.say('launch speed 7, useGravity = false');
  return w.stage.dispose;
};

export default mount;
