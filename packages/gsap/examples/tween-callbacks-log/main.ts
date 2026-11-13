// onStart, onUpdate, onRepeat, onComplete and onReverseComplete written to a live log
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const track = document.createElement('div');
  track.className = 'track';
  const box = document.createElement('div');
  box.className = 'box';
  track.append(box);
  const ticks = document.createElement('div');
  ticks.className = 'ticks';
  const log = document.createElement('ul');
  log.className = 'log';
  el.append(track, ticks, log);

  const maxLines = preview ? 4 : 9;
  let updates = 0;
  let t0 = performance.now();
  const say = (name: string): void => {
    const li = document.createElement('li');
    li.className = name;
    li.textContent = `${((performance.now() - t0) / 1000).toFixed(2)}s  ${name}`;
    log.prepend(li);
    while (log.children.length > maxLines) log.lastElementChild?.remove();
  };

  let restartTimer = 0;
  let tween!: gsap.core.Tween;
  const ctx = gsap.context(() => {
    tween = gsap.to(box, {
      x: 170,
      duration: 1,
      ease: 'power2.inOut',
      repeat: 2,
      yoyo: true,
      onStart: () => say('onStart'),
      onUpdate: () => {
        updates++;
        ticks.textContent = `onUpdate x ${updates}`;
      },
      onRepeat: () => say('onRepeat'),
      onComplete: () => {
        say('onComplete');
        if (preview) restartTimer = window.setTimeout(restart, 1500);
      },
      onReverseComplete: () => say('onReverseComplete'),
    });
  }, el);

  function restart(): void {
    updates = 0;
    t0 = performance.now();
    log.replaceChildren();
    tween.restart();
  }

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const mk = (text: string, fn: () => void): void => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = text;
      b.addEventListener('click', fn);
      bar.append(b);
    };
    mk('restart()', restart);
    mk('reverse()', () => tween.reverse());
    mk('pause()', () => tween.pause());
    mk('resume()', () => tween.resume());
    el.insertBefore(bar, log);
  }

  return () => {
    window.clearTimeout(restartTimer);
    ctx.revert();
  };
};

export default mount;
