// Joint.anchor and connectedAnchor: hinging a bar at its end or at its centre
import { HingeJoint, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { marker, unlit } from '../../shared/core-kit.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 11], target: [0, 3.5, 0], floor: false, hint: 'automaticConnectedAnchor is off: connectedAnchor is the pin in world space.' });
  const tags = tagger(w);
  let offset = 0;
  const round = rounds(w, w.stage.preview ? 10 : 1e9, (_n, holder) => {
    tags.clear();
    const pins: [Vector3, number, string][] = [
      [new Vector3(-4, 4, 0), -1.5, 'anchor (-1.5, 0, 0): end'],
      [new Vector3(2, 4, 0), offset, `anchor (${offset.toFixed(1)}, 0, 0)`],
    ];
    pins.forEach(([pin, local, name], i) => {
      const bar = crate(holder, [pin.x - local, pin.y, 0], [3, 0.3, 0.3], i ? PALETTE.green : PALETTE.amber, 'bar');
      bar.body.angularDamping = 0.1;
      const hinge = bar.entity.addComponent(HingeJoint);
      hinge.axis = new Vector3(0, 0, 1);
      hinge.anchor = new Vector3(local, 0, 0);
      hinge.automaticConnectedAnchor = false;
      hinge.connectedAnchor = pin.clone();
      marker(holder, unlit(w.engine, PALETTE.white), 0.25).set(pin);
      tags.add(bar.entity, name);
    });
  });
  if (!w.stage.preview) {
    slider(w.stage.bar, 'right bar anchor.x', -1.5, 1.5, 0.1, offset, (v) => {
      offset = v;
      round.restart();
    });
  }
  w.say('HingeJoint.anchor / connectedAnchor');
  return w.stage.dispose;
};

export default mount;
