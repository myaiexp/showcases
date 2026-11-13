// Timeline sync(): a WAAPI animation and two timelines nested into one main timeline
import { createTimeline, waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  const dist = '10rem';

  const circleAnimation = waapi.animate(sc.circle, { x: dist });
  const tlA = createTimeline()
    .sync(circleAnimation)
    .add(sc.triangle, { x: dist, duration: 2000 })
    .add(sc.square, { x: dist });
  const tlB = createTimeline({ defaults: { duration: 2000 } })
    .add([sc.triangle, sc.square], { rotate: 360 }, 0)
    .add(sc.circle, { scale: [1, 1.5, 1] }, 0);
  const tlMain = createTimeline({ loop: true, alternate: true, loopDelay: 400 })
    .sync(tlA)
    .sync(tlB, '-=2000');

  if (!preview) {
    const p = sc.panel();
    const setTime = sc.readout(p, 'main currentTime', '0');
    sc.readout(p, 'main duration', String(Math.round(tlMain.duration)));
    sc.every(() => setTime(Math.round(tlMain.currentTime)), 100);
    sc.button(sc.panel(), 'Restart', () => tlMain.restart());
  }

  return () => {
    sc.dispose();
    tlMain.revert();
    tlA.revert();
    tlB.revert();
    circleAnimation.revert();
  };
};

export default mount;
