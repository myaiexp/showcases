// Timeline sync() with WAAPI animations: three native animations staggered on one timeline
import { createTimeline, waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);

  const circle = waapi.animate(sc.circle, { x: '10rem' });
  const triangle = waapi.animate(sc.triangle, {
    x: '10rem',
    y: [0, '-1.5rem', 0],
    ease: 'out(4)',
    duration: 750,
  });
  const square = waapi.animate(sc.square, { x: '10rem', rotateZ: 360 });

  const tl = createTimeline({ loop: true, loopDelay: 500 })
    .sync(circle, 0)
    .sync(triangle, 350)
    .sync(square, 250);

  if (!preview) {
    const p = sc.panel();
    const setTime = sc.readout(p, 'timeline currentTime', '0');
    sc.readout(p, 'timeline duration', String(Math.round(tl.duration)));
    sc.every(() => setTime(Math.round(tl.currentTime)), 80);
    sc.button(sc.panel(), 'Restart', () => tl.restart());
  }

  return () => {
    sc.dispose();
    tl.revert();
    circle.revert();
    triangle.revert();
    square.revert();
  };
};

export default mount;
