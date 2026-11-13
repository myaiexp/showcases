// The priority parameter decides which animation runs first inside the engine tick; the order is read back per frame
import { animate, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const names = ['A', 'B', 'C'];
const presets: { label: string; priorities: number[] }[] = [
  { label: 'default priority (1)', priorities: [1, 1, 1] },
  { label: 'priority 2, 1, 0', priorities: [2, 1, 0] },
  { label: 'priority 0, 2, 1', priorities: [0, 2, 1] },
];

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const rows = document.createElement('div');
  rows.className = 'rows';
  const dots: HTMLElement[] = names.map((n) => {
    const row = document.createElement('div');
    row.className = 'row';
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.textContent = n;
    row.append(dot);
    rows.append(row);
    return dot;
  });
  const label = document.createElement('div');
  label.className = 'label';
  const order = document.createElement('pre');
  order.className = 'order';
  el.append(rows, label, order);

  let anims: JSAnimation[] = [];
  const load = (index: number): void => {
    anims.forEach((a) => a.revert());
    const preset = presets[index];
    if (!preset) return;
    label.textContent = preset.label;
    let seen: string[] = [];
    anims = names.map((name, i) =>
      animate(dots[i] as HTMLElement, {
        x: preview ? '9rem' : '12rem',
        duration: 1600,
        ease: 'inOutSine',
        loop: true,
        alternate: true,
        priority: preset.priorities[i] ?? 1,
        onUpdate: () => {
          // A name repeating means a new engine tick began: show the order of the finished one.
          if (seen.includes(name)) {
            order.textContent = `callback order per frame: ${seen.join(' -> ')}`;
            seen = [];
          }
          seen.push(name);
        },
      }),
    );
  };
  load(0);

  if (preview) {
    let i = 0;
    const timer = window.setInterval(() => load(++i % presets.length), 2500);
    return () => {
      window.clearInterval(timer);
      anims.forEach((a) => a.revert());
    };
  }

  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  const cleanups: (() => void)[] = [];
  presets.forEach((p, i) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = p.label;
    const onClick = (): void => load(i);
    b.addEventListener('click', onClick);
    cleanups.push(() => b.removeEventListener('click', onClick));
    buttons.append(b);
  });
  el.append(buttons);

  return () => {
    cleanups.forEach((fn) => fn());
    anims.forEach((a) => a.revert());
  };
};

export default mount;
