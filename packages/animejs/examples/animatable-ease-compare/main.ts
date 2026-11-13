// Three animatables share one target but differ in duration and ease, set globally, per property, or per call
import { createAnimatable } from 'animejs';
import type { AnimatableObject, AnimatableProperty } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

interface Row {
  title: string;
  dot: HTMLElement;
  track: HTMLElement;
}
type XAnimatable = AnimatableObject & { x: AnimatableProperty };

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const rows: Row[] = [];
  const board = document.createElement('div');
  board.className = 'board';
  for (const title of ["global ease: 'linear'", "x: { duration: 1200, ease: 'outElastic' }", "setter override: x(v, 300, 'out(4)')"]) {
    const row = document.createElement('div');
    row.className = 'row';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = title;
    const track = document.createElement('div');
    track.className = 'track';
    const dot = document.createElement('div');
    dot.className = 'dot';
    track.append(dot);
    row.append(label, track);
    board.append(row);
    rows.push({ title, dot, track });
  }
  el.append(board);

  const [r0, r1, r2] = rows as [Row, Row, Row];
  const a = createAnimatable(r0.dot, { x: 600, ease: 'linear' }) as XAnimatable;
  // A property can carry its own settings by passing an object instead of a duration.
  const b = createAnimatable(r1.dot, { x: { duration: 1200, ease: 'outElastic' } }) as XAnimatable;
  const c = createAnimatable(r2.dot, { x: 1000 }) as XAnimatable;

  let right = false;
  const range = (): number => r0.track.clientWidth - r0.dot.offsetWidth - 2;
  const go = (toRight: boolean): void => {
    right = toRight;
    const x = right ? range() : 0;
    a.x(x);
    b.x(x);
    c.x(x, 300, 'out(4)');
  };
  const toggle = (): void => go(!right);

  const timer = window.setInterval(toggle, preview ? 1600 : 2200);

  let btn: HTMLButtonElement | undefined;
  const onClick = (): void => {
    window.clearInterval(timer);
    toggle();
  };
  if (!preview) {
    btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Move now (stops the auto loop)';
    btn.addEventListener('click', onClick);
    el.append(btn);
  }

  return () => {
    window.clearInterval(timer);
    btn?.removeEventListener('click', onClick);
    a.revert();
    b.revert();
    c.revert();
  };
};

export default mount;
