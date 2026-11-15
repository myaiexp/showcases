// Text animation: a float curve on TextRenderer.fontSize grows Hello World from nothing to full size
import { AnimationClip, AnimationFloatCurve, TextRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { keys, playClip } from '../../shared/anim-kit.ts';
import { scene2d } from '../../shared/twod-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await scene2d(el, ctx, { size: 4 });
  const entity = root.createChild('text');
  const text = entity.addComponent(TextRenderer);
  text.text = 'Hello World';
  text.fontSize = 100;
  // As in the guide: 0 at frame 0, 100 at 0:30 and 200 at 1:00, in seconds at 60 frames per second.
  const clip = new AnimationClip('grow');
  const curve = new AnimationFloatCurve();
  keys(curve, [[0, 1], [0.5, 100], [1, 200], [2.5, 200], [3, 1]]);
  clip.addCurveBinding('', TextRenderer, 'fontSize', curve);
  playClip(engine, entity, clip);
  return stage.dispose;
};

export default mount;
