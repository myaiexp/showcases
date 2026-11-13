// A block flung along a lane by spring(): perceived or physics parameters, adjustable live
import { animate, spring } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

type Mode = 'perceived' | 'physics';
const P = { bounce: 0.5, duration: 500, mass: 1, stiffness: 100, damping: 10, velocity: 0 };

const mount: Mount = (el, { preview }) => {
  const lane = document.createElement('div');
  lane.className = 'lane';
  const block = document.createElement('div');
  block.className = 'block';
  lane.append(block);
  el.append(lane);

  const status = document.createElement('div');
  status.className = 'status';
  let mode: Mode = 'perceived';
  let anim: { revert(): unknown } | undefined;
  let forward = true;

  const play = (): void => {
    anim?.revert();
    status.textContent = '';
    const distance = lane.clientWidth - block.offsetWidth - 8;
    const to = forward ? distance : 0;
    forward = !forward;
    const ease =
      mode === 'perceived'
        ? spring({
            bounce: P.bounce,
            duration: P.duration,
            // Fires when the spring *feels* done, before the settling duration ends.
            onComplete: () => (status.textContent = 'spring onComplete (perceived)'),
          })
        : spring({ mass: P.mass, stiffness: P.stiffness, damping: P.damping, velocity: P.velocity });
    anim = animate(block, {
      x: to,
      rotate: forward ? 0 : 180,
      ease,
      onComplete: () => {
        if (!preview) status.textContent += ' | animation onComplete (settled)';
      },
    });
  };

  let timer = 0;
  if (preview) {
    P.bounce = 0.55;
    play();
    timer = window.setInterval(play, 1800);
    return () => {
      window.clearInterval(timer);
      anim?.revert();
    };
  }

  const ui = document.createElement('div');
  ui.className = 'controls';
  const mode$ = document.createElement('select');
  mode$.append(new Option('perceived (bounce, duration)', 'perceived'), new Option('physics (mass, stiffness, damping, velocity)', 'physics'));
  mode$.addEventListener('change', () => {
    mode = mode$.value as Mode;
    show();
  });
  ui.append(mode$);
  const defs: [keyof typeof P, Mode, number, number, number][] = [
    ['bounce', 'perceived', -0.5, 1, 0.05],
    ['duration', 'perceived', 100, 2000, 50],
    ['mass', 'physics', 1, 10, 0.5],
    ['stiffness', 'physics', 10, 400, 5],
    ['damping', 'physics', 1, 60, 1],
    ['velocity', 'physics', -200, 200, 10],
  ];
  const rows: [Mode, HTMLElement][] = [];
  P.bounce = 0.5;
  for (const [key, m, min, max, step] of defs) {
    const l = document.createElement('label');
    const out = document.createElement('output');
    const r = document.createElement('input');
    r.type = 'range';
    r.min = String(min);
    r.max = String(max);
    r.step = String(step);
    r.value = String(P[key]);
    out.textContent = `${key} ${P[key]}`;
    r.addEventListener('input', () => {
      P[key] = Number(r.value);
      out.textContent = `${key} ${P[key]}`;
    });
    l.append(out, r);
    ui.append(l);
    rows.push([m, l]);
  }
  const show = (): void => rows.forEach(([m, l]) => (l.hidden = m !== mode));
  show();
  const go = document.createElement('button');
  go.className = 'btn btn-primary';
  go.textContent = 'Fling the block';
  go.addEventListener('click', play);
  ui.append(go);
  el.append(ui, status);
  play();

  return () => anim?.revert();
};

export default mount;
