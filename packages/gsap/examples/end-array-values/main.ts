// endArray tweens one array of numbers to another; the bars redraw from the array on each update
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
const N = 14;
const A = Array.from({ length: N }, (_, i) => 20 + 60 * Math.abs(Math.sin(i * 0.5)));
const B = Array.from({ length: N }, (_, i) => 15 + 70 * Math.abs(Math.cos(i * 0.7 + 1)));

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 280 100');
  svg.setAttribute('class', 'stage');
  const bars = A.map((_, i) => {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', String(6 + i * 19));
    r.setAttribute('width', '14');
    r.setAttribute('rx', '3');
    svg.append(r);
    return r;
  });
  root.append(svg);
  const note = document.createElement('p');
  note.className = 'note';
  el.append(root);

  const values = A.slice(); // the array being tweened
  const draw = (): void => {
    bars.forEach((bar, i) => {
      const v = values[i] ?? 0;
      bar.setAttribute('y', String(100 - v));
      bar.setAttribute('height', String(v));
    });
  };
  draw();

  let tween: gsap.core.Tween | undefined;
  const ctx = gsap.context(() => {
    if (preview) {
      tween = gsap.to(values, { endArray: B, duration: 1.6, ease: 'power2.inOut', yoyo: true, repeat: -1, repeatDelay: 0.4, onUpdate: draw });
      return;
    }
    const bar = document.createElement('div');
    bar.className = 'bar';
    // A click handler runs outside the context, so each tween is killed by handle.
    const go = (label: string, target: number[]): void => {
      tween?.kill();
      tween = gsap.to(values, { endArray: target, duration: 1.2, ease: 'power2.inOut', onUpdate: draw });
      note.textContent = `endArray with ${target.length} values (the array has ${N}). ${label}`;
    };
    const buttons: Array<[string, () => void]> = [
      ['To array B', () => go('Every index moves.', B)],
      ['Back to A', () => go('Every index moves.', A)],
      ['Random 14', () => go('Every index moves.', A.map(() => 10 + Math.random() * 85))],
      ['Shorter (5 values)', () => go('Only indexes 0 to 4 are in both arrays, so the rest stay put.', [95, 10, 95, 10, 95])],
    ];
    for (const [text, fn] of buttons) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      bar.append(b);
    }
    root.append(bar, note);
    note.textContent = 'gsap.to(values, { endArray: [...] }): pick a target array.';
  }, el);

  return () => {
    tween?.kill();
    ctx.revert();
  };
};

export default mount;
