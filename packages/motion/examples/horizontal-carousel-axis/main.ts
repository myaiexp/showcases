// A sideways photo strip whose dots and bar follow horizontal scroll, via scroll(..., { axis: 'x' })
import { animate, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const PLACES: Array<[name: string, from: string, to: string]> = [
  ['Lisbon', '#f2a65a', '#c0507a'],
  ['Kyoto', '#e8b4c8', '#6a5a9a'],
  ['Oslo', '#8ac6d1', '#2a4a7a'],
  ['Cusco', '#d9a066', '#6a3a2a'],
  ['Reykjavik', '#a8d8c8', '#2a5a5a'],
  ['Hanoi', '#e8d56a', '#4a7a3a'],
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="gallery">
      <div class="strip"></div>
      <div class="dots"></div>
      <div class="bar"><i></i></div>
    </div>`;
  el.querySelector('.gallery')!.classList.toggle('full', !preview);
  const strip = el.querySelector<HTMLElement>('.strip')!;
  const dots = el.querySelector<HTMLElement>('.dots')!;
  for (const [name, from, to] of PLACES) {
    const photo = document.createElement('div');
    photo.className = 'photo';
    photo.style.background = `linear-gradient(145deg, ${from}, ${to})`;
    photo.textContent = name;
    strip.append(photo);
    dots.append(document.createElement('b'));
  }
  const dotEls = [...dots.children] as HTMLElement[];
  if (!preview) hint(el, 'Scroll the strip sideways (swipe, trackpad, or shift + wheel). axis: "x" makes scroll() read horizontal scroll, which drives both the bar under it and which dot is lit.');

  const scope = scopeMotion(el, () => {
    // 1. An animation: the bar fills as the strip scrolls from its left end to its right end.
    scroll(animate('.bar i', { scaleX: [0, 1] }, { ease: 'linear' }), { container: strip, axis: 'x' });

    // 2. A callback: the dot nearest to the scroll position lights up.
    let lit = -1;
    scroll((progress) => {
      const index = Math.round(progress * (PLACES.length - 1));
      if (index === lit) return;
      if (lit >= 0) animate(dotEls[lit]!, { scale: 1, opacity: 0.4 }, { duration: 0.2 });
      lit = index;
      animate(dotEls[index]!, { scale: 1.6, opacity: 1 }, { duration: 0.2 });
    }, { container: strip, axis: 'x' });

    if (preview) autoScroll(strip, { axis: 'x', duration: 6 });
  });
  return () => scope.cancel();
};

export default mount;
