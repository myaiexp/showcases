// A like button that pops with keyframes and a spring, and a counter that ticks up
import { animate, delay, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="post">
      <div class="photo"></div>
      <div class="bar">
        <button class="like" aria-pressed="false" aria-label="Like">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3.1 1.7-1.9 3.2-3.1 5.3-3.1 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>
        </button>
        <span class="count">128</span>
      </div>
    </div>`;
  if (!preview) hint(el, 'Tap the heart. Liking plays a squash-and-stretch keyframe pop; unliking shrinks it back with a spring.');

  let liked = false;
  let count = 128;

  // Everything started in here (animations, the press gesture, the card's timer) is
  // collected by the scope, and scope.cancel() on unmount stops it all.
  const scope = scopeMotion(el, () => {
    const toggle = (): void => {
      liked = !liked;
      el.querySelector('.like')?.setAttribute('aria-pressed', String(liked));
      if (liked) {
        // Keyframes: squash, overshoot, settle. times places each keyframe in the run.
        animate('.like svg', { scale: [1, 0.7, 1.35, 1], rotate: [0, -12, 8, 0] }, { duration: 0.5, times: [0, 0.2, 0.6, 1] });
        animate('.like path', { fill: '#ff4d6d', stroke: '#ff4d6d' }, { duration: 0.2 });
      } else {
        animate('.like svg', { scale: [0.85, 1] }, { type: 'spring', bounce: 0.5, visualDuration: 0.3 });
        animate('.like path', { fill: 'rgba(0,0,0,0)', stroke: '#c8c8d0' }, { duration: 0.2 });
      }
      // A plain number animates too: onUpdate receives every in-between value.
      const from = count;
      count += liked ? 1 : -1;
      animate(from, count, {
        duration: 0.3,
        onUpdate: (v) => {
          const out = el.querySelector('.count');
          if (out) out.textContent = String(Math.round(v));
        },
      });
      animate('.count', { y: liked ? [-8, 0] : [8, 0], opacity: [0, 1] }, { duration: 0.25 });
    };

    // press() makes the button keyboard accessible too (focus + Enter).
    press('.like', (button) => {
      animate(button, { scale: 0.9 }, { duration: 0.1 });
      return (_e, info) => {
        animate(button, { scale: 1 }, { type: 'spring', bounce: 0.6, visualDuration: 0.25 });
        if (info.success) toggle();
      };
    });

    // A card has no pointer, so it likes and unlikes on a timer. delay() is collected.
    if (preview) {
      const tick = (): void => {
        toggle();
        delay(tick, liked ? 1.6 : 0.9);
      };
      delay(tick, 0.5);
    }
  });

  return () => scope.cancel();
};

export default mount;
