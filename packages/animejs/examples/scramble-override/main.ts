// ScrambleText override: the starting appearance of the text for each documented value
import { animate, scrambleText } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const OVERRIDES: Array<boolean | string> = [true, false, '', ' ', 'uppercase', '_'];

const mount: Mount = (el, { preview }) => {
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Controls the starting appearance of the text before the scramble animation begins.';
  el.append(p);

  const readout = document.createElement('div');
  readout.className = 'label';
  let anim: ReturnType<typeof animate> | null = null;
  const play = (override: boolean | string): void => {
    anim?.revert();
    anim = animate(p, { innerHTML: scrambleText({ override }) });
    // textContent right after creation is the first rendered frame
    readout.textContent = `override: ${JSON.stringify(override)} | first frame: "${(p.textContent ?? '').slice(0, 24)}"`;
  };

  let timer = 0;
  const buttons: Array<[HTMLButtonElement, () => void]> = [];
  if (preview) {
    let i = 0;
    const cycle = (): void => play(OVERRIDES[i++ % OVERRIDES.length] ?? true);
    cycle();
    timer = window.setInterval(cycle, 3200);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    OVERRIDES.forEach((o) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = JSON.stringify(o);
      const fn = (): void => play(o);
      b.addEventListener('click', fn);
      buttons.push([b, fn]);
      panel.append(b);
    });
    el.append(panel, readout);
    readout.textContent = 'Press a value.';
  }

  return () => {
    window.clearInterval(timer);
    buttons.forEach(([b, fn]) => b.removeEventListener('click', fn));
    anim?.revert();
  };
};

export default mount;
