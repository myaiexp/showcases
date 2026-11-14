// "Slide to unlock": drag moves your own motion value, and mapValue drives the label and fill from it
import { animate, drag, mapValue, motionValue, scopeMotion, styleEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="lock${preview ? '' : ' big'}">
      <div class="fill"></div>
      <span class="label">slide to unlock</span>
      <div class="handle">&rsaquo;</div>
    </div>
    <p class="state">Locked</p>`;
  const lock = el.querySelector<HTMLElement>('.lock')!;
  const handle = el.querySelector<HTMLElement>('.handle')!;
  const label = el.querySelector<HTMLElement>('.label')!;
  const fill = el.querySelector<HTMLElement>('.fill')!;
  const state = el.querySelector<HTMLElement>('.state')!;
  if (!preview) hint(el, 'Slide the handle all the way across. Stop short and it springs back; the label fades and the fill grows as you go.');

  const x = motionValue(0);
  const range = (): number => lock.clientWidth - handle.offsetWidth - 8;
  const cancels: VoidFunction[] = [];
  let unlocked = false;

  const scope = scopeMotion(el, ({ bind }) => {
    // Bind the motion value to the handle's x first, then drag() moves that value.
    cancels.push(styleEffect(handle, { x }));
    cancels.push(styleEffect(label, { opacity: mapValue(x, [0, range() * 0.6], [1, 0]) }));
    cancels.push(styleEffect(fill, { width: mapValue(x, [0, range()], [48, lock.clientWidth - 8]) }));
    drag(handle, {
      axis: 'x',
      constraints: { left: 0, right: range() },
      elastic: 0,
      momentum: false,
      onEnd: bind(() => {
        if (x.get() > range() * 0.85) {
          unlocked = true;
          state.textContent = 'Unlocked';
          animate(x, range(), { type: 'spring', bounce: 0, visualDuration: 0.2 });
        } else {
          animate(x, 0, { type: 'spring', bounce: 0.3, visualDuration: 0.35 });
        }
      }),
    });
  });
  const relock = (): void => {
    unlocked = false;
    state.textContent = 'Locked';
    scope.run(() => animate(x, 0, { type: 'spring', bounce: 0.2, visualDuration: 0.5 }));
  };

  if (preview) {
    let tries = 0;
    loopGesture(el, signal, async (g) => {
      const from = at(el, handle);
      const full = tries++ % 2 === 1;
      await g.drag(handle, from, { x: from.x + (full ? range() : range() * 0.45), y: from.y }, 0.8);
      await g.wait(1.0);
      if (unlocked) relock();
    }, 0.4);
  } else {
    const timer = window.setInterval(() => unlocked && relock(), 2500);
    return () => {
      window.clearInterval(timer);
      for (const c of cancels) c();
      scope.cancel();
    };
  }

  return () => {
    for (const c of cancels) c();
    scope.cancel();
  };
};

export default mount;
