// An FAQ accordion: opening an answer pushes the questions below it down smoothly
import { animate, animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const FAQ = [
  ['Can I cancel any time?', 'Yes. Cancel from Settings and you keep access until the period ends.'],
  ['Do you offer refunds?', 'Within 14 days of purchase, no questions asked.'],
  ['Is there a team plan?', 'Teams of five or more get shared billing and roles.'],
  ['Where is my data stored?', 'In EU data centres, encrypted at rest.'],
] as const;

const mount: Mount = (el, { preview }) => {
  const items = preview ? FAQ.slice(0, 3) : FAQ;
  el.innerHTML = `<div class="faq">${items.map(([q, a]) => `
    <div class="qa" data-layout>
      <button class="q" data-layout aria-expanded="false">${q}</button>
      <p class="a" data-layout hidden>${a}</p>
    </div>`).join('')}</div>`;
  if (!preview) hint(el, 'Open a question. Only the layout change is written (hidden on or off); the rows below slide down, and opening another closes the first.');
  const qas = [...el.querySelectorAll<HTMLElement>('.qa')];

  const scope = scopeMotion(el, () => {
    const toggle = (i: number): void => {
      const opening = qas[i]!.querySelector('.a')!.hasAttribute('hidden');
      // Opening one closes the rest, all in a single update that animateLayout measures around.
      animateLayout(el, () => {
        qas.forEach((qa, k) => {
          const open = k === i && opening;
          qa.querySelector('.q')!.setAttribute('aria-expanded', String(open));
          qa.querySelector<HTMLElement>('.a')!.hidden = !open;
        });
      }, { type: 'spring', visualDuration: 0.4, bounce: 0.1 });
      if (opening) animate(qas[i]!.querySelector('.a')!, { opacity: [0, 1] }, { duration: 0.3, delay: 0.1 });
    };
    if (preview) {
      let n = 0;
      const tick = (): void => {
        toggle(n++ % items.length);
        delay(tick, 1.5);
      };
      delay(tick, 0.7);
      return;
    }
    qas.forEach((qa, i) => qa.querySelector('.q')!.addEventListener('click', () => scope.run(() => toggle(i))));
  });
  return () => scope.cancel();
};

export default mount;
