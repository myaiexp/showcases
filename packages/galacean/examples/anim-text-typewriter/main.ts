// An AnimationStringCurve on TextRenderer.text types like a typewriter
import { AnimationClip, AnimationColorCurve, AnimationStringCurve, Color, TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { keys, playClip } from '../../shared/anim-kit.ts';
import { scene2d } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 3 });
  const entity = root.createChild('text');
  const text = entity.addComponent(TextRenderer);
  text.fontSize = 60;
  const phrase = 'Galacean animates text';
  const clip = new AnimationClip('type');
  const string = new AnimationStringCurve();
  keys(string, [...phrase].map((_, i) => [i * 0.12, phrase.slice(0, i + 1)] as [number, string]).concat([[phrase.length * 0.12 + 1.5, '']]));
  clip.addCurveBinding('', TextRenderer, 'text', string);
  // A colour curve beside it: the same clip tints the text while it types.
  const tint = new AnimationColorCurve();
  keys(tint, [[0, new Color(1, 0.6, 0.2, 1)], [1.4, new Color(0.3, 0.8, 1, 1)], [2.9, new Color(1, 0.6, 0.2, 1)]]);
  clip.addCurveBinding('', TextRenderer, 'color', tint);
  playClip(engine, entity, clip);
  return stage.dispose;
};

export default mount;
