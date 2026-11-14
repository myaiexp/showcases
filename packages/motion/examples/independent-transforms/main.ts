// A van whose x, y, scale, rotate and skewX are animated by separate animate() calls
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const van = `
  <svg viewBox="0 0 100 60" class="van">
    <rect x="4" y="10" width="60" height="34" rx="5" fill="#ffb347"/>
    <path d="M64 20h20l12 14v10H64z" fill="#ff8c1a"/>
    <path d="M70 24h12l8 10H70z" fill="#bfe6ff"/>
    <circle cx="26" cy="46" r="8" fill="#222"/><circle cx="26" cy="46" r="3" fill="#aaa"/>
    <circle cx="78" cy="46" r="8" fill="#222"/><circle cx="78" cy="46" r="3" fill="#aaa"/>
  </svg>`;

// Each axis: the value it travels to, and the keyframes it plays when switched on.
const AXES = {
  x: { on: { x: 60 }, off: { x: 0 } },
  y: { on: { y: -22 }, off: { y: 0 } },
  scale: { on: { scale: 1.35 }, off: { scale: 1 } },
  rotate: { on: { rotate: -14 }, off: { rotate: 0 } },
  skewX: { on: { skewX: -18 }, off: { skewX: 0 } },
} as const;
type Axis = keyof typeof AXES;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="road"><div class="van-wrap">${van}</div></div>`;
  const state: Record<Axis, boolean> = { x: false, y: false, scale: false, rotate: false, skewX: false };

  const scope = scopeMotion(el, () => {
    // Only this axis is named, so only this axis moves. The rest are left alone.
    const set = (axis: Axis, on: boolean): void => {
      state[axis] = on;
      animate('.van-wrap', on ? AXES[axis].on : AXES[axis].off, { type: 'spring', bounce: 0.3, visualDuration: 0.5 });
    };

    if (preview) {
      const order = Object.keys(AXES) as Axis[];
      let step = 0;
      const tick = (): void => {
        const axis = order[step % order.length] as Axis;
        set(axis, !state[axis]);
        step++;
        delay(tick, 0.9);
      };
      delay(tick, 0.4);
      return;
    }
    const p = panel(el);
    for (const axis of Object.keys(AXES) as Axis[]) p.toggle(axis, false, (v) => set(axis, v));
    hint(el, 'Switch the axes on and off in any order. Each switch starts one spring on one value, so the others never jump.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
