// Five staggered circles follow a scripted path; revert() destroys the animatable and clears inline styles
import { createAnimatable, stagger } from 'animejs';
import type { AnimatableObject, AnimatableProperty } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

type Mover = AnimatableObject & { x: AnimatableProperty; y: AnimatableProperty };

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const circles: HTMLElement[] = [];
  for (let i = 0; i < 5; i++) {
    const c = document.createElement('div');
    c.className = 'circle';
    row.append(c);
    circles.push(c);
  }
  const status = document.createElement('p');
  status.className = 'status';
  el.append(row, status);

  let animatable: Mover | undefined;
  const create = (): void => {
    animatable = createAnimatable(circles, {
      x: stagger(50, { from: 'center', start: 100 }),
      y: stagger(200, { from: 'center', start: 200 }),
      ease: 'out(4)',
    }) as Mover;
    status.textContent = 'live: setters are animating the circles';
  };

  let t = 0;
  const timer = window.setInterval(() => {
    t += 1;
    animatable?.x(Math.sin(t * 0.9) * 40);
    animatable?.y(Math.cos(t * 1.4) * 30);
  }, 600);
  create();

  const cleanups: Array<() => void> = [];
  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const mk = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      bar.append(b);
      cleanups.push(() => b.removeEventListener('click', fn));
    };
    mk('revert()', () => {
      animatable?.revert();
      animatable = undefined;
      status.textContent = 'reverted: values and inline styles are gone';
    });
    mk('Create again', () => {
      animatable?.revert();
      create();
    });
    el.append(bar);
  }

  return () => {
    window.clearInterval(timer);
    cleanups.forEach((fn) => fn());
    animatable?.revert();
  };
};

export default mount;
