// A timeline with live playback controls: methods, speed, seek and a state readout
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { buildStage, buildControls } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const { dots, readout } = buildStage(el);
  const [d0, d1, d2] = dots;

  const tl = createTimeline({
    loop: true,
    alternate: true,
    playbackRate: 1,
    autoplay: true,
    onUpdate: (self) => {
      readout.update(self.currentTime, self.speed, self.backwards, self.paused);
    },
  })
    .add(d0, { x: '10rem' })
    .add(d1, { x: '10rem' }, 500)
    .add(d2, { x: '10rem' }, 1000);

  const dispose = preview ? undefined : buildControls(el, tl);

  return () => {
    dispose?.();
    tl.revert();
  };
};

export default mount;
