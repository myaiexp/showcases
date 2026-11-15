// CharacterController.upDirection: slopes are measured from its own up
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { character, incline, Walker } from '../../shared/phys-char.ts';
import { PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const ANGLE = 30;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [2, 4, 12], target: [1.5, 1.6, 0], floor: { w: 18, d: 8 }, hint: 'Both have slopeLimit 20; the incline is 30 degrees.' });
  incline(w.root, ANGLE, 8, 0, PALETTE.blue);
  const a = (ANGLE * Math.PI) / 180;
  const along = new Vector3(Math.cos(a), Math.sin(a), 0);
  const normal = new Vector3(-Math.sin(a), Math.cos(a), 0);
  const tags = tagger(w);
  rounds(w, 8, (_n, holder) => {
    tags.clear();
    ['world up', 'incline normal'].forEach((name, i) => {
      const tilted = i === 1;
      const c = character(holder, [-6, 1.05, (i - 0.5) * 2.2], tilted ? PALETTE.green : PALETTE.amber, name);
      c.controller.slopeLimit = 20;
      c.controller.upDirection = tilted ? normal.clone() : new Vector3(0, 1, 0);
      const walker = c.entity.addComponent(Walker);
      walker.controller = c.controller;
      walker.up = tilted ? normal.clone() : new Vector3(0, 1, 0);
      walker.drive = () => {
        // On the flat part walk along x; once past the foot, follow the incline.
        const onRamp = c.entity.transform.position.x > 0.2;
        return { velocity: onRamp && tilted ? along.clone().scale(2.4) : new Vector3(2.4, 0, 0) };
      };
      tags.add(c.entity, `upDirection = ${name}`);
    });
  });
  tick(w.root, () => w.say('slopeLimit = 20 degrees, incline = 30 degrees'));
  return w.stage.dispose;
};

export default mount;
