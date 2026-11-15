// CollisionDetectionMode: a fast ball against a thin wall, four modes
import { CollisionDetectionMode, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, wall, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const MODES = ['Discrete', 'Continuous', 'ContinuousDynamic', 'ContinuousSpeculative'] as const;

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 7, 9], target: [0, 0, 0], floor: { w: 16, d: 10 }, hint: 'Ball: 0.3 wide at 120 m/s. Wall: 0.05 thick.' });
  const tags = tagger(w);
  const runs: { entity: { transform: { position: { x: number } } }; label: ReturnType<typeof tags.add>; name: string; passed: boolean }[] = [];
  for (let i = 0; i < MODES.length; i++) wall(w.root, [0, 1, (i - 1.5) * 2.2], [0.05, 2, 1.8], PALETTE.red, 'thin wall');
  rounds(w, 4, (_n, holder) => {
    tags.clear();
    runs.length = 0;
    MODES.forEach((name, i) => {
      const b = ball(holder, [-6.5, 0.8, (i - 1.5) * 2.2], 0.15, PALETTE.amber);
      b.body.useGravity = false;
      b.body.collisionDetectionMode = CollisionDetectionMode[name];
      b.body.linearVelocity = new Vector3(120, 0, 0);
      runs.push({ entity: b.entity, label: tags.add(b.entity, name), name, passed: false });
    });
  });
  tick(w.root, () => {
    for (const r of runs) {
      if (r.entity.transform.position.x > 0.3) r.passed = true;
      r.label.el.textContent = `${r.name}${r.passed ? ': tunnelled' : ''}`;
    }
    w.say(runs.map((r) => `${r.name.padEnd(22)} ${r.passed ? 'went through' : 'stopped'}`).join('\n'));
  });
  return w.stage.dispose;
};

export default mount;
