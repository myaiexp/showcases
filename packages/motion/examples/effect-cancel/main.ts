// A lamp bound to a dial value by styleEffect; calling the returned cleanup unplugs it, calling styleEffect again replugs it
import { animate, delay, motionValue, scopeMotion, styleEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="rig${preview ? '' : ' big'}">
      <div class="dial"></div><div class="cable"></div><div class="lamp"></div>
      <p class="status"></p>
    </div>`;
  const dial = el.querySelector<HTMLElement>('.dial')!;
  const cable = el.querySelector<HTMLElement>('.cable')!;
  const status = el.querySelector<HTMLElement>('.status')!;
  const level = motionValue(0.3);
  let cancel: VoidFunction | undefined;
  let p: ReturnType<typeof panel> | undefined;
  let off: VoidFunction = () => {};

  const scope = scopeMotion(el, ({ bind }) => {
    off = level.on('change', (v) => { dial.textContent = `${Math.round(v * 100)}%`; });
    dial.textContent = '30%';
    const show = (): void => {
      cable.classList.toggle('off', !cancel);
      status.textContent = cancel ? 'Lamp follows the dial' : 'Unplugged: the lamp ignores the dial';
    };
    const plug = (): void => {
      if (cancel) return;
      cancel = styleEffect('.lamp', { opacity: level, scale: level }); // the cleanup is the way to detach
      show();
    };
    const unplug = (): void => {
      cancel?.();
      cancel = undefined;
      show();
    };
    const toggle = (): void => (cancel ? unplug() : plug());
    plug();

    if (preview) {
      animate(level, [0.2, 1, 0.2], { duration: 6, repeat: Infinity, ease: 'easeInOut' });
      const loop = (): void => { toggle(); delay(loop, 2); };
      delay(loop, 2);
    } else {
      hint(el, 'Drag the slider or fade the dial, unplug the lamp and keep moving it, then plug it back in: the lamp jumps to wherever the dial is now.');
      p = panel(el);
      p.slider('dial', { min: 0, max: 100, step: 1, value: 30 }, (v) => level.set(v / 100));
      p.button('Fade to 100%', bind(() => { animate(level, 1, { duration: 1 }); }));
      p.button('Fade to 10%', bind(() => { animate(level, 0.1, { duration: 1 }); }));
      p.button('Plug / unplug', toggle);
    }
  });
  return () => { scope.cancel(); cancel?.(); off(); p?.dispose(); };
};

export default mount;
