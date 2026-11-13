// Tour of waapi.animate conveniences: pick one, see the call and its animation
import type { WAAPIAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { DEMOS } from './demos.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const dots: HTMLElement[] = [];
  for (let i = 0; i < 6; i++) {
    const d = document.createElement('div');
    d.className = 'dot';
    dots.push(d);
    stage.append(d);
  }
  el.append(stage);

  let anim: WAAPIAnimation | undefined;
  const code = document.createElement('pre');
  code.className = 'code';

  const run = (i: number): void => {
    // revert() removes the animation and the styles it left behind.
    anim?.revert();
    const demo = DEMOS[i]!;
    code.textContent = demo.code;
    anim = demo.run(dots);
  };

  let timer = 0;
  if (preview) {
    let n = 0;
    run(0);
    timer = window.setInterval(() => run(++n % DEMOS.length), 2400);
  } else {
    const bar = document.createElement('div');
    bar.className = 'controls';
    DEMOS.forEach((d, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = d.label;
      b.addEventListener('click', () => run(i));
      bar.append(b);
    });
    el.prepend(bar);
    el.append(code);
    run(0);
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
  };
};

export default mount;
