// UI render order: depth first, parents then children, priority unused
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { button, select } from '../../shared/controls.ts';
import { image, label, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const colors: [number, number, number, number][] = [[0.85, 0.35, 0.3, 1], [0.35, 0.7, 0.45, 1], [0.35, 0.5, 0.9, 1]];
  const cards = ['A', 'B', 'C'].map((n, i) => {
    const c = image(canvasEntity, -80 + i * 80, 20 - i * 25, 200, 150, { color: colors[i]! }, n);
    label(c.entity, -60, 50, n, 28);
    return c;
  });
  // A child of A is drawn right after A and before its next sibling B, so B covers it where they overlap.
  const kid = image(cards[0]!.entity, 60, -50, 90, 60, { color: [0.95, 0.85, 0.3, 1] }, 'A-child');
  label(kid.entity, 0, 0, 'A child', 18);
  const order = (idx: number[]): void => {
    cards.forEach((c, k) => (c.entity.siblingIndex = idx[k]!));
    say(`sibling order, back to front: ${['A', 'B', 'C'].map((n, k) => ({ n, i: idx[k]! })).sort((x, y) => x.i - y.i).map((o) => o.n).join(' > ')}`);
  };
  const perms = [[0, 1, 2], [2, 1, 0], [1, 2, 0], [0, 2, 1]];
  if (stage.preview) {
    steps(canvasEntity, 1.8, perms.length, (i) => {
      order(perms[i]!);
      cards[1]!.image.priority = i === 1 ? -50 : 0; // priority is set, and changes nothing
    });
  } else {
    order(perms[0]!);
    select(stage.bar, 'sibling order', ['A B C', 'C B A', 'B C A', 'A C B'] as const, (v) => order(perms[['A B C', 'C B A', 'B C A', 'A C B'].indexOf(v)]!));
    button(stage.bar, 'set B priority = -50 (no effect)', () => (cards[1]!.image.priority = -50));
  }
  return stage.dispose;
};

export default mount;
