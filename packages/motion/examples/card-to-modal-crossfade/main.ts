// A card opens into a modal: the card stays, the modal arrives with the same data-layout-id
import { animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const APPS = [
  ['Orbit', 'Habit tracker', '#7c5cff'],
  ['Tidal', 'Weather radar', '#2fc4b2'],
  ['Ember', 'Recipe box', '#ff7a59'],
] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="store">
      <div class="cards">${APPS.map(([n, s, c], i) => `
        <button class="card" data-layout-id="crossfade-card-${i}" style="--c:${c}"><i></i><b>${n}</b><span>${s}</span></button>`).join('')}</div>
      <div class="sheet"></div>
    </div>`;
  if (!preview) hint(el, 'Open a card, then click the sheet or press Escape to close it. Opening crossfades because the card stays in the page; closing just fades the sheet away, since a crossfade back is not something vanilla Motion can do yet.');
  const sheet = el.querySelector('.sheet') as HTMLElement;
  let openId = -1;
  let removeKey: VoidFunction | undefined;

  const scope = scopeMotion(el, () => {
    const open = (i: number): void => {
      const [n, s, c] = APPS[i]!;
      openId = i;
      animateLayout(el, () => {
        // Adding the expanded version, with the card's data-layout-id, to another container.
        sheet.classList.add('open');
        sheet.innerHTML = `<div class="modal" data-layout-id="crossfade-card-${i}" style="--c:${c}">
          <i></i><b>${n}</b><span>${s}</span><p>Plan the day, keep streaks, and see the week at a glance. Free, no account needed.</p></div>`;
      }, { type: 'spring', visualDuration: 0.5, bounce: 0.15 });
    };
    const close = (): void => {
      openId = -1;
      animateLayout(el, () => {
        sheet.classList.remove('open');
        sheet.replaceChildren();
      }, { type: 'spring', visualDuration: 0.45, bounce: 0.1 });
    };
    if (preview) {
      let n = 0;
      const tick = (): void => {
        if (openId < 0) {
          open(n++ % APPS.length);
          delay(tick, 1.8);
        } else {
          close();
          delay(tick, 1);
        }
      };
      delay(tick, 0.8);
      return;
    }
    el.querySelectorAll<HTMLElement>('.card').forEach((card, i) => card.addEventListener('click', () => scope.run(() => open(i))));
    sheet.addEventListener('click', () => scope.run(close));
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && openId >= 0) scope.run(close);
    };
    document.addEventListener('keydown', onKey);
    removeKey = () => document.removeEventListener('keydown', onKey);
  });
  return () => {
    removeKey?.();
    scope.cancel();
  };
};

export default mount;
