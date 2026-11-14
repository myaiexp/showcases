// A sort picker: the shared pill gets its own transition, the list rows use the default
import { animateLayout, delay, scopeMotion } from 'motion';
import type { AnimationOptions } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const SHOES = [['Runner', 120, 4.6], ['Trail', 95, 4.1], ['Court', 80, 4.8], ['Slide', 40, 3.9]] as const;
const SORTS = ['Name', 'Price', 'Rating'] as const;
type Sort = (typeof SORTS)[number];
const PILL: Record<string, AnimationOptions | null> = {
  'Bouncy spring': { type: 'spring', visualDuration: 0.5, bounce: 0.5 },
  'Slow glide': { duration: 0.9, ease: 'easeInOut' },
  'Same as the list': null,
};

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="sorter">
      <div class="seg">${SORTS.map((s) => `<button class="opt" data-s="${s}">${s}</button>`).join('')}</div>
      <ul class="rows">${SHOES.map(([n, p, r]) => `
        <li class="row" data-layout data-n="${n}" data-p="${p}" data-r="${r}"><span>${n}</span><span>${p} EUR</span><span>${r} stars</span></li>`).join('')}</ul>
    </div>`;
  const opts = [...el.querySelectorAll<HTMLButtonElement>('.opt')];
  const rows = el.querySelector('.rows') as HTMLElement;
  let pill = 'Bouncy spring';
  let current: Sort | null = null;

  const choose = (sort: Sort): void => {
    if (sort === current) return;
    const first = current === null;
    current = sort;
    const update = (): void => {
      el.querySelector('[data-layout-id="sort-pill"]')?.remove();
      const dot = document.createElement('i');
      dot.className = 'pill';
      dot.setAttribute('data-layout-id', 'sort-pill');
      opts.find((o) => o.dataset.s === sort)!.append(dot);
      opts.forEach((o) => o.setAttribute('aria-pressed', String(o.dataset.s === sort)));
      const key = { Name: 'n', Price: 'p', Rating: 'r' }[sort];
      const items = [...rows.children] as HTMLElement[];
      items.sort((a, b) => (sort === 'Name' ? a.dataset.n!.localeCompare(b.dataset.n!) : Number(b.dataset[key]) - Number(a.dataset[key])));
      rows.append(...items);
    };
    if (first) return update();
    // Default for every element: a short tween. .shared() overrides it for the pill only.
    const run = animateLayout(el, update, { duration: 0.3 });
    const own = PILL[pill];
    if (own) run.shared('sort-pill', own);
  };

  const scope = scopeMotion(el, () => {
    choose('Name');
    if (preview) {
      let n = 0;
      const tick = (): void => {
        choose(SORTS[++n % SORTS.length]!);
        delay(tick, 1.4);
      };
      delay(tick, 1);
      return;
    }
    opts.forEach((o) => o.addEventListener('click', () => scope.run(() => choose(o.dataset.s as Sort))));
  });

  if (preview) return () => scope.cancel();
  const p = panel(el);
  p.select('Pill transition', Object.keys(PILL), pill, (v) => { pill = v; });
  hint(el, 'Click the sort options. The list always uses the quick default; change the pill transition to see how .shared() makes the pill differ.');
  return () => {
    scope.cancel();
    p.dispose();
  };
};

export default mount;
