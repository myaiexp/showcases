// A chain of SpringJoints, each connected to the previous body
import { SpringJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { marker, polyline, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const LINKS = 7;
const GAP = 0.8;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 11], target: [0, 3, 0], floor: false, hint: 'Each link: connectedCollider = the ball above, maxDistance = 0.8.' });
  const top = new Vector3(-3.4, 6, 0);
  marker(w.root, unlit(w.engine, PALETTE.white), 0.35).set(top);
  const rope = polyline(w.root, unlit(w.engine, PALETTE.white), LINKS, 0.05);
  const balls: ReturnType<typeof ball>[] = [];
  rounds(w, 10, (_n, holder) => {
    balls.length = 0;
    for (let i = 0; i < LINKS; i++) {
      const b = ball(holder, [top.x + GAP * (i + 1), top.y, 0], 0.28, i % 2 ? PALETTE.amber : PALETTE.cyan);
      b.body.angularDamping = 1;
      b.body.linearDamping = 0.15;
      const joint = b.entity.addComponent(SpringJoint);
      joint.automaticConnectedAnchor = false;
      if (i === 0) joint.connectedAnchor = top.clone();
      else {
        joint.connectedCollider = balls[i - 1]!.body;
        joint.connectedAnchor = new Vector3(0, 0, 0);
      }
      joint.minDistance = 0;
      joint.maxDistance = GAP;
      joint.tolerance = 0.02;
      joint.stiffness = 500;
      joint.damping = 20;
      balls.push(b);
    }
    balls[LINKS - 1]!.body.linearVelocity = new Vector3(0, 0, 0);
  });
  tick(w.root, () => {
    if (balls.length === LINKS) rope.set([top, ...balls.map((b) => b.entity.transform.worldPosition)]);
  });
  w.say('seven SpringJoints');
  return w.stage.dispose;
};

export default mount;
