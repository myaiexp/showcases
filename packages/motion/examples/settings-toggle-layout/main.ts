// Switches whose handle is moved by justify-content and animated by animateLayout
import { animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const SETTINGS = ['Dark mode', 'Notifications', 'Wi-Fi'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="list">${SETTINGS.map((name) => `
    <div class="row"><span>${name}</span>
      <button class="switch" role="switch" aria-checked="false" aria-label="${name}"><i class="handle" data-layout></i></button>
    </div>`).join('')}</div>`;
  const switches = [...el.querySelectorAll<HTMLButtonElement>('.switch')];
  let transition: 'spring' | 'tween' = 'spring';

  const scope = scopeMotion(el, () => {
    const flip = (sw: HTMLButtonElement): void => {
      const on = sw.getAttribute('aria-checked') !== 'true';
      // The update only flips justify-content. Every [data-layout] element inside `el`
      // that ends up somewhere else slides there instead of jumping.
      animateLayout(
        el,
        () => {
          sw.setAttribute('aria-checked', String(on));
          sw.style.justifyContent = on ? 'flex-end' : 'flex-start';
        },
        transition === 'spring' ? { type: 'spring', visualDuration: 0.35, bounce: 0.3 } : { duration: 0.3, ease: 'easeInOut' },
      );
    };

    if (preview) {
      let n = 0;
      const tick = (): void => {
        flip(switches[n++ % switches.length]!);
        delay(tick, 0.9);
      };
      delay(tick, 0.6);
      return;
    }
    for (const sw of switches) sw.addEventListener('click', () => scope.run(() => flip(sw)));
  });

  const cleanups: Array<() => void> = [() => scope.cancel()];
  if (!preview) {
    const p = panel(el);
    p.select('Transition', ['spring', 'tween'] as const, 'spring', (v) => { transition = v; });
    hint(el, 'Click a switch. The code just sets justify-content: flex-end; the handle glides because it carries data-layout.');
    cleanups.push(() => p.dispose());
  }
  return () => cleanups.forEach((c) => c());
};

export default mount;
