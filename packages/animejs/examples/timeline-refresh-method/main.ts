// Timeline refresh(): function-based x values re-rolled on every loop and on demand
import { createTimeline, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  let refreshes = 0;
  let setCount = (_v: string | number): void => {};
  let setX = (_v: string | number): void => {};
  const roll = (): string => `${utils.random(0, 10)}rem`;

  const tl = createTimeline({
    loop: true,
    onLoop: (self) => {
      self.refresh();
      setCount(++refreshes);
    },
  })
    .add(sc.circle, { x: roll }, 0)
    .add(sc.triangle, { x: roll }, 0)
    .add(sc.square, { x: roll }, 0);

  if (!preview) {
    const p = sc.panel();
    setCount = sc.readout(p, 'refresh() calls', '0');
    setX = sc.readout(p, 'circle x', '-');
    sc.every(() => setX(sc.circle.style.transform || 'none'), 100);
    sc.button(sc.panel(), 'Refresh & Restart', () => {
      tl.refresh().restart();
      setCount(++refreshes);
    });
  }

  return () => {
    sc.dispose();
    tl.revert();
  };
};

export default mount;
