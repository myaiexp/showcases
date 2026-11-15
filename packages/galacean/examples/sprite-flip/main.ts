// SpriteRenderer.flipX and flipY mirror the drawn sprite
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { compass, place, scene2d, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const sprite = spriteOf(engine, 128, 128, compass);
  const r = place(root, sprite, 0, 0, 2.4, 2.4);
  const apply = (x: boolean, y: boolean): void => {
    r.flipX = x;
    r.flipY = y;
    say(`flipX = ${x}, flipY = ${y}`);
  };
  place(root, sprite, -2.8, 0, 1.2, 1.2, 'reference');
  if (stage.preview) steps(root, 1.2, 4, (i) => apply((i & 1) === 1, (i & 2) === 2));
  else {
    apply(false, false);
    checkbox(stage.bar, 'flipX', false, (v) => apply(v, r.flipY));
    checkbox(stage.bar, 'flipY', false, (v) => apply(r.flipX, v));
  }
  return stage.dispose;
};

export default mount;
