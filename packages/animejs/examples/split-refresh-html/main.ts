// Grow and shrink a split paragraph by editing split.html and calling refresh()
import { animate, splitText, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow } from './ui.ts';
import './style.css';

const POOL = ['velvet', 'lantern', 'orbit', 'quiet', 'ember', 'harbour', 'static', 'meadow'];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Words come and go';
  stage.append(p);
  el.append(stage);

  const split = splitText(p, { lines: { wrap: 'clip' }, debug: true });
  split.addEffect((self) =>
    animate(self.words, {
      y: ['0%', '60%'],
      duration: 900,
      loop: true,
      alternate: true,
      ease: 'inOutQuad',
      delay: stagger(120),
    }),
  );

  const words = ['Words', 'come', 'and', 'go'];
  const apply = (): void => {
    split.html = words.join(' ');
    split.refresh();
    readout.textContent = `${words.length} words`;
  };
  const add = (): void => {
    words.push(POOL[Math.floor(Math.random() * POOL.length)]!);
    apply();
  };
  const remove = (): void => {
    if (words.length > 1) words.splice(Math.floor(Math.random() * words.length), 1);
    apply();
  };

  const readout = document.createElement('div');
  readout.className = 'readout';
  let timer = 0;
  if (preview) {
    let growing = true;
    timer = window.setInterval(() => {
      if (words.length >= 9) growing = false;
      if (words.length <= 3) growing = true;
      if (growing) add();
      else remove();
    }, 1300);
  } else {
    const row = controlRow(el);
    button(row, 'Add word', add);
    button(row, 'Remove word', remove);
    el.append(readout);
    readout.textContent = `${words.length} words`;
  }

  return () => {
    window.clearInterval(timer);
    split.revert();
    el.replaceChildren();
  };
};

export default mount;
