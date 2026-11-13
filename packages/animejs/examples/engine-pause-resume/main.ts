// engine.pause() and engine.resume() freezing and releasing every animation, plus adding new ones while paused
import { engine, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { addParticle, buildField } from './particles.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const field = buildField();
  el.append(field);
  const anims: JSAnimation[] = [];
  const add = (): void => void anims.push(addParticle(field, preview ? 0.6 : 1).anim);
  for (let i = 0; i < (preview ? 20 : 60); i++) add();

  if (preview) {
    // Previews share the page's engine, so just keep adding particles instead of pausing it.
    const timer = window.setInterval(() => {
      if (anims.length < 45) add();
    }, 400);
    return () => {
      window.clearInterval(timer);
      anims.forEach((a) => a.revert());
    };
  }

  const readout = document.createElement('pre');
  readout.className = 'readout';
  const showState = (): void => {
    readout.textContent = `engine.paused: ${engine.paused}   animations: ${anims.length}`;
  };
  showState();

  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  const cleanups: (() => void)[] = [];
  const button = (text: string, fn: () => void): HTMLButtonElement => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = text;
    b.addEventListener('click', fn);
    cleanups.push(() => b.removeEventListener('click', fn));
    buttons.append(b);
    return b;
  };

  button('Add animation', () => {
    add();
    showState();
  });
  button('engine.pause()', () => {
    engine.pause();
    showState();
  });
  button('engine.resume()', () => {
    engine.resume();
    showState();
  });
  let countdown = 0;
  let interval = 0;
  const timed = button('Pause for 3 seconds', () => {
    if (interval) return;
    countdown = 3;
    engine.pause();
    timed.disabled = true;
    const tick = (): void => {
      if (countdown <= 0) {
        window.clearInterval(interval);
        interval = 0;
        engine.resume();
        timed.disabled = false;
        timed.textContent = 'Pause for 3 seconds';
      } else {
        timed.textContent = `Resume in ${countdown--} seconds`;
      }
      showState();
    };
    tick();
    interval = window.setInterval(tick, 1000);
  });
  el.append(buttons, readout);

  return () => {
    window.clearInterval(interval);
    cleanups.forEach((fn) => fn());
    engine.resume();
    anims.forEach((a) => a.revert());
  };
};

export default mount;
