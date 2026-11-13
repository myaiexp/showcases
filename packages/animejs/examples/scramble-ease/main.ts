// ScrambleText ease: the reveal wave under linear, inOut(3) and outExpo
import { animate, scrambleText } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const EASES = ['linear', 'inOut(3)', 'outExpo'];

const mount: Mount = (el, { preview }) => {
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Apply easing functions to control the acceleration and deceleration of the scramble reveal wave.';
  el.append(p);

  const readout = document.createElement('div');
  readout.className = 'label';
  let anim: ReturnType<typeof animate> | null = null;
  const play = (ease: string): void => {
    anim?.revert();
    // override: false keeps the original text visible until the wave reaches it
    anim = animate(p, { innerHTML: scrambleText({ ease, override: false }) });
    readout.textContent = `ease: '${ease}'`;
  };

  let timer = 0;
  const buttons: Array<[HTMLButtonElement, () => void]> = [];
  if (preview) {
    let i = 0;
    const cycle = (): void => play(EASES[i++ % EASES.length] ?? 'linear');
    cycle();
    timer = window.setInterval(cycle, 3500);
  } else {
    play('linear');
    const panel = document.createElement('div');
    panel.className = 'panel';
    EASES.forEach((e) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = e;
      const fn = (): void => play(e);
      b.addEventListener('click', fn);
      buttons.push([b, fn]);
      panel.append(b);
    });
    el.append(panel, readout);
  }

  return () => {
    window.clearInterval(timer);
    buttons.forEach(([b, fn]) => b.removeEventListener('click', fn));
    anim?.revert();
  };
};

export default mount;
