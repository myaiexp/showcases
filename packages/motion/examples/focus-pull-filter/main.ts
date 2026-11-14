// A photo sharpened by animating filter, with a delay that may be negative
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="frame">
      <svg class="photo" viewBox="0 0 240 150" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="fp-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b4a8c"/><stop offset="1" stop-color="#f6a56b"/></linearGradient></defs>
        <rect width="240" height="150" fill="url(#fp-sky)"/>
        <circle cx="170" cy="62" r="20" fill="#ffe29a"/>
        <path d="M0 130 L50 70 L90 110 L140 55 L200 120 L240 90 V150 H0Z" fill="#1c2742"/>
        <path d="M0 150 L0 128 Q60 110 120 130 T240 124 V150Z" fill="#0f1830"/>
        <path d="M30 96 l-4 -10 l4 10 l4 -10 M30 96 v14" stroke="#0a1022" stroke-width="2" fill="none"/>
      </svg>
      <span class="reticle"></span>
    </div>`;

  let wait = 0.2;

  const scope = scopeMotion(el, () => {
    const focus = (): void => {
      animate('.reticle', { opacity: [1, 0] }, { duration: 0.4, delay: Math.max(wait, 0) + 1.6 });
      animate('.photo', { filter: ['blur(14px) brightness(0.6)', 'blur(0px) brightness(1)'] }, {
        duration: 2,
        ease: 'easeOut',
        // A negative delay starts that many seconds into the animation.
        delay: wait,
      });
    };
    focus();

    if (preview) {
      const tick = (): void => {
        focus();
        delay(tick, 4);
      };
      delay(tick, 4);
      return;
    }
    const p = panel(el);
    p.slider('delay (s)', { min: -2, max: 2, step: 0.1, value: wait }, (v) => { wait = v; });
    p.button('Take photo', focus);
    hint(el, 'At delay -1 the photo starts half way to sharp, because the animation begins one second in. Positive delays just wait.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
