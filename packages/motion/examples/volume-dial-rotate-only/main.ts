// A volume knob you turn with two fingers: pinch with scale and pan off, and rotation limited to a sweep
import { animate, pinch, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const MAX = 135;

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="amp${preview ? '' : ' big'}">
      <div class="ticks"></div>
      <div class="dial"><i></i></div>
      <output class="vol">50</output>
    </div>`;
  const dial = el.querySelector<HTMLElement>('.dial')!;
  const ticks = el.querySelector<HTMLElement>('.ticks')!;
  const vol = el.querySelector<HTMLElement>('.vol')!;
  for (let i = 0; i <= 10; i++) {
    const t = document.createElement('i');
    t.style.rotate = `${-MAX + (i * 2 * MAX) / 10}deg`;
    ticks.append(t);
  }
  if (!preview) hint(el, 'Place two fingers on the knob and twist (or rotate on a trackpad). It turns in place, never zooms or moves, and stops at both ends with a little give.');

  const scope = scopeMotion(el, () => {
    // scale: false and pan: false leave rotation only, around the knob's own centre.
    pinch(dial, { scale: false, pan: false, rotate: { min: -MAX, max: MAX }, elastic: 0.15, transition: { bounce: 0.35, visualDuration: 0.35 } });
    animate(dial, { rotate: 0 }, { duration: 0 });
  });

  // Read the knob's current angle from its transform each frame, for the number under it.
  let raf = 0;
  const read = (): void => {
    const m = new DOMMatrix(getComputedStyle(dial).transform);
    const deg = (Math.atan2(m.b, m.a) * 180) / Math.PI;
    vol.textContent = String(Math.round(((Math.max(-MAX, Math.min(MAX, deg)) + MAX) / (2 * MAX)) * 100));
    raf = requestAnimationFrame(read);
  };
  raf = requestAnimationFrame(read);

  if (preview) {
    let up = true;
    loopGesture(el, signal, async (g) => {
      const r = dial.getBoundingClientRect();
      const f = el.getBoundingClientRect();
      const c = { x: r.left - f.left + r.width / 2, y: r.top - f.top + r.height / 2 };
      await g.pinch(dial, c, { fromGap: 50, toGap: 50, fromAngle: 0, toAngle: up ? 110 : -170 }, 0.9);
      up = !up;
      await g.wait(0.9);
    }, 0.2);
  }

  return () => {
    cancelAnimationFrame(raf);
    scope.cancel();
  };
};

export default mount;
