// autoplay: true starts on creation, autoplay: false waits for play()
import { animate } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const lane = (label: string): HTMLDivElement => {
    const row = document.createElement('div');
    row.className = 'lane';
    const dot = document.createElement('div');
    dot.className = 'dot';
    const text = document.createElement('span');
    text.className = 'tag';
    text.textContent = label;
    row.append(dot, text);
    stage.append(row);
    return dot;
  };
  const dotA = lane('autoplay: true');
  const dotB = lane('autoplay: false');
  el.append(stage);

  const common = { x: '10rem', duration: 1600, ease: 'inOutQuad' } as const;
  const a = animate(dotA, { ...common, autoplay: true });
  const b = animate(dotB, { ...common, autoplay: false });

  const timeouts = new Set<number>();
  const later = (fn: () => void, ms: number): void => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };

  let cycle = 0;
  let readTimer = 0;
  const cleanups: (() => void)[] = [];
  if (preview) {
    // Replay both so the reader sees one start by itself and one wait for play().
    const run = (): void => {
      a.restart();
      b.pause().seek(0);
      later(() => b.play(), 1000);
    };
    cycle = window.setInterval(run, 4200);
  } else {
    const readout = document.createElement('pre');
    readout.className = 'readout';
    const show = (): void => {
      readout.textContent = `A.paused: ${a.paused}  A.progress: ${a.progress.toFixed(2)}\nB.paused: ${b.paused}  B.progress: ${b.progress.toFixed(2)}`;
    };
    show();
    readTimer = window.setInterval(show, 80);
    const panel = document.createElement('div');
    panel.className = 'panel';
    const button = (text: string, fn: () => void): void => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = text;
      btn.addEventListener('click', fn);
      cleanups.push(() => btn.removeEventListener('click', fn));
      panel.append(btn);
    };
    button('Call play() on autoplay: false', () => b.play());
    button('Restart both', () => {
      a.restart();
      b.pause().seek(0);
    });
    el.append(readout, panel);
  }

  return () => {
    window.clearInterval(cycle);
    window.clearInterval(readTimer);
    timeouts.forEach((id) => window.clearTimeout(id));
    cleanups.forEach((fn) => fn());
    a.revert();
    b.revert();
  };
};

export default mount;
