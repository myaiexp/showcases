// SpriteMask with VisibleOutsideMask: a hole instead of a window
import { SpriteMask, SpriteMaskInteraction } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { bands, place, scene2d, spriteOf, star } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const stripes = place(root, spriteOf(engine, 256, 128, bands), 0, 0, 5, 2.5, 'stripes');
  const maskEntity = root.createChild('mask');
  const mask = maskEntity.addComponent(SpriteMask);
  mask.sprite = spriteOf(engine, 128, 128, star());
  mask.width = mask.height = 2.4;
  mask.flipY = false;
  tick(maskEntity, (_dt, t) => maskEntity.transform.setPosition(Math.sin(t * 0.9) * 1.8, Math.cos(t * 1.3) * 0.5, 0));
  const modes = ['None', 'VisibleInsideMask', 'VisibleOutsideMask'] as const;
  const apply = (m: (typeof modes)[number]): void => {
    stripes.maskInteraction = SpriteMaskInteraction[m];
    say(`maskInteraction = ${m}`);
  };
  if (stage.preview) {
    let last = -1;
    tick(root, (_dt, t) => {
      const i = Math.floor(t / 2) % 3;
      if (i !== last) apply(modes[(last = i)]!);
    });
  } else {
    apply('VisibleOutsideMask');
    select(stage.bar, 'maskInteraction', modes, apply, 'VisibleOutsideMask');
  }
  return stage.dispose;
};

export default mount;
