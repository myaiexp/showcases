// Sprite and renderer size: pixels / 100 by default, width and height
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { bands, place, scene2d, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const sprite = spriteOf(engine, 128, 64, bands);
  const auto = place(root, sprite, -2.2, 0.4, undefined, undefined, 'auto');
  const stretched = place(root, sprite, 1.2, 0.4, 2, 1, 'stretched');
  const text = (): void => say(`sprite ${sprite.width} x ${sprite.height} | left: renderer default | right: ${stretched.width.toFixed(2)} x ${stretched.height.toFixed(2)}`);
  text();
  const set = (w: number, h: number): void => {
    stretched.width = w;
    stretched.height = h;
    text();
  };
  if (stage.preview) tick(root, (_dt, t) => set(2 + Math.sin(t * 1.6), 1 + 0.6 * Math.cos(t * 1.1)));
  else {
    slider(stage.bar, 'renderer.width', 0.2, 4, 0.05, 2, (v) => set(v, stretched.height));
    slider(stage.bar, 'renderer.height', 0.2, 3, 0.05, 1, (v) => set(stretched.width, v));
    slider(stage.bar, 'sprite.width', 0.2, 3, 0.05, sprite.width, (v) => ((sprite.width = v), text()));
  }
  return stage.dispose;
};

export default mount;
