// Sprite.pivot: the point a sprite turns and scales around
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { compass, place, scene2d, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, 'pivot (0,0) is bottom left, (1,1) top right');
  const pivots: [number, number][] = [[0.5, 0.5], [0, 0], [1, 1]];
  const sprites = pivots.map((pivot, i) => {
    const sprite = spriteOf(engine, 128, 128, compass, { pivot });
    const r = place(root, sprite, -2.2 + i * 2.2, 0, 1.2, 1.2, `pivot${pivot.join('-')}`);
    // A red dot marks the entity position, which is where the pivot sits.
    const dot = place(root, spriteOf(engine, 16, 16, (g, w) => ((g.fillStyle = '#fff'), g.beginPath(), g.arc(w / 2, w / 2, w / 2, 0, 7), g.fill())), -2.2 + i * 2.2, 0, 0.16, 0.16, 'dot');
    dot.priority = -1;
    return { sprite, r };
  });
  tick(root, (_dt, t) => {
    for (const { r } of sprites) r.entity.transform.setRotation(0, 0, t * 40);
  });
  if (!stage.preview) {
    slider(stage.bar, 'third sprite pivot.x', 0, 1, 0.01, 1, (v) => ((sprites[2]!.sprite.pivot.x = v), say(`pivot = (${v.toFixed(2)}, ${sprites[2]!.sprite.pivot.y})`)));
  }
  return stage.dispose;
};

export default mount;
