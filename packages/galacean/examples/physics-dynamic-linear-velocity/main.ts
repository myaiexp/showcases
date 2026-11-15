// DynamicCollider.linearVelocity written to launch, read back in flight
import { type DynamicCollider, type Entity, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, fmt, PALETTE, rain, world } from '../../shared/phys-kit.ts';

const COLORS = [PALETTE.red, PALETTE.amber, PALETTE.green, PALETTE.cyan, PALETTE.violet];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [3, 4, 14], target: [3, 2.5, 0], hint: 'The full view sets the launch angle.' });
  let angle = 55;
  let lastBody: DynamicCollider | undefined;
  let lastEntity: Entity | undefined;
  rain(w, 0.7, 10, (n, parent) => {
    const speed = 5 + (n % 5) * 1.6;
    const b = ball(parent, [-4, 0.4, 0], 0.3, COLORS[n % 5]!);
    b.shape.material.bounciness = 0.4;
    b.body.linearVelocity = new Vector3(Math.cos((angle * Math.PI) / 180) * speed, Math.sin((angle * Math.PI) / 180) * speed, 0);
    lastBody = b.body;
    lastEntity = b.entity;
    return b.entity;
  });
  tick(w.root, () => {
    if (lastBody && lastEntity?.isActive) w.say(`last ball linearVelocity = (${fmt(lastBody.linearVelocity)})`);
  });
  if (!w.stage.preview) slider(w.stage.bar, 'launch angle', 10, 80, 1, angle, (v) => (angle = v), (v) => `${v} deg`);
  return w.stage.dispose;
};

export default mount;
