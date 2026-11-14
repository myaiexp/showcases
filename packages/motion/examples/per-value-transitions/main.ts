// One animate() call whose x, opacity and rotate each get their own transition
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="inbox">
      <div class="chip"><span class="dot"></span><span>New message from Sam</span></div>
    </div>`;

  const t = { xDuration: 1.2, opacityDuration: 0.2 };
  let shown = false;

  const scope = scopeMotion(el, () => {
    const toggle = (): void => {
      shown = !shown;
      animate('.chip', { x: shown ? [-140, 0] : [0, 140], opacity: shown ? [0, 1] : [1, 0], rotate: shown ? [-6, 0] : [0, 6] }, {
        duration: t.xDuration, // the default for every value...
        ease: 'easeOut',
        // ...and the overrides, named by value:
        opacity: { duration: t.opacityDuration },
        rotate: { type: 'spring', bounce: 0.6, visualDuration: 0.5 },
      });
    };
    toggle();

    if (preview) {
      const tick = (): void => {
        toggle();
        delay(tick, 2);
      };
      delay(tick, 2);
      return;
    }
    const p = panel(el);
    p.slider('x duration', { min: 0.2, max: 3, step: 0.1, value: t.xDuration }, (v) => { t.xDuration = v; });
    p.slider('opacity duration', { min: 0.05, max: 3, step: 0.05, value: t.opacityDuration }, (v) => { t.opacityDuration = v; });
    p.button('Slide in / out', toggle);
    hint(el, 'The chip slides on one clock, fades on another and tilts with a spring on a third. Lengthen the opacity duration and the fade catches up with the slide.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
