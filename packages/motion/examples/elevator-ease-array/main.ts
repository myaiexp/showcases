// An elevator cab whose keyframes hold at each floor, with an ease array between them
import { animate, scopeMotion } from 'motion';
import type { Easing } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const FLOORS = 4;
const FLOOR_H = 40;
const TRAVEL = ['easeInOut', 'linear', 'circInOut', 'backInOut', 'anticipate'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="building">
      <div class="shaft"><div class="cab"><i></i><i></i></div></div>
      <ol>${Array.from({ length: FLOORS }, (_, i) => `<li>${FLOORS - i}</li>`).join('')}</ol>
    </div>`;

  let travel: (typeof TRAVEL)[number] = 'easeInOut';
  let anim: { stop: () => void } | undefined;

  const scope = scopeMotion(el, () => {
    // y of each floor (floor 0 is the lobby at 0, upward is negative).
    const f = (n: number): number => -n * FLOOR_H;
    const ride = (): void => {
      anim?.stop();
      // Each stop is written twice, so the gap between the pair is a pause.
      const stops = [0, 0, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 0].map(f);
      const times = [0, 0.04, 0.16, 0.2, 0.32, 0.36, 0.48, 0.52, 0.64, 0.68, 0.8, 0.84, 1];
      // 12 gaps: hold (linear), travel, hold, travel...
      const ease: Easing[] = stops.slice(1).map((_, i) => (i % 2 === 0 ? 'linear' : travel));
      anim = animate('.cab', { y: stops }, { duration: 10, times, ease, repeat: Infinity, repeatDelay: 0.5 });
    };
    ride();

    if (preview) return;
    const p = panel(el);
    p.select('between floors', TRAVEL, travel, (v) => { travel = v; ride(); });
    hint(el, 'The ease array has one entry per gap between keyframes. Switch the travel easing and watch the arrivals; backInOut overshoots the floor.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
