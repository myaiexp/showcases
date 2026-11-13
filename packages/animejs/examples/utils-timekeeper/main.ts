// utils.keepTime(): recreate a spinning animation on another clock without losing its progress
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

type Anim = ReturnType<typeof animate>;

const mount: Mount = (el, { preview }) => {
  const lanes = ['keepTime()', 'plain revert + animate()'].map((name) => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const clocks = [0, 1, 2].map(() => {
      const c = document.createElement('div');
      c.className = 'clock';
      lane.append(c);
      return c;
    });
    const label = document.createElement('div');
    label.className = 'label';
    label.append(name + ' ', document.createElement('span'));
    lane.append(label);
    el.append(lane);
    return { clocks, readout: label.lastElementChild as HTMLElement };
  });

  const make = (clock: HTMLElement): Anim => animate(clock, {
    rotate: 360,
    color: ['#B7FF54', '#FF4B4B'],
    ease: 'linear',
    duration: 6000,
    loop: true,
  });

  // Lane 0: keepTime() reverts the previous instance and resumes at the same progress.
  let kIndex = 0;
  let kAnim: Anim | null = null;
  const nextKept = utils.keepTime(() => {
    kAnim = make(lanes[0]!.clocks[kIndex % 3]!);
    return kAnim;
  });
  // Lane 1: the same swap without keepTime() starts over.
  let pIndex = 0;
  let pAnim: Anim | null = null;
  const nextPlain = (): void => {
    pAnim?.revert();
    pAnim = make(lanes[1]!.clocks[pIndex % 3]!);
  };

  const rd = (a: Anim | null): string => (a ? a.iterationProgress.toFixed(2) : '-');
  const paint = animate({ v: 0 }, { v: 1, duration: 100, loop: true, onUpdate: () => {
    lanes[0]!.readout.textContent = 'progress ' + rd(kAnim);
    lanes[1]!.readout.textContent = 'progress ' + rd(pAnim);
  } });

  nextKept();
  nextPlain();
  const swap = (): void => {
    kIndex++;
    pIndex++;
    nextKept();
    nextPlain();
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(swap, 1500);
  } else {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Switch target';
    b.addEventListener('click', swap);
    el.append(b);
  }

  return () => {
    window.clearInterval(timer);
    paint.revert();
    kAnim?.revert();
    pAnim?.revert();
  };
};

export default mount;
