// Cards equalised to the tallest one with frame.read, frame.update and frame.render, re-run on every resize with cancelFrame
import { animate, cancelFrame, frame, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const CARDS: [string, string][] = [
  ['Rain', 'Showers until noon.'],
  ['Wind', 'Gusts up to 40 km/h from the west, easing off after dark and settling by morning.'],
  ['Sun', 'Clear from two.'],
  ['Frost', 'Ground frost likely in the valleys tonight, so expect slippery paths.'],
  ['Fog', 'Patchy and thin.'],
  ['Snow', 'Light flurries above 900 metres, mostly on the northern slopes through the evening.'],
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="wrap${preview ? '' : ' full'}">
      <div class="grid">${CARDS.slice(0, preview ? 3 : CARDS.length).map(([h, t]) => `<div class="card"><div class="body"><b>${h}</b><span>${t}</span></div></div>`).join('')}</div>
    </div>`;
  const grid = el.querySelector<HTMLElement>('.grid')!;
  const cards = [...el.querySelectorAll<HTMLElement>('.card')];
  const bodies = cards.map((c) => c.firstElementChild as HTMLElement);
  let on = true;
  let requested = 0;
  let passes = 0;
  let heights: number[] = [];
  let tallest = 0;
  let p: ReturnType<typeof panel> | undefined;
  let showReq: ((v: string | number) => void) | undefined;
  let showPass: ((v: string | number) => void) | undefined;
  let showTall: ((v: string | number) => void) | undefined;

  // Step 1, read: measure every card before touching any of them.
  const read = (): void => {
    heights = bodies.map((b) => b.offsetHeight);
  };
  // Step 2, update: work out the new values from what was read.
  const update = (): void => {
    tallest = Math.max(...heights);
  };
  // Step 3, render: write everything at once.
  const render = (): void => {
    for (const c of cards) c.style.height = `${tallest}px`;
    passes++;
    showPass?.(passes);
    showTall?.(`${tallest}px`);
  };

  const equalise = (): void => {
    requested++;
    showReq?.(requested);
    // Cancel what an earlier call scheduled, so a resize drag costs one pass per frame at most.
    cancelFrame(read);
    cancelFrame(update);
    cancelFrame(render);
    if (!on) return;
    frame.read(read);
    frame.update(update);
    frame.render(render);
  };

  const setWidth = (w: number): void => {
    grid.style.width = `${w}px`;
    equalise();
  };

  const scope = scopeMotion(el, () => {
    if (preview) {
      animate(0, 1, { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', onUpdate: (v) => setWidth(190 + v * 68) });
    } else {
      hint(el, 'Drag the width slider: the text wraps and the cards grow, and every card is stretched to the tallest one. Turn equalising off to see the natural heights.');
      p = panel(el);
      p.slider('width', { min: 170, max: 520, step: 1, value: 420 }, setWidth);
      p.toggle('equalise heights', true, (v) => {
        on = v;
        if (!v) for (const c of cards) c.style.height = '';
        equalise();
      });
      showReq = p.readout('requested', '0');
      showPass = p.readout('frame passes', '0');
      showTall = p.readout('tallest', '');
      setWidth(420);
    }
  });

  return () => {
    scope.cancel();
    cancelFrame(read);
    cancelFrame(update);
    cancelFrame(render);
    p?.dispose();
  };
};

export default mount;
