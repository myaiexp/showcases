// A checklist whose ticks are set by timeline.call(): playing forwards ticks them, playing backwards unticks them
import { animate, delay, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const STEPS = ['Create account', 'Verify email', 'Add a payment method', 'Invite your team'];
const STEP = 0.8;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<ul class="list">${STEPS.map((t) => `<li><span class="box"></span><span class="txt">${t}</span></li>`).join('')}</ul>`;
  const items = [...el.querySelectorAll<HTMLElement>('li')];

  const scope = scopeMotion(el, () => {
    const timeline = animate(
      STEPS.map((_, i): AnimationSequence[number] => [`li:nth-child(${i + 1})`, { x: [-8, 0], opacity: [0.45, 1] }, { duration: 0.5, at: i * STEP }]),
      { autoplay: false },
    );
    STEPS.forEach((_, i) => {
      // call() runs when the playhead crosses the time, either way. direction is 1 or -1.
      timeline.call((direction) => {
        items[i]?.classList.toggle('done', direction === 1);
        items[i]!.querySelector('.box')!.textContent = direction === 1 ? '✓' : '';
      }, i * STEP + 0.4);
    });

    if (preview) {
      let forwards = true;
      const go = (): void => {
        timeline.playTo(forwards ? timeline.duration : 0);
        forwards = !forwards;
        delay(go, 3.6);
      };
      delay(go, 0.5);
      return;
    }
    const p = panel(el);
    p.button('Play forwards', () => timeline.playTo(timeline.duration));
    p.button('Play backwards', () => timeline.playTo(0));
    hint(el, 'Forwards ticks each step as the playhead passes it; backwards, the same callbacks receive direction -1 and untick them. (Jumping with seek() or time does not run callbacks.)');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
