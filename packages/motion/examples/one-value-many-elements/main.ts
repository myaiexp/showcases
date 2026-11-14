// One motion value drives opacity and scale on four lamps and scaleX on a bar, through two styleEffect calls
import { animate, motionValue, scopeMotion, styleEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="panel${preview ? '' : ' big'}">
      <div class="name"><span>Living room</span><span>brightness</span></div>
      <div class="lamps"><div class="lamp"></div><div class="lamp"></div><div class="lamp"></div><div class="lamp"></div></div>
      <div class="track"><div class="fill"></div></div>
    </div>`;
  const brightness = motionValue(0.4);
  const cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    // One value, one selector matching four elements, two styles on each.
    cancels.push(styleEffect(el.querySelectorAll('.lamp'), { opacity: brightness, scale: brightness }));
    cancels.push(styleEffect('.fill', { scaleX: brightness }));

    if (preview) {
      animate(brightness, [0.3, 1, 0.3], { duration: 4, repeat: Infinity, ease: 'easeInOut' });
    } else {
      hint(el, 'Move the slider: the single motion value updates every lamp and the bar on the next frame. Animate it for a smooth fade.');
      p = panel(el);
      p.slider('level', { min: 0, max: 100, step: 1, value: 40 }, (v) => brightness.set(v / 100));
      p.button('Fade up', bind(() => { animate(brightness, 1, { duration: 1.2 }); }));
      p.button('Fade down', bind(() => { animate(brightness, 0.05, { duration: 1.2 }); }));
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
