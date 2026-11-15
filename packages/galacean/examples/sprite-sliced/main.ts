// SpriteDrawMode.Sliced: a nine-slice panel keeps its corners
import { SpriteDrawMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { panelArt, place, scene2d, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, 'left: Simple stretches everything | right: Sliced, border 0.25');
  const make = (x: number, mode: SpriteDrawMode) => {
    const sprite = spriteOf(engine, 96, 96, panelArt, { border: [0.25, 0.25, 0.25, 0.25] });
    const r = place(root, sprite, x, 0, 2, 1.4, mode === SpriteDrawMode.Sliced ? 'sliced' : 'simple');
    r.drawMode = mode;
    return r;
  };
  const simple = make(-1.9, SpriteDrawMode.Simple);
  const sliced = make(1.9, SpriteDrawMode.Sliced);
  const size = (w: number, h: number): void => {
    for (const r of [simple, sliced]) {
      r.width = w;
      r.height = h;
    }
  };
  if (stage.preview) tick(root, (_dt, t) => size(1.6 + 0.6 * Math.sin(t * 1.5), 1.3 + 0.5 * Math.cos(t * 1.1)));
  else {
    slider(stage.bar, 'width', 0.8, 3, 0.05, 2, (v) => size(v, simple.height));
    slider(stage.bar, 'height', 0.8, 3, 0.05, 1.4, (v) => size(simple.width, v));
    say('left: Simple stretches everything | right: Sliced keeps corners');
  }
  return stage.dispose;
};

export default mount;
