// WAAPI persist: a finished animation stays controllable only when persist is true
import { waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const lane = (label: string): HTMLDivElement => {
    const row = document.createElement('div');
    row.className = 'lane';
    const sq = document.createElement('div');
    sq.className = 'square';
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = label;
    row.append(sq, tag);
    stage.append(row);
    return sq;
  };
  const sqA = lane('persist: false (default)');
  const sqB = lane('persist: true');
  el.append(stage);

  const a = waapi.animate(sqA, { x: '10rem', duration: 800, persist: false });
  const b = waapi.animate(sqB, { x: '10rem', duration: 800, persist: true });
  // alternate().resume() asks a finished animation to run back the other way.
  const alternate = (): void => {
    a.alternate().resume();
    b.alternate().resume();
  };

  let timer = 0;
  let readTimer = 0;
  const cleanups: (() => void)[] = [];
  if (preview) {
    timer = window.setInterval(alternate, 2200);
  } else {
    const readout = document.createElement('pre');
    readout.className = 'readout';
    const show = (): void => {
      const state = (w: typeof a): string => w.animations[0]?.playState ?? 'released';
      readout.textContent = `A native playState: ${state(a)}\nB native playState: ${state(b)}`;
    };
    show();
    readTimer = window.setInterval(show, 100);
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Alternate';
    btn.addEventListener('click', alternate);
    cleanups.push(() => btn.removeEventListener('click', alternate));
    el.append(readout, btn);
  }

  return () => {
    window.clearInterval(timer);
    window.clearInterval(readTimer);
    cleanups.forEach((fn) => fn());
    a.revert();
    b.revert();
  };
};

export default mount;
