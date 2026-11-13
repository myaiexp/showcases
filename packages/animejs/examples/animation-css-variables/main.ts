// CSS variables as tween values: waapi reads them live, animate() needs refresh() after a change
import { animate, waapi, stagger } from 'animejs';
import type { JSAnimation, WAAPIAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.style.setProperty('--scale', '1.5');
  stage.style.setProperty('--rotation', '90deg');
  const makeRow = (cls: string): HTMLDivElement[] => {
    const row = document.createElement('div');
    row.className = `row ${cls}`;
    const squares = Array.from({ length: 5 }, () => {
      const sq = document.createElement('div');
      sq.className = 'square';
      row.append(sq);
      return sq;
    });
    stage.append(row);
    return squares;
  };
  const jsSquares = makeRow('js');
  const waapiSquares = makeRow('wa');
  el.append(stage);

  const timing = { duration: 500, delay: stagger(100), loop: true };
  const js: JSAnimation = animate(jsSquares, {
    scale: 'var(--scale)',
    background: ['var(--hex-red-1)', 'var(--hex-orange-1)'],
    ...timing,
    alternate: true,
  });
  const wa: WAAPIAnimation = waapi.animate(waapiSquares, {
    rotate: 'var(--rotation)',
    borderColor: ['var(--hex-orange-1)', 'var(--hex-red-1)'],
    ...timing,
  });
  if (preview) {
    return () => {
      js.revert();
      wa.revert();
    };
  }

  const readout = document.createElement('pre');
  readout.className = 'readout';
  const show = (note: string): void => {
    readout.textContent = `--scale: ${stage.style.getPropertyValue('--scale')}   (${note})`;
  };
  show('animate() was built with 1.5');

  const panel = document.createElement('div');
  panel.className = 'panel';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '1';
  slider.max = '2.5';
  slider.step = '0.1';
  slider.value = '1.5';
  const onInput = (): void => {
    stage.style.setProperty('--scale', slider.value);
    show('changed, animate() has not seen it yet');
  };
  slider.addEventListener('input', onInput);
  const cleanups: (() => void)[] = [() => slider.removeEventListener('input', onInput)];
  const button = (text: string, fn: () => void): void => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = text;
    btn.addEventListener('click', fn);
    cleanups.push(() => btn.removeEventListener('click', fn));
    panel.append(btn);
  };
  button('restart()', () => {
    js.restart();
    show('restart() alone keeps the old computed value');
  });
  button('restart().refresh()', () => {
    js.restart().refresh();
    show('refresh() recomputed the variable');
  });
  panel.prepend(slider);
  el.append(readout, panel);

  return () => {
    cleanups.forEach((fn) => fn());
    js.revert();
    wa.revert();
  };
};

export default mount;
