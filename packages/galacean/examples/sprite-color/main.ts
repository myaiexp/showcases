// SpriteRenderer.color multiplies the sprite's pixels: tint and alpha
import { Color } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { color, slider } from '../../shared/controls.ts';
import { place, scene2d, spriteOf, star } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, 'color = white keeps the pixels; other colours multiply them');
  const sprite = spriteOf(engine, 128, 128, star('#ffffff'));
  const tints: [number, number, number][] = [[1, 1, 1], [1, 0.3, 0.3], [0.3, 0.9, 0.4], [0.35, 0.55, 1]];
  const renderers = tints.map((t, i) => {
    const r = place(root, sprite, -2.25 + i * 1.5, 0.2, 1.3, 1.3, `tint${i}`);
    r.color = new Color(...t, 1);
    return r;
  });
  const fade = place(root, sprite, 0, -1.4, 1, 1, 'fade');
  if (stage.preview) tick(root, (_dt, t) => {
    fade.color.a = 0.5 + 0.5 * Math.sin(t * 2.5);
    renderers[1]!.color.set(1, 0.5 + 0.5 * Math.sin(t * 2), 0.3, 1);
  });
  else {
    color(stage.bar, 'tint of the second star', [1, 0.3, 0.3], ([r, g, b]) => (renderers[1]!.color.set(r ** 2.2, g ** 2.2, b ** 2.2, renderers[1]!.color.a), say(`color = (${r.toFixed(2)}, ${g.toFixed(2)}, ${b.toFixed(2)}) in sRGB`)));
    slider(stage.bar, 'alpha of the bottom star', 0, 1, 0.01, 1, (v) => (fade.color.a = v));
  }
  return stage.dispose;
};

export default mount;
