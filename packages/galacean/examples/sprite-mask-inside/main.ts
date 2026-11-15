// SpriteMask with VisibleInsideMask: a star window onto stripes
import { SpriteMask, SpriteMaskInteraction } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { bands, place, scene2d, spriteOf, star } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  caption(stage, 'maskInteraction = VisibleInsideMask: only the star shows the stripes');
  const stripes = place(root, spriteOf(engine, 256, 128, bands), 0, 0, 5, 2.5, 'stripes');
  stripes.maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
  const maskEntity = root.createChild('mask');
  const mask = maskEntity.addComponent(SpriteMask);
  mask.sprite = spriteOf(engine, 128, 128, star());
  mask.width = mask.height = 2.4;
  tick(maskEntity, (_dt, t) => {
    maskEntity.transform.setPosition(Math.sin(t * 0.9) * 1.8, Math.cos(t * 1.3) * 0.5, 0);
    maskEntity.transform.setRotation(0, 0, t * 30);
  });
  return stage.dispose;
};

export default mount;
