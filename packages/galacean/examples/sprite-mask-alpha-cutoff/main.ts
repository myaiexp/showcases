// SpriteMask.alphaCutoff: pixels below the cutoff are discarded
import { SpriteMask, SpriteMaskInteraction } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { bands, place, scene2d, softDisc, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  place(root, spriteOf(engine, 256, 128, bands), 0, 0, 5, 2.5, 'stripes').maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
  const mask = root.createChild('mask').addComponent(SpriteMask);
  mask.sprite = spriteOf(engine, 128, 128, softDisc);
  mask.width = mask.height = 3.4;
  const set = (v: number): void => {
    mask.alphaCutoff = v;
    say(`alphaCutoff = ${v.toFixed(2)} (the disc fades from alpha 1 at the middle to 0 at the rim)`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(0.5 + 0.45 * Math.sin(t * 1.2)));
  else {
    slider(stage.bar, 'alphaCutoff', 0.01, 0.99, 0.01, 0.5, set);
    set(0.5);
  }
  return stage.dispose;
};

export default mount;
