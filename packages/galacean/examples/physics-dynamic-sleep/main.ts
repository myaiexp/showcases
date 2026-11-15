// DynamicCollider.sleepThreshold, isSleeping(), sleep() and wakeUp()
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger, tint } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 4, 10], target: [0, 0.5, 0], floor: { w: 16, d: 8 }, hint: 'A sleeping body is greyed out and costs nothing to simulate.' });
  const tags = tagger(w);
  const items: { b: ReturnType<typeof ball>; label: ReturnType<typeof tags.add>; threshold: number; color: (typeof PALETTE)[keyof typeof PALETTE] }[] = [];
  const launch = (): void => {
    for (const { b } of items) {
      b.body.wakeUp();
      b.body.linearVelocity = new Vector3(2.4, 0, 0);
    }
  };
  rounds(w, 8, (_n, holder) => {
    tags.clear();
    items.length = 0;
    [0.005, 0.5, 2].forEach((threshold, i) => {
      const b = ball(holder, [-6, 0.4, (i - 1) * 2], 0.4, PALETTE.amber);
      b.body.sleepThreshold = threshold;
      b.body.linearDamping = 0.4;
      items.push({ b, label: tags.add(b.entity, ''), threshold, color: PALETTE.amber });
    });
    launch();
  });
  tick(w.root, () => {
    for (const { b, label, threshold, color } of items) {
      const asleep = b.body.isSleeping();
      tint(b.entity, asleep ? PALETTE.grey : color);
      label.el.textContent = `threshold ${threshold}: ${asleep ? 'asleep' : 'awake'}`;
    }
  });
  if (!w.stage.preview) {
    button(w.stage.bar, 'sleep()', () => items.forEach(({ b }) => b.body.sleep()));
    button(w.stage.bar, 'wakeUp() and push', launch);
  }
  w.say('linearDamping 0.4, pushed at 2.4 m/s');
  return w.stage.dispose;
};

export default mount;
