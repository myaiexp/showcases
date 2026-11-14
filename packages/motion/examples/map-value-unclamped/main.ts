// mapValue with and without { clamp: false }: the same pull distance, two stretch limits
import { animate, mapValue, motionValue, scopeMotion, styleEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="rig${preview ? '' : ' big'}">
      <div class="cols"><div class="limit"></div><div class="bar a"></div><div class="bar b"></div></div>
      <div class="labels"><span class="la"></span><span class="lb"></span></div>
    </div>`;
  const pull = motionValue(0);
  const cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    // The same mapping twice: 0 to 100px of pull stretches the bar from 1x to 1.5x.
    const clamped = mapValue(pull, [0, 100], [1, 1.5]);
    const unclamped = mapValue(pull, [0, 100], [1, 1.5], { clamp: false });
    cancels.push(styleEffect('.a', { scaleY: clamped }));
    cancels.push(styleEffect('.b', { scaleY: unclamped }));
    const labels = [clamped, unclamped].map((v, i) => v.on('change', (n) => {
      el.querySelector(i ? '.lb' : '.la')!.textContent = `${i ? 'unclamped' : 'default'} ${n.toFixed(2)}x`;
    }));
    cancels.push(...labels);
    el.querySelector('.la')!.textContent = 'default 1.00x';
    el.querySelector('.lb')!.textContent = 'unclamped 1.00x';

    if (preview) {
      animate(pull, [0, 260, 0], { duration: 5, repeat: Infinity, ease: 'easeInOut' });
    } else {
      hint(el, 'Pull past 100px. The default bar stops at its 1.5x end of range; the unclamped one carries on stretching in a straight line.');
      p = panel(el);
      p.slider('pull px', { min: 0, max: 300, step: 5, value: 0 }, (v) => pull.set(v));
      p.button('Release', bind(() => { animate(pull, 0, { type: 'spring', bounce: 0.4, visualDuration: 0.6 }); }));
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
