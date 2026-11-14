// A plane steered by x, y and heading motion values that transformValue composes into one transform string
import { animate, motionValue, scopeMotion, styleEffect, transformValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="sky${preview ? '' : ' big'}"><div class="plane"><svg viewBox="0 0 24 24"><path d="M2 12 22 3l-6 18-4-7z"/></svg></div></div>
    ${preview ? '' : '<p class="code"></p>'}`;
  const sky = el.querySelector<HTMLElement>('.sky')!;
  const code = el.querySelector<HTMLElement>('.code');
  const t = motionValue(0); // the only value that is animated: a lap from 0 to 2 pi
  const wobble = motionValue(0);
  const cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    const rx = (): number => sky.clientWidth * 0.32;
    const ry = (): number => sky.clientHeight * 0.3;
    // Three small values, derived from t...
    const x = transformValue(() => Math.sin(t.get()) * rx());
    const y = transformValue(() => Math.sin(t.get() * 2) * ry());
    const heading = transformValue(() => {
      // direction of travel: the angle of the derivative (cos t * rx, 2 cos 2t * ry)
      const dx = Math.cos(t.get()) * rx();
      const dy = 2 * Math.cos(t.get() * 2) * ry();
      return (Math.atan2(dy, dx) * 180) / Math.PI;
    });
    // ...one built from another, so wobble is added on top of the heading...
    const rotate = transformValue(() => heading.get() + Math.sin(t.get() * 24) * wobble.get());
    // ...and everything folded into a single string.
    const transform = transformValue(() => `translate(${x.get().toFixed(1)}px, ${y.get().toFixed(1)}px) rotate(${rotate.get().toFixed(1)}deg)`);
    cancels.push(styleEffect('.plane', { transform }));
    if (code) cancels.push(transform.on('change', (v) => { code.textContent = `transform: ${v}`; }));

    let lap = animate(t, [0, Math.PI * 2], { duration: 7, ease: 'linear', repeat: Infinity });
    if (!preview) {
      hint(el, 'Three values (x, y, heading) become one transform string. Raise the wobble to add a flutter on top of the heading, or change the speed.');
      p = panel(el);
      p.slider('wobble deg', { min: 0, max: 30, step: 1, value: 0 }, (v) => wobble.set(v));
      p.slider('lap seconds', { min: 2, max: 14, step: 1, value: 7 }, bind((v: number) => {
        const at = t.get();
        lap.stop();
        lap = animate(t, [at, at + Math.PI * 2], { duration: v, ease: 'linear', repeat: Infinity });
      }));
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
