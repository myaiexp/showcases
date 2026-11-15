// Sprite.region: crop a rectangle out of a texture, normalised
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { compass, place, scene2d, spriteFrom, textureOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, 'region = Rect(x, y, w, h), 0 to 1 from the bottom left');
  const texture = textureOf(engine, 128, 128, compass);

  place(root, spriteFrom(engine, texture), -2.4, 0.2, 1.6, 1.6, 'whole');
  const crops: [number, number, number, number][] = [[0, 0, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5], [0.15, 0.3, 0.55, 0.5]];
  crops.forEach((r, i) => place(root, spriteFrom(engine, texture, { region: r }), -0.5 + i * 1.7, 0.2, undefined, undefined, `crop${i}`));

  // One more sprite whose region window slides across the texture.
  const sliding = spriteFrom(engine, texture, { region: [0, 0, 0.4, 0.4] });
  place(root, sliding, 0, -1.4, 1, 1, 'sliding');
  const frame = { x: 0, y: 0 };
  const apply = (): void => {
    sliding.region.set(frame.x, frame.y, 0.4, 0.4);
  };
  if (stage.preview) {
    tick(root, (_dt, t) => {
      frame.x = 0.3 * (1 + Math.sin(t * 1.4));
      frame.y = 0.3 * (1 + Math.cos(t * 1.1));
      apply();
    });
  } else {
    slider(stage.bar, 'region.x', 0, 0.6, 0.01, 0, (v) => ((frame.x = v), apply()));
    slider(stage.bar, 'region.y', 0, 0.6, 0.01, 0, (v) => ((frame.y = v), apply()));
    say('sliding sprite: region = (x, y, 0.4, 0.4)');
  }
  return stage.dispose;
};

export default mount;
