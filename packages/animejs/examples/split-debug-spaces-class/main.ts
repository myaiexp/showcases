// Re-split with debug and includeSpaces flipped, characters tagged with a custom class
import { animate, splitText, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Count the pieces';
  const readout = document.createElement('div');
  readout.className = 'readout';
  stage.append(p);
  el.append(stage);

  let debug = true;
  let includeSpaces = false;
  let split: ReturnType<typeof splitText> | undefined;
  let anim: ReturnType<typeof animate> | undefined;

  const resplit = (): void => {
    anim?.revert();
    split?.revert();
    split = splitText(p, {
      words: true,
      chars: { class: 'split-char' },
      includeSpaces,
      debug,
    });
    anim = animate(split.chars, {
      y: ['0rem', '-0.6rem', '0rem'],
      duration: 1000,
      delay: stagger(70),
      loop: true,
    });
    readout.textContent = `debug: ${debug} · includeSpaces: ${includeSpaces} · ${split.chars.length} chars`;
  };
  resplit();

  let timer = 0;
  if (preview) {
    let n = 0;
    timer = window.setInterval(() => {
      n += 1;
      if (n % 2) includeSpaces = !includeSpaces;
      else debug = !debug;
      resplit();
    }, 2000);
  } else {
    const row = controlRow(el);
    button(row, 'Toggle debug', () => {
      debug = !debug;
      resplit();
    });
    button(row, 'Toggle includeSpaces', () => {
      includeSpaces = !includeSpaces;
      resplit();
    });
    el.append(readout);
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
    split?.revert();
    el.replaceChildren();
  };
};

export default mount;
