// Home-screen app icons popping in from different origins with stagger(): first, center, last, edges, random or an index
import { animate, delay, scopeMotion, stagger } from 'motion';
import type { StaggerOptions } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const APPS = ['Mail', 'Maps', 'Notes', 'Music', 'Photos', 'Clock', 'Weather', 'Wallet', 'Files', 'Chat', 'Shop', 'News'];
const HUES = [210, 150, 45, 340, 280, 20, 190, 100, 60, 260, 0, 310];
type Origin = 'first' | 'center' | 'last' | 'edges' | 'random' | 'index';
const ORIGINS: Origin[] = ['first', 'center', 'last', 'edges', 'random', 'index'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="phone${preview ? '' : ' full'}">
      <div class="icons">${APPS.map((a, i) => `<div class="icon"><i style="background:hsl(${HUES[i]} 65% 52%)"></i><span>${a}</span></div>`).join('')}</div>
      <code class="call"></code>
    </div>`;
  const call = el.querySelector<HTMLElement>('.call')!;
  let origin: Origin = 'center';
  let index = 5;
  let p: ReturnType<typeof panel> | undefined;
  let run: <R>(cb: () => R) => R = (cb) => cb();

  const play = (): void => {
    const from: StaggerOptions['from'] = origin === 'index' ? index : origin;
    call.textContent = `stagger(0.06, { from: ${typeof from === 'number' ? from : `"${from}"`} })`;
    run(() => {
      // The icons start hidden and small, so the stagger decides who appears when.
      animate('.icon', { opacity: [0, 1], scale: [0.4, 1] }, { type: 'spring', bounce: 0.4, visualDuration: 0.4, delay: stagger(0.06, { from }) });
    });
  };

  const scope = scopeMotion(el, (s) => {
    run = s.run;
    if (preview) {
      let n = 0;
      const tick = (): void => {
        origin = ORIGINS[n++ % ORIGINS.length]!;
        index = 8;
        play();
        delay(tick, 2.6);
      };
      tick();
    } else {
      hint(el, 'Pick where the cascade starts. "edges" closes in from both ends, "random" shuffles, and an index starts at that icon and spreads both ways.');
      p = panel(el);
      p.select('from', ORIGINS, origin, (v) => { origin = v; play(); });
      p.slider('index', { min: 0, max: APPS.length - 1, step: 1, value: index }, (v) => { index = v; origin = 'index'; play(); });
      p.button('Replay', play);
      play();
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
