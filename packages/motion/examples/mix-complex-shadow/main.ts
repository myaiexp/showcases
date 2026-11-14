// mix() on a whole box-shadow string and on an object: one 0-1 slider lifts a card, past either end too
import { animate, mix, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// Complex strings mix every number and colour inside them, so both ends need the same shape.
const shadow = mix('0px 2px 8px 0px rgba(0, 0, 0, 0.25)', '0px 24px 40px -4px rgba(0, 0, 0, 0.7)');
// Objects mix key by key.
const pose = mix({ y: 0, rotate: 0, scale: 1 }, { y: -14, rotate: -3, scale: 1.05 });

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="desk${preview ? '' : ' full'}">
      <div class="card"><div class="art"></div><b>Weekend trip</b><span>3 photos</span></div>
    </div>
    <code class="css"></code>`;
  const card = el.querySelector<HTMLElement>('.card')!;
  const css = el.querySelector<HTMLElement>('.css')!;
  let p: ReturnType<typeof panel> | undefined;

  const lift = (t: number): void => {
    const s = shadow(t);
    const o = pose(t);
    card.style.boxShadow = s;
    card.style.transform = `translateY(${o.y}px) rotate(${o.rotate}deg) scale(${o.scale})`;
    css.textContent = `box-shadow: ${s}`;
  };

  const scope = scopeMotion(el, () => {
    lift(0);
    if (preview) {
      animate(0, 1, { duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', repeatDelay: 0.5, onUpdate: lift });
    } else {
      hint(el, 'Slide to lift the card. The shadow string and the pose object are each mixed by the same number, and going past 0 or 1 simply carries on in the same direction.');
      p = panel(el);
      p.slider('elevation', { min: -0.2, max: 1.5, step: 0.01, value: 0 }, lift);
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
