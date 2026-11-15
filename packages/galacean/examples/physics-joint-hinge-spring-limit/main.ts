// HingeJoint.useSpring turns the angle limit into a spring
import { HingeJoint, JointLimits, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 10], target: [0, 3.2, 0], floor: false, hint: 'Both bars start horizontal and fall; limits are -45 and 45 degrees.' });
  const tags = tagger(w);
  const hinges: HingeJoint[] = [];
  let stiffness = 60;
  let damping = 1;
  const round = rounds(w, 8, (_n, holder) => {
    tags.clear();
    hinges.length = 0;
    [false, true].forEach((spring, i) => {
      const x = i ? 3 : -3;
      const bar = crate(holder, [x + 1.5, 5, 0], [3, 0.3, 0.3], i ? PALETTE.green : PALETTE.amber, 'bar');
      const hinge = bar.entity.addComponent(HingeJoint);
      hinge.anchor = new Vector3(-1.5, 0, 0);
      hinge.axis = new Vector3(0, 0, 1);
      hinge.useLimits = true;
      hinge.limits = new JointLimits();
      hinge.limits.min = -45;
      hinge.limits.max = 45;
      hinge.limits.contactDistance = 5;
      if (spring) {
        hinge.useSpring = true;
        hinge.limits.stiffness = stiffness;
        hinge.limits.damping = damping;
      }
      hinges.push(hinge);
      tags.add(bar.entity, spring ? 'useSpring' : 'hard limit');
    });
  });
  tick(w.root, () => w.say(hinges.map((h, i) => `${i ? 'spring' : 'hard  '} limit: angle ${h.angle.toFixed(1)}`).join('\n')));
  if (!w.stage.preview) {
    slider(w.stage.bar, 'limits.stiffness', 0, 400, 10, stiffness, (v) => {
      stiffness = v;
      round.restart();
    });
    slider(w.stage.bar, 'limits.damping', 0, 20, 0.5, damping, (v) => {
      damping = v;
      round.restart();
    });
  }
  return w.stage.dispose;
};

export default mount;
