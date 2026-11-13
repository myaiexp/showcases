// SnapPlugin modes (increment, array, array with radius) next to an unsnapped ghost on the same ease
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const TRAVEL = 200;

interface Mode {
  label: string;
  code: string;
  ticks: number[];
  snap: gsap.TweenVars['snap'];
}

const MODES: Mode[] = [
  { label: 'increment', code: 'snap: { x: 40 }', ticks: [0, 40, 80, 120, 160, 200], snap: { x: 40 } },
  {
    label: 'array',
    code: 'snap: { x: [0, 50, 150, 200] }',
    ticks: [0, 50, 150, 200],
    snap: { x: [0, 50, 150, 200] },
  },
  {
    label: 'array + radius',
    code: 'snap: { x: { values: [0, 100, 200], radius: 25 } }',
    ticks: [0, 100, 200],
    snap: { x: { values: [0, 100, 200], radius: 25 } },
  },
];

const mount: Mount = (el, { preview }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'rows compact' : 'rows';
  const pairs: { ghost: HTMLElement; dot: HTMLElement; snap: Mode['snap'] }[] = [];
  for (const m of MODES) {
    const row = document.createElement('div');
    row.className = 'row';
    const title = document.createElement('div');
    title.className = 'title';
    const strong = document.createElement('strong');
    strong.textContent = m.label;
    title.append(strong);
    if (!preview) {
      const code = document.createElement('code');
      code.textContent = m.code;
      title.append(code);
    }
    const track = document.createElement('div');
    track.className = 'track';
    for (const t of m.ticks) {
      const tick = document.createElement('i');
      tick.style.left = `${t}px`;
      track.append(tick);
    }
    const ghost = document.createElement('div');
    ghost.className = 'dot ghost';
    const dot = document.createElement('div');
    dot.className = 'dot';
    track.append(ghost, dot);
    pairs.push({ ghost, dot, snap: m.snap });
    row.append(title, track);
    wrap.append(row);
  }
  el.append(wrap);

  const ctx = gsap.context(() => {
    const common = { duration: 3, ease: 'power1.inOut', repeat: -1, yoyo: true, x: TRAVEL };
    for (const p of pairs) {
      gsap.to(p.ghost, common);
      gsap.to(p.dot, { ...common, snap: p.snap });
    }
  }, el);

  if (!preview) {
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'Hollow dot: the raw tween. Solid dot: the same tween with snap applied live on every update.';
    el.append(note);
  }

  return () => {
    ctx.revert();
  };
};

export default mount;
