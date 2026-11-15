// SpriteRenderer.priority orders overlapping sprites
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { place, scene2d, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const card = (fill: string) => spriteOf(engine, 64, 64, (g, w, h) => {
    g.fillStyle = fill;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#fff';
    g.lineWidth = 4;
    g.strokeRect(2, 2, w - 4, h - 4);
  });
  const cards = ['#d9534f', '#3fa56b', '#4f78d9'].map((c, i) => place(root, card(c), -0.6 + i * 0.6, 0.15 - i * 0.12, 1.6, 1.6, `card${i}`));
  const show = (): void => say(`priority: red ${cards[0]!.priority}, green ${cards[1]!.priority}, blue ${cards[2]!.priority}`);
  const order: [number, number, number][] = [[0, 1, 2], [2, 1, 0], [1, 2, 0], [0, 2, 1]];
  if (stage.preview) steps(root, 1.6, order.length, (i) => (cards.forEach((c, k) => (c.priority = order[i]![k]!)), show()));
  else {
    cards.forEach((c, k) => slider(stage.bar, ['red', 'green', 'blue'][k]! + ' priority', -5, 5, 1, k, (v) => ((c.priority = v), show())));
    show();
  }
  return stage.dispose;
};

export default mount;
