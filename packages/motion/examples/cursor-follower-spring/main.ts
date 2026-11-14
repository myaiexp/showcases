// A ring that follows the pointer: springValue(motionValue) turns raw pointer positions into a spring glide
import { delay, motionValue, scopeMotion, springValue, styleEffect } from 'motion';
import type { MotionValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<div class="pad${preview ? '' : ' big'}"><div class="raw"></div><div class="ring"></div><span>${preview ? 'scripted pointer' : 'move over the pad'}</span></div>`;
  const pad = el.querySelector<HTMLElement>('.pad')!;
  // The raw pointer position lives in plain motion values...
  const pointerX = motionValue(40);
  const pointerY = motionValue(40);
  let cancels: VoidFunction[] = [];
  let springs: Array<MotionValue<number>> = [];
  let p: ReturnType<typeof panel> | undefined;
  let stiffness = 200;
  let damping = 10;

  const scope = scopeMotion(el, () => {
    const build = (): void => {
      cancels.forEach((c) => c());
      springs.forEach((s) => s.destroy());
      // ...and the ring reads them through springs. Spring options are the second argument.
      const x = springValue(pointerX, { stiffness, damping });
      const y = springValue(pointerY, { stiffness, damping });
      springs = [x, y];
      cancels = [styleEffect('.ring', { x, y }), styleEffect('.raw', { x: pointerX, y: pointerY })];
    };
    build();

    if (preview) {
      // A card has no pointer, so a timer moves the "pointer" to a new spot every so often.
      const spots: Array<[number, number]> = [[200, 40], [190, 120], [50, 130], [120, 80], [40, 40]];
      let n = 0;
      const step = (): void => {
        const [px, py] = spots[n++ % spots.length]!;
        pointerX.set(px);
        pointerY.set(py);
        delay(step, 0.9);
      };
      delay(step, 0.5);
    } else {
      pad.addEventListener('pointermove', (e) => {
        const r = pad.getBoundingClientRect();
        pointerX.set(e.clientX - r.left);
        pointerY.set(e.clientY - r.top);
      }, { signal });
      hint(el, 'Move across the pad: the small dot is the raw pointer, the ring is the spring. Low damping makes it wobble; high stiffness makes it keen.');
      p = panel(el);
      p.slider('stiffness', { min: 20, max: 800, step: 10, value: stiffness }, (v) => { stiffness = v; build(); });
      p.slider('damping', { min: 2, max: 60, step: 1, value: damping }, (v) => { damping = v; build(); });
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); springs.forEach((s) => s.destroy()); p?.dispose(); };
};

export default mount;
