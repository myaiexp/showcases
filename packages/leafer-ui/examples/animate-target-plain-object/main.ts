// Animate: the target may be a plain object
import { Leafer, Star } from 'leafer-ui';
import { Animate, AnimateEvent } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { readout } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The Star is not animated: a plain object is, and each update copies it over.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const star = new Star({ x: stage.width / 2, y: stage.height / 2, around: 'center', corners: 5, fill: '#32cd79' });
  leafer.add(star);

  const model = { angle: 0, size: 50 }; // not a Leafer element
  const animate = new Animate(model, { angle: 360, size: stage.preview ? 90 : 140 }, { duration: 2.5, swing: true, easing: 'sine-in-out' });
  stage.onDispose(() => animate.destroy());
  animate.on(AnimateEvent.UPDATE, () => star.set({ rotation: model.angle, width: model.size, height: model.size }));

  if (stage.bar) button(stage.bar, 'seek(0)', () => animate.seek(0));
  readout(stage, () => `model = { angle: ${Math.round(model.angle)}, size: ${Math.round(model.size)} }`, true);
  return stage.dispose;
};

export default mount;
