// tiledAdaptiveThreshold: when Adaptive stretches leftover tiles
import { SpriteDrawMode, SpriteTileMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { place, scene2d, spriteOf, tileArt } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const sprite = spriteOf(engine, 32, 32, tileArt);
  const thresholds = [0.1, 0.5, 0.9];
  const rows = thresholds.map((th, i) => {
    const r = place(root, sprite, 0, 1.1 - i * 1.0, 4, 0.64, `threshold${th}`);
    r.drawMode = SpriteDrawMode.Tiled;
    r.tileMode = SpriteTileMode.Adaptive;
    r.tiledAdaptiveThreshold = th;
    return r;
  });
  const resize = (w: number): void => {
    for (const r of rows) r.width = w;
    say(`rows: threshold 0.1, 0.5, 0.9 | width ${w.toFixed(2)} (${(w / sprite.width).toFixed(2)} tiles)`);
  };
  if (stage.preview) tick(root, (_dt, t) => resize(2.4 + 1.4 * (0.5 + 0.5 * Math.sin(t * 0.9))));
  else {
    slider(stage.bar, 'width', 1, 6, 0.01, 4, resize);
    slider(stage.bar, 'middle row threshold', 0, 1, 0.01, 0.5, (v) => ((rows[1]!.tiledAdaptiveThreshold = v), say(`middle threshold ${v.toFixed(2)}`)));
    resize(4);
  }
  return stage.dispose;
};

export default mount;
