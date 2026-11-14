// An onboarding tour: Next and Back call playTo(label) on a paused timeline, a spotlight ring slides between steps
import { animate, delay, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

// Spotlight boxes over the mock app, in px, and the tooltip text for each step.
const STOPS = [
  { x: 8, y: 8, w: 70, h: 22, title: 'Search', text: 'Find anything fast.' },
  { x: 8, y: 44, w: 54, h: 92, title: 'Folders', text: 'Everything lives here.' },
  { x: 150, y: 8, w: 62, h: 22, title: 'Share', text: 'Invite a teammate.' },
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="tour">
      <div class="app">
        <i class="search"></i><i class="share"></i><i class="side"></i><i class="main"></i>
        <div class="ring"></div>
        ${STOPS.map((s, i) => `<div class="tip tip${i}"><b>${s.title}</b><span>${s.text}</span></div>`).join('')}
      </div>
      <div class="nav"><button class="btn back">Back</button><span class="count"></span><button class="btn next">Next</button></div>
    </div>`;
  const back = el.querySelector<HTMLButtonElement>('.back')!;
  const next = el.querySelector<HTMLButtonElement>('.next')!;
  const count = el.querySelector<HTMLElement>('.count')!;
  if (preview) el.querySelector('.nav')!.remove();
  else hint(el, 'Nothing plays until you press Next: the timeline starts paused and each press plays it to the next label. Back plays it in reverse to the previous one.');

  const scope = scopeMotion(el, (s) => {
    const seq: AnimationSequence = ['start'];
    STOPS.forEach((st, i) => {
      const box = { x: st.x, y: st.y, width: st.w, height: st.h };
      seq.push(['.ring', i === 0 ? { ...box, opacity: [0, 1] } : box, { duration: 0.45 }]);
      seq.push([`.tip${i}`, { opacity: [0, 1], y: [6, 0] }, { duration: 0.3, at: '<+0.15' }]);
      seq.push(`step-${i + 1}`);
      // Leave this step's tooltip as the next one arrives, at the very start of the move.
      if (i < STOPS.length - 1) seq.push([`.tip${i}`, { opacity: [1, 0] }, { duration: 0.2 }]);
    });
    const timeline = animate(seq, { autoplay: false });

    let step = 0;
    const go = (to: number): void => {
      step = Math.max(0, Math.min(STOPS.length, to));
      timeline.playTo(step === 0 ? 'start' : `step-${step}`);
      count.textContent = step ? `${step} / ${STOPS.length}` : `0 / ${STOPS.length}`;
      back.disabled = step === 0;
      next.disabled = step === STOPS.length;
    };
    back.addEventListener('click', s.bind(() => go(step - 1)));
    next.addEventListener('click', s.bind(() => go(step + 1)));
    go(1);

    if (preview) {
      let dir = 1;
      const tick = (): void => {
        if (step === STOPS.length) dir = -1;
        else if (step <= 1) dir = 1;
        go(step + dir);
        delay(tick, 1.7);
      };
      delay(tick, 1.7);
    }
  });
  return () => scope.cancel();
};

export default mount;
