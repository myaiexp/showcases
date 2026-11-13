// utils.remove(): detach a target from all animations, or only one property from one animation
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const lanes = [0, 1].map(() => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const sq = document.createElement('div');
    sq.className = 'rm-sq';
    lane.append(sq);
    el.append(lane);
    return sq;
  });
  const readout = document.createElement('pre');
  readout.className = 'readout';
  if (!preview) el.append(readout);

  let updates = 0;
  let removed = 'nothing removed yet';
  let animation: ReturnType<typeof animate> | null = null;
  const paint = (): void => {
    readout.textContent = `updates: ${updates}\nlast remove(): ${removed}`;
  };
  const build = (): void => {
    animation?.revert();
    updates = 0;
    removed = 'nothing removed yet';
    animation = animate(lanes, {
      x: 220,
      rotate: 360,
      duration: 1600,
      alternate: true,
      loop: true,
      onUpdate: () => { updates++; paint(); },
    });
  };
  const removeFirst = (): void => {
    const out = utils.remove(lanes[0] as HTMLElement);
    removed = `remove(first square) -> ${out.length} target`;
    paint();
  };
  const removeXSecond = (): void => {
    if (!animation) return;
    const out = utils.remove(lanes[1] as HTMLElement, animation, 'x');
    removed = `remove(second square, animation, 'x') -> ${out.length} target`;
    paint();
  };

  build();
  let timer = 0;
  if (preview) {
    // 0 run, 1 first removed, 2 x removed on second, then restart
    let step = 0;
    timer = window.setInterval(() => {
      step = (step + 1) % 4;
      if (step === 1) removeFirst();
      else if (step === 2) removeXSecond();
      else if (step === 3) { /* let the survivors run */ }
      else build();
    }, 1800);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const mk = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      panel.append(b);
    };
    mk('Remove all from first', removeFirst);
    mk('Remove x from second', removeXSecond);
    mk('Restart', build);
    el.append(panel);
  }

  return () => {
    window.clearInterval(timer);
    animation?.revert();
  };
};

export default mount;
