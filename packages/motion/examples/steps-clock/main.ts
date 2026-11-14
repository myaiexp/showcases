// A clock hand that ticks instead of gliding, using steps(n) as the easing, with the jump at the end or the start
import { animate, scopeMotion, steps } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="clock">
      <svg viewBox="0 0 120 120">
        <circle class="face" cx="60" cy="60" r="56"/>
        <g class="marks" transform="translate(60 60)"></g>
        <line class="hand" x1="60" y1="60" x2="60" y2="14"/>
        <circle class="pin" cx="60" cy="60" r="3"/>
      </svg>
      <code class="code"></code>
    </div>`;
  el.querySelector('.clock')!.classList.toggle('full', !preview);
  const marks = el.querySelector('.marks')!;
  for (let i = 0; i < 60; i++) {
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tick.setAttribute('y1', i % 5 === 0 ? '-50' : '-52');
    tick.setAttribute('y2', '-55');
    tick.setAttribute('transform', `rotate(${i * 6})`);
    tick.setAttribute('class', i % 5 === 0 ? 'major' : 'minor');
    marks.append(tick);
  }
  const code = el.querySelector<HTMLElement>('.code')!;

  let ticks = 12;
  let jump: 'end' | 'start' = 'end';
  let turn = 12;
  const scope = scopeMotion(el, () => {
    start();
  });
  function start(): void {
    // steps(n) returns an easing function: the hand sits still, then jumps 1/n of the way, n times.
    const ease = jump === 'start' ? steps(ticks, 'start') : steps(ticks);
    code.textContent = `ease: steps(${ticks}${jump === 'start' ? ", 'start'" : ''})`;
    animate('.hand', { rotate: [0, 360] }, { duration: turn, ease, repeat: Infinity });
  }
  const restart = (): void => {
    scope.run(() => {
      animate('.hand', { rotate: 0 }, { duration: 0 });
      start();
    });
  };

  let controls: ReturnType<typeof panel> | undefined;
  if (!preview) {
    controls = panel(el);
    controls.slider('steps per turn', { min: 4, max: 60, step: 1, value: ticks }, (v) => {
      ticks = v;
      restart();
    });
    controls.select('jump at', ['end', 'start'] as const, jump, (v) => {
      jump = v;
      restart();
    });
    controls.slider('seconds per turn', { min: 4, max: 30, step: 1, value: turn }, (v) => {
      turn = v;
      restart();
    });
    hint(el, "The hand turns once per cycle, but steps() makes it hold still and jump. Jump at 'end' (the default) waits a whole step before the first tick; at 'start' the first tick happens at once, so the hand is always one step ahead.");
  }

  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
