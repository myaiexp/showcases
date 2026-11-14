// A parcel dropped onto a shelf, landing with a bounce from an easing function written in plain JavaScript
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

/**
 * An easing is any function from progress (0 to 1) to eased progress (0 to 1).
 * This one reaches 1 (the ground) `bounces` + 1 times, and each rebound is lower than the last.
 */
const bounceOut = (bounces: number) => (p: number): number => 1 - Math.abs(Math.cos(p * (bounces + 0.5) * Math.PI)) * (1 - p) ** 1.5;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="scene">
      <div class="shadow"></div>
      <div class="parcel"><i></i></div>
      <div class="shelf"></div>
    </div>`;
  el.querySelector('.scene')!.classList.toggle('full', !preview);
  const drop = preview ? 120 : 190;

  let bounces = 4;
  let seconds = 1.6;
  const fall = (): void => {
    const ease = bounceOut(bounces); // pass the function itself, no wrapping
    animate('.parcel', { y: [-drop, 0] }, { duration: seconds, ease });
    animate('.shadow', { scale: [0.3, 1], opacity: [0.05, 0.45] }, { duration: seconds, ease });
  };

  const scope = scopeMotion(el, () => {
    if (preview) {
      const loop = (): void => {
        fall();
        delay(loop, seconds + 1.2);
      };
      delay(loop, 0.3);
    } else fall();
  });

  const controls = !preview ? panel(el) : undefined;
  controls?.button('Drop again', () => scope.run(fall));
  controls?.slider('bounces', { min: 1, max: 7, step: 1, value: bounces }, (v) => {
    bounces = v;
    scope.run(fall);
  });
  controls?.slider('seconds', { min: 0.8, max: 3, step: 0.2, value: seconds }, (v) => {
    seconds = v;
  });
  if (!preview) hint(el, 'No built-in easing bounces, but ease also accepts your own function: it receives progress from 0 to 1 and returns where the parcel should be. Change the bounce count and it re-drops.');

  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
