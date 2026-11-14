// A looping row of tiles whose timeline you change while it plays: add, move, remove, clear
import { animate, delay, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="rack">${[1, 2, 3, 4].map((n) => `<div class="tile t${n}">${n}</div>`).join('')}</div><div class="info"></div>`;
  const info = el.querySelector<HTMLElement>('.info')!;

  const scope = scopeMotion(el, (s) => {
    let timeline!: ReturnType<typeof animate>;
    // The segment object is its own handle: keep it to move() or remove() it later.
    const highlight: AnimationSequence[number] = ['.t2', { scale: [1, 1.35, 1], backgroundColor: ['#5b6cff', '#ffcf5c', '#5b6cff'] }, { duration: 0.6 }];
    let hasHighlight = false;

    const status = (): void => {
      const mid = timeline.getLabelTime('mid');
      info.textContent = `label "mid" at ${mid === undefined ? 'none' : mid.toFixed(1) + 's'}  |  length ${timeline.duration.toFixed(1)}s  |  highlight ${hasHighlight ? 'on' : 'off'}`;
    };
    // Edits apply on the next microtask, so read the new length a moment later.
    const later = (): void => {
      delay(status, 0.05);
    };
    const build = (): void => {
      timeline?.cancel();
      hasHighlight = false;
      const tiles = [1, 2, 3, 4].map((n, i): AnimationSequence[number] => ['.t' + n, { y: [0, -22, 0] }, { duration: 0.5, ...(i ? { at: '<+0.3' } : {}) }]);
      timeline = animate([...tiles, 'mid'], { repeat: Infinity });
      // `mid` is placed after the last tile; the highlight will start there.
      status();
    };
    const add = (): void => {
      if (hasHighlight) return;
      timeline.add(highlight, 'mid');
      hasHighlight = true;
      later();
    };
    const move = (): void => {
      if (!hasHighlight) return;
      timeline.move(highlight, Math.random() < 0.5 ? 0 : 'mid-0.4');
      later();
    };
    const remove = (): void => {
      timeline.remove(highlight);
      hasHighlight = false;
      later();
    };
    build();

    if (preview) {
      const steps: (() => void)[] = [add, move, remove];
      let i = 0;
      const tick = (): void => {
        steps[i++ % steps.length]?.();
        delay(tick, 1.8);
      };
      delay(tick, 1);
      return;
    }
    const p = panel(el);
    p.button('Add highlight', () => s.run(add));
    p.button('Move it to the start', () => s.run(() => {
      if (!hasHighlight) return;
      timeline.move(highlight, 0);
      later();
    }));
    p.button('Move it to "mid"', () => s.run(() => {
      if (!hasHighlight) return;
      timeline.move(highlight, 'mid');
      later();
    }));
    p.button('Remove highlight', () => s.run(remove));
    p.button('clear()', () => s.run(() => {
      timeline.clear();
      hasHighlight = false;
      later();
    }));
    p.button('Start over', () => s.run(build));
    hint(el, 'The tiles hop one after another, forever. Add the gold highlight to tile 2 and move it: the timeline changes without stopping. clear() empties it, labels included.');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
