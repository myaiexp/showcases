// Timeline revert() and play(): revert undoes the inline styles, play drives a paused timeline
import { createTimeline, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  const shapes = [sc.circle, sc.triangle, sc.square];
  utils.set(shapes, { x: '10rem' });

  const tl = createTimeline({ autoplay: false, loop: true, alternate: true })
    .add(sc.circle, { x: 0 })
    .add(sc.triangle, { x: 0 }, 500)
    .add(sc.square, { x: 0 }, 1000);

  if (!preview) {
    const p = sc.panel();
    sc.button(p, 'play()', () => tl.play());
    sc.button(p, 'revert()', () => tl.revert());
    sc.button(p, 'restart()', () => tl.restart());
    const setStyle = sc.readout(sc.panel(), 'circle inline transform', '-');
    const setPaused = sc.readout(sc.panel(), 'paused', 'true');
    sc.every(() => {
      setStyle(sc.circle.style.transform || '(none)');
      setPaused(String(tl.paused));
    }, 100);
  } else {
    // Play for a while, revert, then play again.
    const cycle = (): void => {
      tl.play();
      sc.later(() => tl.revert(), 2400);
    };
    cycle();
    sc.every(cycle, 3600);
  }

  return () => {
    sc.dispose();
    tl.revert();
  };
};

export default mount;
