// HingeJoint.axis and anchor: a pendulum, with angle and velocity read back
import { HingeJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 10], target: [0, 3, 0], floor: false, hint: 'Pivot at (0, 5, 0): the anchor is the bar\'s top end.' });
  let start = 60;
  let hinge: HingeJoint | undefined;
  const round = rounds(w, w.stage.preview ? 20 : 1e9, (_n, holder) => {
    const a = (start * Math.PI) / 180;
    const bar = crate(holder, [Math.sin(a) * 1.5, 5 - Math.cos(a) * 1.5, 0], [0.3, 3, 0.3], PALETTE.amber, 'bar');
    bar.entity.transform.setRotation(0, 0, start);
    bar.body.angularDamping = 0;
    hinge = bar.entity.addComponent(HingeJoint);
    hinge.anchor = new Vector3(0, 1.5, 0);
    hinge.axis = new Vector3(0, 0, 1);
  });
  tick(w.root, () => hinge && w.say(`hinge.angle ${hinge.angle.toFixed(1)} deg\nhinge.velocity ${hinge.velocity.toFixed(1)} deg/s`));
  if (!w.stage.preview) slider(w.stage.bar, 'release angle', 10, 150, 5, start, (v) => {
    start = v;
    round.restart();
  }, (v) => `${v} deg`);
  return w.stage.dispose;
};

export default mount;
