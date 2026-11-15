// SpringJoint stiffness and damping on a bob hung from a world point
import { SpringJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { line, marker, unlit } from '../../shared/core-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 11], target: [0, 3, 0], floor: false, hint: 'The spring pulls once the bob is further than maxDistance + tolerance.' });
  const top = new Vector3(0, 6, 0);
  marker(w.root, unlit(w.engine, PALETTE.white), 0.35).set(top);
  const rope = line(w.root, unlit(w.engine, PALETTE.white), 0.05);
  let bob: ReturnType<typeof ball> | undefined;
  let joint: SpringJoint | undefined;
  const values = { stiffness: 40, damping: 0.5, max: 1.5 };
  const round = rounds(w, w.stage.preview ? 14 : 1e9, (_n, holder) => {
    bob = ball(holder, [0, 4.5, 0], 0.5, PALETTE.amber);
    joint = bob.entity.addComponent(SpringJoint);
    joint.automaticConnectedAnchor = false;
    joint.connectedAnchor = top.clone();
    joint.minDistance = 0;
    joint.maxDistance = values.max;
    joint.tolerance = 0.25;
    joint.stiffness = values.stiffness;
    joint.damping = values.damping;
  });
  tick(w.root, () => {
    if (!bob || !joint) return;
    rope.set(top, bob.entity.transform.worldPosition);
    const d = Vector3.distance(top, bob.entity.transform.worldPosition);
    w.say(`distance ${d.toFixed(2)}   maxDistance ${joint.maxDistance}   stiffness ${joint.stiffness}   damping ${joint.damping}`);
  });
  if (!w.stage.preview) {
    slider(w.stage.bar, 'stiffness', 1, 200, 1, values.stiffness, (v) => (joint!.stiffness = values.stiffness = v));
    slider(w.stage.bar, 'damping', 0, 10, 0.1, values.damping, (v) => (joint!.damping = values.damping = v));
    slider(w.stage.bar, 'maxDistance', 0.5, 3, 0.1, values.max, (v) => {
      values.max = v;
      round.restart();
    });
  }
  return w.stage.dispose;
};

export default mount;
