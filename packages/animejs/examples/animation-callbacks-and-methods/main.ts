// One animation with percentage keyframes, counted callbacks, method buttons and live properties
import { animate } from 'animejs';
import type { JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const CALLBACKS = ['onBegin', 'onBeforeUpdate', 'onUpdate', 'onRender', 'onLoop', 'onPause', 'onComplete'] as const;

const mount: Mount = (el, { preview }) => {
  const track = document.createElement('div');
  track.className = 'track';
  // The squares are the targets: an array of elements is a valid first argument.
  const squares = [0, 1, 2].map(() => {
    const sq = document.createElement('div');
    sq.className = 'sq';
    track.append(sq);
    return sq;
  });
  el.append(track);

  const counts: Record<string, number> = Object.fromEntries(CALLBACKS.map((n) => [n, 0]));
  const bump = (name: string) => (): void => {
    counts[name] = (counts[name] ?? 0) + 1;
  };
  const anim: JSAnimation = animate(squares, {
    keyframes: {
      '0%': { x: 0, rotate: 0 },
      '50%': { x: 150, rotate: 180 },
      '100%': { x: 0, rotate: 360 },
    },
    duration: 2400,
    ease: 'inOutSine',
    loop: 2,
    onBegin: bump('onBegin'),
    onBeforeUpdate: bump('onBeforeUpdate'),
    onUpdate: bump('onUpdate'),
    onRender: bump('onRender'),
    onLoop: bump('onLoop'),
    onPause: bump('onPause'),
    onComplete: bump('onComplete'),
  });

  const readout = document.createElement('pre');
  readout.className = 'readout';
  const show = (): void => {
    const calls = CALLBACKS.map((n) => `${n}: ${counts[n]}`).join('\n');
    const props = [
      `currentTime: ${Math.round(anim.currentTime)} / ${anim.duration}`,
      `progress: ${anim.progress.toFixed(2)}`,
      `currentIteration: ${anim.currentIteration}`,
      `speed: ${anim.speed}`,
      `paused: ${anim.paused}  reversed: ${anim.reversed}`,
      `backwards: ${anim.backwards}  completed: ${anim.completed}`,
    ].join('\n');
    readout.textContent = preview ? `onLoop: ${counts.onLoop}` : `${props}\n\n${calls}`;
  };
  show();
  const timer = window.setInterval(show, preview ? 400 : 60);
  // In the card the loop count is finite, so restart it to stay alive.
  const keepAlive = preview ? window.setInterval(() => anim.completed && anim.restart(), 500) : 0;
  el.append(readout);

  const cleanups: (() => void)[] = [];
  if (!preview) {
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
    button('play()', () => void anim.play());
    button('pause()', () => void anim.pause());
    button('resume()', () => void anim.resume());
    button('reverse()', () => void anim.reverse());
    button('alternate()', () => void anim.alternate());
    button('restart()', () => void anim.restart());
    button('complete()', () => void anim.complete());
    button('reset()', () => void anim.reset());

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = '0';
    const onSeek = (): void => void anim.pause().seek(anim.duration * Number(slider.value));
    slider.addEventListener('input', onSeek);
    cleanups.push(() => slider.removeEventListener('input', onSeek));
    const speed = document.createElement('input');
    speed.type = 'range';
    speed.min = '0.25';
    speed.max = '3';
    speed.step = '0.25';
    speed.value = '1';
    const onSpeed = (): void => {
      anim.speed = Number(speed.value);
    };
    speed.addEventListener('input', onSpeed);
    cleanups.push(() => speed.removeEventListener('input', onSpeed));
    const labelled = (text: string, input: HTMLInputElement): HTMLLabelElement => {
      const l = document.createElement('label');
      l.className = 'label';
      l.append(`${text} `, input);
      return l;
    };
    panel.append(labelled('seek()', slider), labelled('speed', speed));
    el.append(panel);
  }

  return () => {
    window.clearInterval(timer);
    window.clearInterval(keepAlive);
    cleanups.forEach((fn) => fn());
    anim.revert();
  };
};

export default mount;
