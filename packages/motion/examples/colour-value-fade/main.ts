// A card background faded between colours with animate('#from', '#to', { onUpdate })
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const MOODS = {
  Dawn: { sky: '#f4a6a0', text: '#3a1c2c', label: '6:10 am' },
  Noon: { sky: '#4aa8ff', text: '#06223d', label: '12:30 pm' },
  Dusk: { sky: '#d4547a', text: '#ffffff', label: '7:45 pm' },
  Night: { sky: '#0e1a3a', text: '#cdd7ff', label: '11:50 pm' },
} as const;
type Mood = keyof typeof MOODS;
const NAMES = Object.keys(MOODS) as Mood[];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<div class="sky"><b>Helsinki</b><span class="clock"></span></div>';
  const sky = el.querySelector<HTMLElement>('.sky') as HTMLElement;
  const clock = el.querySelector<HTMLElement>('.clock') as HTMLElement;
  clock.textContent = MOODS.Dawn.label;
  let colour: string = MOODS.Dawn.sky;
  const paint = (c: string): void => {
    colour = c;
    sky.style.background = c;
  };
  paint(colour);
  sky.style.color = MOODS.Dawn.text;

  const scope = scopeMotion(el, () => {
    const goTo = (m: Mood): void => {
      sky.style.color = MOODS[m].text;
      clock.textContent = MOODS[m].label;
      // No element here: just two colours, and every blend in between arrives in onUpdate.
      animate(colour, MOODS[m].sky, { duration: 1.6, onUpdate: paint });
    };

    if (preview) {
      let i = 0;
      const tick = (): void => {
        i = (i + 1) % NAMES.length;
        goTo(NAMES[i] as Mood);
        delay(tick, 2.2);
      };
      delay(tick, 1.2);
      return;
    }
    const p = panel(el);
    for (const m of NAMES) p.button(m, () => goTo(m));
    hint(el, 'Click quickly between moods: each fade starts from whatever colour is on screen.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
