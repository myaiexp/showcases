// An AnimationRectCurve on "sprite.region" slides a sprite's visible part
import { AnimationClip, AnimationRectCurve, Rect, SpriteRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { keys, playClip } from '../../shared/anim-kit.ts';
import { compass, scene2d, spriteOf } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const entity = root.createChild('window');
  const renderer = entity.addComponent(SpriteRenderer);
  renderer.sprite = spriteOf(engine, 256, 256, compass);
  renderer.width = 3;
  renderer.height = 3;
  const clip = new AnimationClip('pan');
  const curve = new AnimationRectCurve();
  keys(curve, [[0, new Rect(0, 0, 0.5, 0.5)], [1, new Rect(0.5, 0, 0.5, 0.5)], [2, new Rect(0.5, 0.5, 0.5, 0.5)], [3, new Rect(0, 0.5, 0.5, 0.5)], [4, new Rect(0, 0, 0.5, 0.5)]]);
  curve.interpolation = 2;
  clip.addCurveBinding('', SpriteRenderer, 'sprite.region', curve);
  playClip(engine, entity, clip);
  return stage.dispose;
};

export default mount;
