// Springs of rising stiffness converted to linear() easing and run by native element.animate
import { spring, waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stiffnesses = preview ? [100, 150, 200] : [60, 100, 150, 200];
  const lanes = document.createElement('div');
  lanes.className = 'lanes';
  const squares = stiffnesses.map((s) => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const cap = document.createElement('code');
    cap.textContent = `stiffness ${s}`;
    const sq = document.createElement('div');
    sq.className = 'sq';
    lane.append(cap, sq);
    lanes.append(lane);
    return sq;
  });
  el.append(lanes);

  const springs = stiffnesses.map((stiffness) => spring({ stiffness }));
  const out = document.createElement('pre');
  out.className = 'out';

  let running: Animation[] = [];
  const play = (): void => {
    running.forEach((a) => a.cancel());
    // convertEase samples the JS ease into a string such as "linear(0, 0.01, ...)".
    running = squares.map(($el, i) => {
      const sp = springs[i]!;
      const easing = waapi.convertEase(sp.ease);
      if (i === 0) out.textContent = `${easing.slice(0, 80)}...\nduration: ${Math.round(sp.duration)}ms`;
      return $el.animate(
        { translate: ['0rem', '14rem'], rotate: ['0turn', '1turn'] },
        { easing, delay: i * 250, duration: sp.duration, fill: 'forwards' },
      );
    });
  };
  play();

  let timer = 0;
  if (preview) {
    timer = window.setInterval(play, 2800);
  } else {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Replay';
    btn.addEventListener('click', play);
    el.append(btn, out);
  }

  return () => {
    window.clearInterval(timer);
    running.forEach((a) => a.cancel());
  };
};

export default mount;
