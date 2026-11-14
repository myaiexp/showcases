// A switch whose knob moves with a physics spring (stiffness, damping, mass)
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

interface Physics {
  stiffness: number;
  damping: number;
  mass: number;
}

const mount: Mount = (el, { preview }) => {
  const rows = preview
    ? [{ name: 'Crisp', phys: { stiffness: 700, damping: 35, mass: 1 } }, { name: 'Loose', phys: { stiffness: 250, damping: 7, mass: 1 } }]
    : [{ name: 'Wi-Fi', phys: { stiffness: 400, damping: 15, mass: 1 } }];
  el.innerHTML = `<div class="list">${rows.map((r, i) => `
    <div class="row" data-i="${i}"><span>${r.name}</span>
      <button class="switch" aria-pressed="false" aria-label="${r.name}"><i class="knob"></i></button>
    </div>`).join('')}</div>`;

  const on = rows.map(() => false);

  const scope = scopeMotion(el, () => {
    const flip = (i: number): void => {
      on[i] = !on[i];
      const row = el.querySelector(`[data-i="${i}"]`) as HTMLElement;
      row.querySelector('.switch')?.setAttribute('aria-pressed', String(on[i]));
      const p: Physics = (rows[i] as { phys: Physics }).phys;
      // Physics-based spring: the three numbers describe the spring, not a duration.
      animate(row.querySelector('.knob') as HTMLElement, { x: on[i] ? 24 : 0 }, { type: 'spring', stiffness: p.stiffness, damping: p.damping, mass: p.mass });
      animate(row.querySelector('.switch') as HTMLElement, { backgroundColor: on[i] ? '#3ddc97' : '#4a4f5c' }, { duration: 0.2 });
    };

    if (preview) {
      const tick = (): void => {
        rows.forEach((_, i) => flip(i));
        delay(tick, 1.4);
      };
      delay(tick, 0.6);
      return;
    }
    el.querySelector('.switch')?.addEventListener('click', () => scope.run(() => flip(0)));
    const phys = (rows[0] as { phys: Physics }).phys;
    const p = panel(el);
    p.slider('stiffness', { min: 20, max: 1000, step: 10, value: phys.stiffness }, (v) => { phys.stiffness = v; });
    p.slider('damping', { min: 0, max: 60, step: 1, value: phys.damping }, (v) => { phys.damping = v; });
    p.slider('mass', { min: 0.2, max: 5, step: 0.1, value: phys.mass }, (v) => { phys.mass = v; });
    hint(el, 'Click the switch. Low damping makes it wobble, high stiffness makes it snap, high mass makes it lazy. With damping at 0 it would swing forever.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
