// Timeline cancel(), reset() and complete(): three ways to stop, with a live state readout
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  const tl = createTimeline({ loop: 2, alternate: true })
    .add(sc.circle, { x: '10rem' })
    .add(sc.triangle, { x: '10rem' }, 500)
    .add(sc.square, { x: '10rem' }, 1000);

  if (!preview) {
    const p = sc.panel();
    sc.button(p, 'cancel()', () => tl.cancel());
    sc.button(p, 'reset()', () => tl.reset());
    sc.button(p, 'complete()', () => tl.complete());
    sc.button(p, 'play()', () => tl.play());
    const r = sc.panel();
    const setTime = sc.readout(r, 'currentTime', '0');
    const setPaused = sc.readout(r, 'paused', 'false');
    const setBegan = sc.readout(r, 'began', 'false');
    const setDone = sc.readout(r, 'completed', 'false');
    sc.every(() => {
      setTime(Math.round(tl.currentTime));
      setPaused(String(tl.paused));
      setBegan(String(tl.began));
      setDone(String(tl.completed));
    }, 80);
  } else {
    // Cycle: play, cancel, play again, complete, reset.
    const steps: Array<[() => void, number]> = [
      [() => tl.play(), 1500],
      [() => tl.cancel(), 700],
      [() => tl.play(), 1500],
      [() => tl.complete(), 1100],
      [() => tl.reset(), 700],
    ];
    let i = 0;
    const next = (): void => {
      const [fn, wait] = steps[i % steps.length]!;
      i++;
      fn();
      sc.later(next, wait);
    };
    next();
  }

  return () => {
    sc.dispose();
    tl.revert();
  };
};

export default mount;
