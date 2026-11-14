// Plan cards whose highlight ripples out from where the pointer entered, and closes at the exit point
import { animate, hover, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const PLANS = [['Starter', '0 EUR'], ['Pro', '12 EUR'], ['Team', '40 EUR']] as const;

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<div class="plans${preview ? '' : ' big'}">${PLANS.map(([n, p]) => `<div class="plan"><i class="glow"></i><b>${n}</b><span>${p} / month</span></div>`).join('')}</div>`;
  const plans = [...el.querySelectorAll<HTMLElement>('.plan')];
  if (!preview) hint(el, 'Enter a card from different sides. The glow grows from the exact point you crossed the edge, and shrinks toward the point you leave by.');

  const scope = scopeMotion(el, () => {
    animate('.glow', { scale: 0, opacity: 0 }, { duration: 0 });
    hover('.plan', (card, startEvent) => {
      const glow = card.querySelector<HTMLElement>('.glow')!;
      const place = (e: PointerEvent): void => {
        const r = card.getBoundingClientRect();
        glow.style.left = `${e.clientX - r.left}px`;
        glow.style.top = `${e.clientY - r.top}px`;
      };
      place(startEvent);
      const grow = animate(glow, { scale: 1, opacity: 1 }, { duration: 0.55, ease: 'easeOut' });
      return (endEvent) => {
        grow.stop();
        place(endEvent);
        animate(glow, { scale: 0, opacity: 0 }, { duration: 0.4, ease: 'easeIn' });
      };
    });
  });

  if (preview) {
    let i = 0;
    loopGesture(el, signal, async (g) => {
      const card = plans[i % plans.length]!;
      const r = card.getBoundingClientRect();
      const f = el.getBoundingClientRect();
      const y = r.top - f.top + r.height / 2;
      const fromLeft = i++ % 2 === 0;
      const x0 = r.left - f.left + (fromLeft ? 2 : r.width - 2);
      const x1 = r.left - f.left + (fromLeft ? r.width - 2 : 2);
      g.enter(card, { x: x0, y });
      await g.glide({ x: x0, y }, { x: x1, y }, 0.9);
      g.leave(card, { x: x1, y });
    }, 0.1);
  }

  return () => scope.cancel();
};

export default mount;
