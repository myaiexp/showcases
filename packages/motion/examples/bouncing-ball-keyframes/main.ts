// A ball bouncing through keyframes, with times and one easing per segment
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="court">
      <div class="ball"></div>
      <div class="shadow"></div>
    </div>`;

  let perSegment = true;
  let anim: { stop: () => void } | undefined;
  let shadow: { stop: () => void } | undefined;

  const scope = scopeMotion(el, () => {
    const drop = (): void => {
      anim?.stop();
      shadow?.stop();
      const times = [0, 0.3, 0.5, 0.62, 0.74, 0.82, 0.9, 1];
      const loop = preview ? { repeat: Infinity, repeatDelay: 0.8 } : {};
      // Eight keyframes: ground is y 0, the ball starts 130px up. Seven gaps between them.
      anim = animate('.ball', {
        y: [-130, 0, -60, 0, -26, 0, -8, 0],
        scaleY: [1, 0.7, 1, 0.8, 1, 0.88, 1, 0.94],
        scaleX: [1, 1.25, 1, 1.15, 1, 1.08, 1, 1.04],
      }, {
        duration: 2,
        // times: where each keyframe lands in the run, 0 to 1.
        times,
        // One easing per gap: falls accelerate, rises slow at the top.
        ease: perSegment ? ['easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] : 'linear',
        ...loop,
      });
      shadow = animate('.shadow', { scale: [0.4, 1, 0.75, 1, 0.9, 1, 0.97, 1], opacity: [0.2, 0.5, 0.3, 0.5, 0.4, 0.5, 0.45, 0.5] }, { duration: 2, times, ...loop });
    };
    drop();

    if (preview) return;
    const p = panel(el);
    p.toggle('easing per segment', true, (v) => { perSegment = v; drop(); });
    p.button('Drop again', drop);
    hint(el, 'Turn off the easing array and every segment runs linear: the ball looks like it is on a string.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
