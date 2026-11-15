// Image.sprite and Image.color: swap the sprite, tint it, fade it
import { Color } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { color, select } from '../../shared/controls.ts';
import { image, uiScene } from '../../shared/ui-kit.ts';
import { compass, spriteOf, star } from '../../shared/twod-kit.ts';
import { lin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const sprites = { compass: spriteOf(stage.engine, 128, 128, compass), star: spriteOf(stage.engine, 128, 128, star('#ffffff')) };
  const im = image(canvasEntity, 0, 0, 220, 220, { sprite: sprites.compass }).image;
  const tints: [number, number, number, number][] = [[1, 1, 1, 1], [1, 0.4, 0.4, 1], [0.4, 1, 0.6, 1], [0.5, 0.6, 1, 0.5]];
  if (stage.preview) {
    steps(canvasEntity, 1.4, 8, (i) => {
      im.sprite = i < 4 ? sprites.compass : sprites.star;
      const t = tints[i % 4]!;
      im.color = new Color(...lin([t[0], t[1], t[2]]), t[3]);
      say(`sprite = ${i < 4 ? 'compass' : 'star'}, color = (${t.join(', ')})`);
    });
  } else {
    select(stage.bar, 'sprite', ['compass', 'star'] as const, (v) => (im.sprite = sprites[v]));
    color(stage.bar, 'color', [1, 1, 1], ([r, g, b]) => (im.color = new Color(r ** 2.2, g ** 2.2, b ** 2.2, im.color.a)));
    say('Image.sprite and Image.color');
  }
  return stage.dispose;
};

export default mount;
