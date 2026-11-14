// Segmented tabs: the mini animate() moving a highlight with the spring function
import { animate } from 'motion/mini';
import { delay, scopeMotion, spring } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TABS = ['Inbox', 'Sent', 'Drafts'];
const TAB_W = 82;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="tabs">
      <span class="pill"></span>
      ${TABS.map((t) => `<button class="tab">${t}</button>`).join('')}
    </div>`;
  const pill = el.querySelector('.pill') as HTMLElement;
  const buttons = [...el.querySelectorAll<HTMLElement>('.tab')];

  let stiffness = 400;
  let damping = 25;
  // The mini animate() is not part of the scope, so keep its animation to stop it ourselves.
  let current: { stop: () => void } | undefined;

  const select = (i: number): void => {
    buttons.forEach((b, j) => b.classList.toggle('on', i === j));
    current?.stop();
    // Mini animate() takes CSS: a transform string, not x. The spring comes from "motion".
    current = animate(pill, { transform: `translateX(${i * TAB_W}px)` }, { type: spring, stiffness, damping });
  };
  select(0);

  const scope = scopeMotion(el, () => {
    if (preview) {
      let i = 0;
      const tick = (): void => {
        i = (i + 1) % TABS.length;
        select(i);
        delay(tick, 1.3);
      };
      delay(tick, 1);
      return;
    }
    buttons.forEach((b, i) => b.addEventListener('click', () => select(i)));
    const p = panel(el);
    p.slider('stiffness', { min: 50, max: 1000, step: 10, value: stiffness }, (v) => { stiffness = v; });
    p.slider('damping', { min: 3, max: 60, step: 1, value: damping }, (v) => { damping = v; });
    hint(el, 'Click the tabs. This page loads two builds of animate(): the 3.2kb mini one moves the highlight, the full one only schedules the card loop.');
    return () => p.dispose();
  });

  return () => {
    current?.stop();
    scope.cancel();
  };
};

export default mount;
