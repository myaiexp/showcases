// A photo carousel whose prev and next buttons loop around with wrap(0, count, index +/- 1)
import { animate, delay, scopeMotion, wrap } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const PHOTOS = [
  ['Lake', '#2a6fdb, #7cd6f0'],
  ['Forest', '#1f6f3f, #b8e07a'],
  ['Dunes', '#c0702a, #f5d142'],
  ['Harbour', '#3a2a6a, #c0507a'],
  ['Glacier', '#5a8fb0, #eaf6ff'],
] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="gallery${preview ? '' : ' full'}">
      <div class="window">${PHOTOS.map(([name, g], i) => `<figure style="background:linear-gradient(135deg,${g})" data-i="${i}"><figcaption>${name}</figcaption></figure>`).join('')}</div>
      <div class="nav"><button class="btn prev" aria-label="Previous photo">&larr;</button><code class="idx"></code><button class="btn next" aria-label="Next photo">&rarr;</button></div>
    </div>`;
  const figs = [...el.querySelectorAll<HTMLElement>('figure')];
  const idx = el.querySelector<HTMLElement>('.idx')!;
  const prev = el.querySelector<HTMLButtonElement>('.prev')!;
  const next = el.querySelector<HTMLButtonElement>('.next')!;
  let current = 0;
  let p: ReturnType<typeof panel> | undefined;
  const ac = new AbortController();

  const scope = scopeMotion(el, (s) => {
    figs.forEach((f, i) => { f.style.opacity = i === 0 ? '1' : '0'; });
    const go = s.bind((step: number): void => {
      const from = figs[current]!;
      // The whole point: past the last photo it comes back to the first, before the first it jumps to the last.
      const to = wrap(0, PHOTOS.length, current + step);
      idx.textContent = `wrap(0, ${PHOTOS.length}, ${current + step}) = ${to}`;
      current = to;
      const dir = step >= 0 ? 1 : -1;
      animate(from, { x: [0, -40 * dir], opacity: [1, 0] }, { duration: 0.3 });
      animate(figs[to]!, { x: [40 * dir, 0], opacity: [0, 1] }, { duration: 0.3 });
    });
    idx.textContent = `photo 1 of ${PHOTOS.length}`;
    if (preview) {
      // Walks forward past the end, then back past the start.
      let n = 0;
      const tick = (): void => {
        go(n++ < 7 ? 1 : -1);
        if (n >= 11) n = 0;
        delay(tick, 1.1);
      };
      delay(tick, 0.8);
    } else {
      prev.addEventListener('click', () => go(-1), { signal: ac.signal });
      next.addEventListener('click', () => go(1), { signal: ac.signal });
      hint(el, 'Keep pressing next: after the last photo you land on the first again, and previous on the first jumps to the last.');
      p = panel(el);
      p.button('Jump 3 ahead', () => go(3));
    }
  });
  return () => { scope.cancel(); ac.abort(); p?.dispose(); };
};

export default mount;
