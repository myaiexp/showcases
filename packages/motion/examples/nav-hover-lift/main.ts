// A nav bar whose items lift and grow an underline on hover, and settle back when the pointer leaves
import { animate, hover, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const ITEMS = ['Home', 'Shop', 'Journal', 'About'];

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<nav class="nav${preview ? '' : ' big'}">${ITEMS.map((t) => `<a class="link"><span>${t}</span><i></i></a>`).join('')}</nav>`;
  const links = [...el.querySelectorAll<HTMLElement>('.link')];
  if (!preview) hint(el, 'Move across the bar. Each item rises and draws its underline as you enter, then drops back when you leave, even mid-way through.');

  const scope = scopeMotion(el, () => {
    animate('.link i', { scaleX: 0 }, { duration: 0 });
    hover('.link', (link) => {
      const line = link.querySelector('i')!;
      const lift = animate(link, { y: -6 }, { type: 'spring', bounce: 0.4, visualDuration: 0.3 });
      const draw = animate(line, { scaleX: 1 }, { duration: 0.25 });
      // The end callback stops what the start began, then plays the way back from where it got to.
      return () => {
        lift.stop();
        draw.stop();
        animate(link, { y: 0 }, { type: 'spring', bounce: 0.3, visualDuration: 0.3 });
        animate(line, { scaleX: 0 }, { duration: 0.2 });
      };
    });
  });

  if (preview) {
    let i = 0;
    loopGesture(el, signal, async (g) => {
      const l = links[i++ % links.length]!;
      const a = at(el, l);
      g.enter(l, a);
      await g.wait(0.7);
      g.leave(l, a);
    }, 0.05);
  }

  return () => scope.cancel();
};

export default mount;
