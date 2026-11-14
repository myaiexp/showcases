// A playlist whose rows glide to their new positions when the order changes
import { animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TRACKS = [
  ['Night Drive', '3:42', '#7c5cff'],
  ['Paper Planes', '2:58', '#ff7a59'],
  ['Low Tide', '4:10', '#2fc4b2'],
  ['Glass Garden', '3:21', '#f2b84b'],
  ['Slow Burn', '5:03', '#e5546b'],
] as const;

const mount: Mount = (el, { preview }) => {
  const rows = preview ? TRACKS.slice(0, 4) : TRACKS;
  el.innerHTML = `<ul class="playlist">${rows.map(([name, len, c]) => `
    <li class="track" data-layout data-name="${name}">
      <i class="cover" style="background:${c}"></i><span class="name">${name}</span><span class="len">${len}</span>
    </li>`).join('')}</ul>`;
  const list = el.querySelector('.playlist') as HTMLElement;

  // Re-appending the existing <li>s in a new order is the whole update.
  const reorder = (order: (items: HTMLElement[]) => HTMLElement[]): void => {
    animateLayout(el, () => list.append(...order([...list.children] as HTMLElement[])), { type: 'spring', visualDuration: 0.5, bounce: 0.25 });
  };
  const shuffle = (): void => reorder((items) => items.map((i) => [Math.random(), i] as const).sort((a, b) => a[0] - b[0]).map(([, i]) => i));

  const scope = scopeMotion(el, () => {
    if (!preview) return;
    const tick = (): void => {
      shuffle();
      delay(tick, 1.6);
    };
    delay(tick, 0.8);
  });
  if (preview) return () => scope.cancel();

  const onClick = (e: Event): void => {
    const track = (e.target as Element).closest<HTMLElement>('.track');
    if (track) scope.run(() => reorder((items) => [track, ...items.filter((i) => i !== track)]));
  };
  el.addEventListener('click', onClick);
  const p = panel(el);
  p.button('Shuffle', () => scope.run(shuffle));
  p.button('Sort A to Z', () => scope.run(() => reorder((items) => items.sort((a, b) => a.dataset.name!.localeCompare(b.dataset.name!)))));
  p.button('Reverse', () => scope.run(() => reorder((items) => items.reverse())));
  hint(el, 'Shuffle, sort or reverse the list, or click any song to play it next. Each row is a data-layout element, so it travels from where it was.');

  return () => {
    scope.cancel();
    el.removeEventListener('click', onClick);
    p.dispose();
  };
};

export default mount;
