// Timeline add(): a timer, an animation and a second timer placed on labels
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  let setT1 = (_v: string | number): void => {};
  let setT2 = (_v: string | number): void => {};
  if (!preview) {
    const p = sc.panel();
    setT1 = sc.readout(p, 'timer 1 currentTime', '0');
    setT2 = sc.readout(p, 'timer 2 currentTime', '0');
  }

  const tl = createTimeline({ loop: true })
    .label('start timer 1', 0)
    .label('animate circle', 1000)
    .label('start timer 2', 2000)
    // add(timerParameters, position)
    .add({ duration: 1000, onUpdate: (self) => setT1(Math.round(self.currentTime)) }, 'start timer 1')
    // add(targets, parameters, position)
    .add(sc.circle, { duration: 2000, x: '10rem' }, 'animate circle')
    .add({ duration: 1000, onUpdate: (self) => setT2(Math.round(self.currentTime)) }, 'start timer 2');

  if (!preview) {
    sc.button(sc.panel(), 'Restart', () => tl.restart());
  }

  return () => {
    sc.dispose();
    tl.revert();
  };
};

export default mount;
