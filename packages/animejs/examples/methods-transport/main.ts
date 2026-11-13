// A transport panel that calls the animation methods on a looping, staggered pair of squares
import { animate, stagger, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const stage = document.createElement('div');
  stage.className = 'stage';
  const squares: HTMLElement[] = [];
  for (let i = 0; i < 2; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    const sq = document.createElement('div');
    sq.className = 'square';
    row.append(sq);
    stage.append(row);
    squares.push(sq);
  }
  const status = document.createElement('pre');
  status.className = 'status';
  el.append(stage, status);

  let last = 'animate()';
  let seek: HTMLInputElement | undefined;
  const animation: JSAnimation = animate(squares, {
    x: preview ? '9rem' : '14rem',
    ease: 'inOutSine',
    duration: 1500,
    loop: true,
    delay: stagger(150),
    onUpdate: (self) => {
      status.textContent = preview
        ? `${last}\npaused ${self.paused}  reversed ${self.reversed}`
        : `${last}\ncurrentTime ${Math.round(self.currentTime)} ms   paused ${self.paused}   reversed ${self.reversed}`;
      if (seek) seek.value = String(Math.round(self.iterationCurrentTime));
    },
  });

  const call = (name: string, fn: () => unknown): void => {
    last = name;
    fn();
    status.textContent = `${name}\npaused ${animation.paused}   reversed ${animation.reversed}`;
  };

  if (preview) {
    const script: [string, () => unknown][] = [
      ['reverse()', () => animation.reverse()],
      ['pause()', () => animation.pause()],
      ['resume()', () => animation.resume()],
      ['alternate()', () => animation.alternate()],
      ['restart()', () => animation.restart()],
    ];
    let i = 0;
    const timer = window.setInterval(() => {
      const step = script[i++ % script.length];
      if (step) call(step[0], step[1]);
    }, 1400);
    return () => {
      window.clearInterval(timer);
      animation.revert();
    };
  }

  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  const cleanups: (() => void)[] = [];
  const add = (name: string, fn: () => unknown): void => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = name;
    const handler = (): void => call(name, fn);
    b.addEventListener('click', handler);
    cleanups.push(() => b.removeEventListener('click', handler));
    buttons.append(b);
  };
  add('play()', () => animation.play());
  add('pause()', () => animation.pause());
  add('resume()', () => animation.resume());
  add('reverse()', () => animation.reverse());
  add('alternate()', () => animation.alternate());
  add('restart()', () => animation.restart());
  add('complete()', () => animation.complete());
  add('cancel()', () => animation.cancel());
  add('reset()', () => animation.reset());
  add('reset(true)', () => animation.reset(true));
  add('revert()', () => animation.revert());

  seek = document.createElement('input');
  seek.type = 'range';
  seek.min = '0';
  seek.max = String(animation.iterationDuration);
  seek.value = '0';
  seek.className = 'seek';
  const onSeek = (): void => {
    last = `seek(${seek!.value})`;
    animation.seek(+seek!.value);
  };
  seek.addEventListener('input', onSeek);
  cleanups.push(() => seek?.removeEventListener('input', onSeek));

  el.append(buttons, seek);

  return () => {
    cleanups.forEach((fn) => fn());
    animation.revert();
  };
};

export default mount;
