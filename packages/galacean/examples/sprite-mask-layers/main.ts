// SpriteMask.influenceLayers against SpriteRenderer.maskLayer
import { SpriteMask, SpriteMaskInteraction, SpriteMaskLayer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { compass, place, scene2d, spriteOf, star } from '../../shared/twod-kit.ts';

const L = [SpriteMaskLayer.Layer0, SpriteMaskLayer.Layer1, SpriteMaskLayer.Layer2];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const say = caption(stage, '');
  const sprite = spriteOf(engine, 128, 128, compass);
  L.forEach((layer, i) => {
    const r = place(root, sprite, -2.3 + i * 2.3, 0, 1.7, 1.7, `layer${i}`);
    r.maskInteraction = SpriteMaskInteraction.VisibleOutsideMask; // inside mode would hide a sprite no mask reaches
    r.maskLayer = layer;
  });
  const maskEntity = root.createChild('mask');
  const mask = maskEntity.addComponent(SpriteMask);
  mask.sprite = spriteOf(engine, 128, 128, star());
  mask.width = mask.height = 1.2;
  tick(maskEntity, (_dt, t) => maskEntity.transform.setPosition(-2.3 + (Math.sin(t * 0.8) + 1) * 2.3, 0, 0));
  const options = {
    'Layer0': SpriteMaskLayer.Layer0,
    'Layer0 | Layer1': SpriteMaskLayer.Layer0 | SpriteMaskLayer.Layer1,
    'Layer2': SpriteMaskLayer.Layer2,
    'Everything': SpriteMaskLayer.Everything,
  } as const;
  const names = Object.keys(options) as (keyof typeof options)[];
  const apply = (n: keyof typeof options): void => {
    mask.influenceLayers = options[n];
    say(`influenceLayers = ${n} | sprites on Layer0, 1, 2 cut where the star reaches`);
  };
  if (stage.preview) steps(root, 2.2, names.length, (i) => apply(names[i]!));
  else {
    apply('Layer0');
    select(stage.bar, 'influenceLayers', names, apply);
  }
  return stage.dispose;
};

export default mount;
