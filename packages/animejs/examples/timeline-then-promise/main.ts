// Timeline then(): a promise status readout that flips from pending to fulfilled
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  let tl: ReturnType<typeof createTimeline> | undefined;
  let alive = true;
  const setStatus = sc.readout(sc.panel(), 'promise status', 'pending');

  const run = (): void => {
    tl?.revert();
    setStatus('pending');
    const current = createTimeline({ defaults: { duration: 500 }, loop: 1 })
      .add(sc.circle, { x: '10rem' })
      .add(sc.triangle, { x: '10rem' })
      .add(sc.square, { x: '10rem' });
    tl = current;
    current.then(() => {
      if (!alive || tl !== current) return;
      setStatus('fulfilled');
      if (preview) sc.later(run, 900);
    });
  };
  run();
  if (!preview) sc.button(sc.panel(), 'Replay', run);

  return () => {
    alive = false;
    sc.dispose();
    tl?.revert();
  };
};

export default mount;
