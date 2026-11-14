// Eleven runners start together and finish together, each with a different built-in easing name
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const ALL = ['linear', 'easeIn', 'easeOut', 'easeInOut', 'circIn', 'circOut', 'circInOut', 'backIn', 'backOut', 'backInOut', 'anticipate'] as const;
const CARD = ['linear', 'easeIn', 'easeOut', 'easeInOut', 'backOut', 'anticipate'] as const;

const mount: Mount = (el, { preview }) => {
  const names: readonly string[] = preview ? CARD : ALL;
  el.innerHTML = '<div class="race"><div class="lanes"></div></div>';
  el.querySelector('.race')!.classList.toggle('full', !preview);
  const lanes = el.querySelector<HTMLElement>('.lanes')!;
  names.forEach((name, i) => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const label = document.createElement('code');
    label.textContent = name;
    const track = document.createElement('div');
    track.className = 'track';
    const runner = document.createElement('i');
    runner.style.background = `hsl(${i * 33} 70% 62%)`;
    track.append(runner);
    lane.append(label, track);
    lanes.append(lane);
  });

  let seconds = 2;
  const run = (): void => {
    for (const lane of lanes.children) {
      const runner = lane.querySelector('i')!;
      const name = lane.querySelector('code')!.textContent as (typeof ALL)[number];
      const distance = (lane.querySelector('.track') as HTMLElement).clientWidth - runner.offsetWidth;
      // The only difference between the lanes is this one word.
      animate(runner, { x: [0, distance] }, { duration: seconds, ease: name });
    }
  };

  const scope = scopeMotion(el, () => {
    if (preview) {
      // Card: race, wait, race again.
      const go = (): void => {
        run();
        delay(go, seconds + 1);
      };
      delay(go, 0.3);
    } else run();
  });

  const controls = !preview ? panel(el) : undefined;
  controls?.button('Race again', () => scope.run(run));
  controls?.slider('seconds', { min: 0.5, max: 5, step: 0.5, value: seconds }, (v) => {
    seconds = v;
  });
  if (!preview) hint(el, 'Everyone covers the same distance in the same time; only the easing differs. In and back-in start slowly (back-in even steps backwards), out finishes slowly, anticipate winds up first. Change the seconds and race again.');

  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
