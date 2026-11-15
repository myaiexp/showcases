// ColliderShape.position offsets the collision shape from its entity
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { unlit } from '../../shared/core-kit.ts';
import { crate, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { outline } from '../../shared/phys-wire.ts';

const OFFSETS: [number, number, number][] = [[0, 0, 0], [0, 0.8, 0], [0, -0.5, 0], [0.9, 0, 0]];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3.5, 8], target: [0, 1.2, 0], hint: 'Set the offset, then drop the cube again.' });
  const wire = unlit(w.engine, PALETTE.cyan);
  const offset = new Vector3();
  const round = rounds(w, w.stage.preview ? 3.4 : 1e9, (n, holder) => {
    if (w.stage.preview) offset.set(...OFFSETS[n % OFFSETS.length]!);
    const c = crate(holder, [0, 3, 0], [1.2, 1.2, 1.2], PALETTE.amber);
    c.shape.position = offset;
    outline(holder, c.body, wire);
    w.say(`shape.position = (${offset.x}, ${offset.y}, ${offset.z})`);
  });
  if (!w.stage.preview) {
    for (const axis of ['x', 'y', 'z'] as const) slider(w.stage.bar, `position.${axis}`, -1.2, 1.2, 0.1, 0, (v) => (offset[axis] = v));
    button(w.stage.bar, 'Drop again', () => round.restart());
  }
  return w.stage.dispose;
};

export default mount;
