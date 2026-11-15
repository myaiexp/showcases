// A TextRenderer clipped by a SpriteMask through maskInteraction
import { SpriteMask, SpriteMaskInteraction, TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { scene2d, softDisc, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const text = root.createChild('text').addComponent(TextRenderer);
  text.text = 'SPRITE MASK ON TEXT';
  text.fontSize = 60;
  text.maskInteraction = SpriteMaskInteraction.VisibleInsideMask;
  const maskEntity = root.createChild('mask');
  const mask = maskEntity.addComponent(SpriteMask);
  mask.sprite = spriteOf(engine, 128, 128, softDisc);
  mask.width = mask.height = 2.2;
  mask.alphaCutoff = 0.4;
  tick(maskEntity, (_dt, t) => maskEntity.transform.setPosition(Math.sin(t * 0.9) * 2.4, 0, 0));
  const modes = ['None', 'VisibleInsideMask', 'VisibleOutsideMask'] as const;
  const apply = (m: (typeof modes)[number]): void => {
    text.maskInteraction = SpriteMaskInteraction[m];
    say(`text.maskInteraction = ${m}`);
  };
  if (stage.preview) {
    let last = -1;
    tick(root, (_dt, t) => {
      const i = Math.floor(t / 2.5) % 3;
      if (i !== last) apply(modes[(last = i)]!);
    });
  } else {
    apply('VisibleInsideMask');
    select(stage.bar, 'maskInteraction', modes, apply, 'VisibleInsideMask');
  }
  return stage.dispose;
};

export default mount;
