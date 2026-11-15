// new Sprite(engine) starts blank; assign a texture to show it
import { Sprite } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';
import { compass, place, scene2d, star, textureOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const textures = [textureOf(engine, 128, 128, compass), textureOf(engine, 128, 128, star())];
  const blank = new Sprite(engine); // blank sprite: nothing to show yet
  const withTexture = new Sprite(engine, textures[0]); // from an existing texture
  const r = place(root, blank, -1.6, 0, 2, 2, 'blank');
  const r2 = place(root, withTexture, 1.6, 0, 2, 2, 'withTexture');
  let n = 0;
  const swap = (): void => {
    n += 1;
    blank.texture = textures[n % 2]!; // the same Sprite object redraws everywhere it is used
    r2.sprite = n % 3 === 0 ? blank : withTexture;
    say(`left: new Sprite(engine), texture #${n % 2} | right: ${r2.sprite === blank ? 'shares the blank sprite' : 'its own sprite'}`);
  };
  r.sprite = blank;
  say('left: new Sprite(engine) with no texture draws nothing');
  if (stage.preview) steps(root, 1.5, 6, (i) => i > 0 && swap());
  else button(stage.bar, 'assign next texture', swap);
  return stage.dispose;
};

export default mount;
