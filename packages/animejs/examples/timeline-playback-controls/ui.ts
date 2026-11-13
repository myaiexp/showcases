// DOM for the playback-controls example: stage, readout and the control bar
import type { Timeline } from 'animejs';

export const buildStage = (el: HTMLElement): {
  dots: [HTMLElement, HTMLElement, HTMLElement];
  readout: { update(time: number, speed: number, backwards: boolean, paused: boolean): void };
} => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const dots: HTMLElement[] = [];
  for (let i = 0; i < 3; i++) {
    const track = document.createElement('div');
    track.className = 'track';
    const dot = document.createElement('div');
    dot.className = 'dot';
    track.append(dot);
    stage.append(track);
    dots.push(dot);
  }
  const text = document.createElement('pre');
  text.className = 'readout';
  stage.append(text);
  el.append(stage);
  return {
    dots: dots as [HTMLElement, HTMLElement, HTMLElement],
    readout: {
      update(time, speed, backwards, paused) {
        text.textContent =
          `currentTime ${String(Math.round(time)).padStart(5)}  speed ${speed.toFixed(1)}\n` +
          `backwards ${backwards}  paused ${paused}`;
      },
    },
  };
};

export const buildControls = (el: HTMLElement, tl: Timeline): (() => void) => {
  const bar = document.createElement('div');
  bar.className = 'bar';
  const undo: Array<() => void> = [];
  const button = (text: string, fn: () => void): void => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = text;
    b.addEventListener('click', fn);
    bar.append(b);
    undo.push(() => b.removeEventListener('click', fn));
  };
  button('Play', () => void tl.play());
  button('Pause', () => void tl.pause());
  button('Resume', () => void tl.resume());
  button('Reverse', () => void tl.reverse());
  button('Alternate', () => void tl.alternate());
  button('Restart', () => void tl.restart());

  const slider = (label: string, min: number, max: number, step: number, value: number, fn: (v: number) => void): void => {
    const wrap = document.createElement('label');
    wrap.className = 'slider';
    wrap.append(label);
    const input = document.createElement('input');
    input.type = 'range';
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    input.value = String(value);
    const on = (): void => fn(+input.value);
    input.addEventListener('input', on);
    undo.push(() => input.removeEventListener('input', on));
    wrap.append(input);
    bar.append(wrap);
  };
  slider('speed', 0, 4, 0.1, 1, (v) => (tl.speed = v));
  slider('seek', 0, 1500, 10, 0, (v) => void tl.seek(v));

  el.append(bar);
  return () => undo.forEach((fn) => fn());
};
