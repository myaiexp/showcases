// Confetti landing spots from mix(a, b, Math.random()), reshaped by passing the random number through an easing
import { animate, delay, easeIn, easeOut, mix, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const SHAPES = {
  'linear (plain)': (p: number) => p,
  'easeOut (mostly far)': easeOut,
  'easeIn (mostly near)': easeIn,
} as const;
type Shape = keyof typeof SHAPES;
const COLOURS = ['#ff4d6d', '#ffd24a', '#4dd2ff', '#7cf08a', '#c084fc'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="party${preview ? '' : ' full'}">
      <div class="sky"><div class="cannon"></div></div>
      <div class="ground"><span>near</span><span>far</span></div>
      <code class="label"></code>
    </div>`;
  const sky = el.querySelector<HTMLElement>('.sky')!;
  const label = el.querySelector<HTMLElement>('.label')!;
  let shape: Shape = 'linear (plain)';
  let amount = preview ? 24 : 60;
  let n = 0;
  let p: ReturnType<typeof panel> | undefined;
  const landed: HTMLElement[] = [];

  const scope = scopeMotion(el, () => {
    const fire = (): void => {
      label.textContent = `mix(40, ${sky.clientWidth - 30}, ${shape === 'linear (plain)' ? 'Math.random()' : shape.startsWith('easeOut') ? 'easeOut(Math.random())' : 'easeIn(Math.random())'})`;
      const maxX = sky.clientWidth - 30;
      for (let i = 0; i < amount; i++) {
        const bit = document.createElement('i');
        bit.style.background = COLOURS[n++ % COLOURS.length]!;
        sky.append(bit);
        landed.push(bit);
        // The landing spot: a random 0-1 number, optionally reshaped, mapped onto the distance range.
        const x = mix(40, maxX, SHAPES[shape](Math.random()));
        const lift = mix(50, sky.clientHeight - 40, Math.random());
        const duration = mix(0.7, 1.2, Math.random());
        animate(bit, { x: [0, x] }, { duration, ease: 'linear' });
        animate(bit, { y: [0, -lift, 0], rotate: [0, mix(-360, 360, Math.random())] }, { duration, ease: ['easeOut', 'easeIn'] });
      }
      while (landed.length > (preview ? 90 : 300)) landed.shift()!.remove();
    };
    const clear = (): void => { for (const b of landed.splice(0)) b.remove(); };

    if (preview) {
      const names = Object.keys(SHAPES) as Shape[];
      let round = 0;
      const tick = (): void => {
        clear();
        shape = names[round++ % names.length]!;
        fire();
        delay(tick, 3);
      };
      delay(tick, 0.3);
    } else {
      hint(el, 'Fire a burst and watch where the confetti piles up. The same random number reshaped by an easing function gives a different spread without changing the mix() call.');
      p = panel(el);
      p.button('Fire', fire);
      p.button('Clear', clear);
      p.select('random shape', Object.keys(SHAPES) as Shape[], shape, (v) => { shape = v; });
      p.slider('pieces', { min: 10, max: 120, step: 5, value: amount }, (v) => { amount = v; });
      label.textContent = 'press Fire';
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
