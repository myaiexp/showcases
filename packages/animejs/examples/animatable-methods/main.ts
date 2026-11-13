// Animatable methods: getters read the current value, setters chain, revert() undoes it all
import { createAnimatable } from 'animejs';
import type { AnimatableObject } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const circle = document.createElement('div');
  circle.className = 'circle';
  stage.append(circle);
  el.append(stage);

  let reverted = false;
  let a: AnimatableObject = createAnimatable(circle, { x: 800, y: 800, ease: 'out(2)' });
  // Using a setter after revert() starts a fresh animatable on the same element.
  const live = (): AnimatableObject => {
    if (reverted) {
      a = createAnimatable(circle, { x: 800, y: 800, ease: 'out(2)' });
      reverted = false;
    }
    return a;
  };

  if (preview) {
    const spots: [number, number][] = [[-80, -30], [80, -30], [80, 30], [-80, 30]];
    let i = 0;
    const move = (): void => {
      const [x, y] = spots[i++ % spots.length] ?? [0, 0];
      a.x!(x)!.y!(y); // setters return the animatable, so they chain
    };
    move();
    const timer = window.setInterval(move, 900);
    return () => {
      window.clearInterval(timer);
      a.revert();
    };
  }

  const readout = document.createElement('pre');
  readout.className = 'readout';
  const show = (): void => {
    readout.textContent = reverted ? 'reverted: the circle is back at its start' : `x(): ${Number(a.x!()).toFixed(1)}   y(): ${Number(a.y!()).toFixed(1)}`;
  };
  show();
  const timer = window.setInterval(show, 50);

  const panel = document.createElement('div');
  panel.className = 'panel';
  const cleanups: (() => void)[] = [];
  const button = (text: string, fn: () => void): void => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = text;
    btn.addEventListener('click', fn);
    cleanups.push(() => btn.removeEventListener('click', fn));
    panel.append(btn);
  };
  button('x(120)', () => void live().x!(120));
  button('x(-120)', () => void live().x!(-120));
  button("y(50, 500, 'out(2)')", () => void live().y!(50, 500, 'out(2)'));
  button('x(60).y(-50)', () => void live().x!(60)!.y!(-50));
  button('revert()', () => {
    a.revert();
    reverted = true;
  });
  el.append(readout, panel);

  return () => {
    window.clearInterval(timer);
    cleanups.forEach((fn) => fn());
    a.revert();
  };
};

export default mount;
