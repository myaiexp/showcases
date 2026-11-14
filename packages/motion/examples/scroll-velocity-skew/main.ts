// Cards that lean with scroll speed: scroll() hands the callback info.y.velocity, which sets a skew
import { animate, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const ALBUMS = ['Low Tide', 'Paper Moons', 'Night Bus', 'Glass Garden', 'Slow Fires', 'Harbour Lights', 'Cold Open', 'Amber Hours'];
const SPRING = { type: 'spring', stiffness: 260, damping: 28 } as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<div class="shelf"><div class="scroller"></div></div>';
  el.querySelector('.shelf')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  ALBUMS.forEach((name, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.background = `linear-gradient(135deg, hsl(${i * 43} 65% 55%), hsl(${i * 43 + 50} 55% 30%))`;
    card.textContent = name;
    scroller.append(card);
  });

  let sensitivity = preview ? 4 : 1.5;
  const controls = !preview ? panel(el) : undefined;
  const showSpeed = controls?.readout('scroll speed', '0 px/s');
  controls?.slider('lean', { min: 0.5, max: 4, step: 0.5, value: sensitivity }, (v) => {
    sensitivity = v;
  });
  if (!preview) hint(el, 'Scroll the shelf with the wheel, slowly and then fast. The callback reads info.y.velocity (pixels per second, negative going up) and leans the cards against it; when you stop, they spring upright.');

  let idle = 0;
  const scope = scopeMotion(el, () => {
    scroll((_progress, info) => {
      const speed = info.y.velocity;
      showSpeed?.(`${Math.round(speed)} px/s`);
      const lean = Math.max(-14, Math.min(14, -speed * 0.005 * sensitivity));
      animate('.card', { skewY: lean }, SPRING);
      // No scroll event arrives once you stop, so a timer straightens the cards.
      window.clearTimeout(idle);
      idle = window.setTimeout(() => scope.run(() => animate('.card', { skewY: 0 }, SPRING)), 120);
    }, { container: scroller });
    if (preview) autoScroll(scroller, { duration: 3 });
  });
  return () => {
    window.clearTimeout(idle);
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
