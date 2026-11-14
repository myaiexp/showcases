// A hero section whose headline, subtitle, buttons and picture play one after another
import { animate, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="hero">
      <div class="copy">
        <h1>Plan trips together</h1>
        <p>One shared map for every stop.</p>
        <div class="buttons"><span class="btn-main">Start free</span><span class="btn-ghost">Watch demo</span></div>
      </div>
      <div class="art"></div>
    </div>`;

  const scope = scopeMotion(el, () => {
    // Each segment starts when the previous one ends, so the order of the array is the order on screen.
    const sequence: AnimationSequence = [
      ['h1', { opacity: [0, 1], y: [18, 0] }, { duration: 0.5 }],
      ['p', { opacity: [0, 1], y: [14, 0] }, { duration: 0.4 }],
      ['.buttons span', { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.3 }],
      // Per-segment transition: the picture springs in instead of using the default tween.
      ['.art', { opacity: [0, 1], x: [40, 0] }, { type: 'spring', bounce: 0.3, visualDuration: 0.6 }],
    ];
    // The card loops: after a pause the whole hero fades out and starts again.
    if (preview) sequence.push(['.hero', { opacity: [1, 1, 0] }, { duration: 1.6, at: '-0.2' }]);

    const timeline = animate(sequence, { repeat: preview ? Infinity : 0 });

    if (!preview) {
      const p = panel(el);
      p.button('Replay', () => {
        timeline.time = 0;
        timeline.play();
      });
      p.slider('Speed', { min: 0.25, max: 2, step: 0.25, value: 1 }, (v) => {
        timeline.speed = v;
      });
      hint(el, 'Four segments, no timing numbers between them: each one waits for the one before. Slow it down to see the order.');
      return () => p.dispose();
    }
  });

  return () => scope.cancel();
};

export default mount;
