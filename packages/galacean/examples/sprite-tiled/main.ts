// SpriteDrawMode.Tiled with SpriteTileMode Continuous or Adaptive
import { SpriteDrawMode, SpriteTileMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { place, scene2d, spriteOf, tileArt } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, 'drawMode = Tiled | top: Continuous | bottom: Adaptive');
  const sprite = spriteOf(engine, 32, 32, tileArt);
  const rows = [SpriteTileMode.Continuous, SpriteTileMode.Adaptive].map((mode, i) => {
    const r = place(root, sprite, 0, 0.7 - i * 1.5, 4, 1, SpriteTileMode[mode]);
    r.drawMode = SpriteDrawMode.Tiled;
    r.tileMode = mode;
    return r;
  });
  const resize = (w: number): void => {
    for (const r of rows) r.width = w;
    say(`width ${w.toFixed(2)} = ${(w / sprite.width).toFixed(2)} tiles (tile is ${sprite.width} wide)`);
  };
  if (stage.preview) tick(root, (_dt, t) => resize(2.2 + 1.6 * (0.5 + 0.5 * Math.sin(t * 1.1))));
  else {
    slider(stage.bar, 'width', 0.6, 6, 0.01, 4, resize);
    resize(4);
  }
  return stage.dispose;
};

export default mount;
