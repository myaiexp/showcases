// A filterable product grid: hidden tiles drop out and the others glide into the gaps
import { animate, animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const FILTERS = ['All', 'Shoes', 'Bags', 'Hats'] as const;
const PRODUCTS: Array<[string, (typeof FILTERS)[number], string]> = [
  ['Runner', 'Shoes', '#ff7a59'], ['Tote', 'Bags', '#7c5cff'], ['Bucket', 'Hats', '#2fc4b2'], ['Loafer', 'Shoes', '#f2b84b'],
  ['Satchel', 'Bags', '#e5546b'], ['Beanie', 'Hats', '#5aa9e6'], ['Boot', 'Shoes', '#9bd36b'], ['Duffel', 'Bags', '#c47bd9'],
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="shop">
      <div class="chips">${FILTERS.map((f) => `<button class="chip" data-f="${f}" aria-pressed="${f === 'All'}">${f}</button>`).join('')}</div>
      <div class="grid">${PRODUCTS.map(([n, c, bg]) => `
        <div class="item" data-layout data-cat="${c}"><i style="background:${bg}"></i><span>${n}</span></div>`).join('')}</div>
    </div>`;
  if (!preview) hint(el, 'Pick a category. The tiles that stay slide into the freed space, with no layout maths in the code: it only toggles hidden.');
  const items = [...el.querySelectorAll<HTMLElement>('.item')];
  const chips = [...el.querySelectorAll<HTMLButtonElement>('.chip')];

  const scope = scopeMotion(el, () => {
    const filter = (f: string): void => {
      const before = new Set(items.filter((i) => !i.hidden));
      animateLayout(el, () => {
        for (const c of chips) c.setAttribute('aria-pressed', String(c.dataset.f === f));
        for (const i of items) i.hidden = f !== 'All' && i.dataset.cat !== f;
      }, { type: 'spring', visualDuration: 0.45, bounce: 0.2 });
      // Tiles that come back have no old position to glide from, so they fade in.
      for (const i of items) if (!before.has(i)) animate(i, { opacity: [0, 1] }, { duration: 0.35, delay: 0.1 });
    };
    if (preview) {
      const seq = ['Shoes', 'All', 'Bags', 'Hats', 'All'];
      let n = 0;
      const tick = (): void => {
        filter(seq[n++ % seq.length]!);
        delay(tick, 1.5);
      };
      delay(tick, 0.9);
      return;
    }
    for (const c of chips) c.addEventListener('click', () => scope.run(() => filter(c.dataset.f!)));
  });
  return () => scope.cancel();
};

export default mount;
