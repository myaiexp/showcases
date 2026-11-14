// A sneaker that swings upright and zooms in as it crosses the panel, tied to its position by scroll() target + offset
import { animate, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const SHOE = `
  <svg viewBox="0 0 200 110" class="shoe" aria-label="Sneaker">
    <path d="M10 72 H192 Q198 72 198 80 V86 Q198 94 190 94 H22 Q8 94 8 82 Z" fill="#f2efe8"/>
    <path d="M20 72 C18 50 30 30 52 28 L72 42 C88 48 104 40 114 30 C146 32 178 50 192 72 Z" fill="#ff5a4f"/>
    <path d="M148 48 C168 52 184 62 192 72 H142 Z" fill="#ff8a7a"/>
    <path d="M30 66 C70 60 120 62 176 70" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <path d="M78 46 L90 58 M92 40 L104 52 M106 34 L116 44" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </svg>`;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="shop">
      <div class="scroller">
        <p class="copy">New season</p>
        <div class="stage">
          <div class="shadow"></div>
          ${SHOE}
          <div class="tag">Runner 01 &middot; &euro;89</div>
        </div>
        <p class="copy">Light, grippy, ready.</p>
      </div>
    </div>`;
  el.querySelector('.shop')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const stage = el.querySelector<HTMLElement>('.stage')!;
  if (!preview) hint(el, 'Scroll the page past the shoe. It tilts in, comes upright and grows as it reaches the middle of the panel, then tilts away; the tag shows only while it is centred. All of it is scrubbed by the stage\'s position.');

  const scope = scopeMotion(el, () => {
    // One scroll() per animation, all sharing the stage as target and the same offset:
    // 0 when the stage's top edge meets the panel's bottom, 1 when its bottom edge meets the panel's top.
    const track = { container: scroller, target: stage, offset: ['start end', 'end start'] as ['start end', 'end start'] };
    scroll(animate('.shoe', { rotate: [-50, 0, 50], scale: [0.45, 1.15, 0.45] }, { ease: 'linear' }), track);
    scroll(animate('.shadow', { scaleX: [0.4, 1.2, 0.4], opacity: [0.1, 0.5, 0.1] }, { ease: 'linear' }), track);
    scroll(animate('.tag', { opacity: [0, 1, 0], y: [20, 0, -20] }, { ease: 'linear' }), track);
    if (preview) autoScroll(scroller, { duration: 6 });
  });
  return () => scope.cancel();
};

export default mount;
