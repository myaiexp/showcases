// Three call-to-action buttons that release with backOut, anticipate and circOut, so the same click feels different
import { animate, delay, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const BUTTONS = [
  { label: 'Add to cart', mood: 'Playful', ease: 'backOut' },
  { label: 'Send message', mood: 'Eager', ease: 'anticipate' },
  { label: 'Continue', mood: 'Calm', ease: 'circOut' },
] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<div class="buttons"></div>';
  el.querySelector('.buttons')!.classList.toggle('full', !preview);
  const holder = el.querySelector<HTMLElement>('.buttons')!;
  for (const b of BUTTONS) {
    const row = document.createElement('div');
    row.className = 'row';
    const button = document.createElement('button');
    button.className = 'cta';
    button.dataset.ease = b.ease;
    const text = document.createElement('span');
    text.textContent = b.label;
    const arrow = document.createElement('i');
    arrow.textContent = '→';
    button.append(text, arrow);
    const note = document.createElement('code');
    note.textContent = `${b.mood}: ease: '${b.ease}'`;
    row.append(button, note);
    holder.append(row);
  }

  let seconds = 0.7;
  /** The release: the button springs back from pressed size and its arrow flies off and returns. */
  const release = (button: HTMLElement): void => {
    const ease = button.dataset.ease as (typeof BUTTONS)[number]['ease'];
    animate(button, { scale: [0.88, 1] }, { duration: seconds, ease });
    animate(button.querySelector('i')!, { x: [0, 26, 0], opacity: [1, 0, 1] }, { duration: seconds, ease, times: [0, 0.5, 1] });
  };

  const scope = scopeMotion(el, () => {
    if (preview) {
      // Each button gets pressed in turn.
      const buttons = [...el.querySelectorAll<HTMLElement>('.cta')];
      let n = 0;
      const tick = (): void => {
        const b = buttons[n++ % buttons.length]!;
        animate(b, { scale: 0.88 }, { duration: 0.12 });
        delay(() => release(b), 0.2);
        delay(tick, 1.6);
      };
      delay(tick, 0.4);
      return;
    }
    press('.cta', (button) => {
      animate(button, { scale: 0.88 }, { duration: 0.12 });
      return (_e, info) => {
        if (info.success) release(button as HTMLElement);
        else animate(button, { scale: 1 }, { duration: 0.2 });
      };
    });
  });

  const controls = !preview ? panel(el) : undefined;
  controls?.slider('seconds', { min: 0.3, max: 2, step: 0.1, value: seconds }, (v) => {
    seconds = v;
  });
  if (!preview) hint(el, 'Click each button (or tab to it and press Enter). The same animation runs on all three; only the easing differs. backOut overshoots and bounces back, anticipate dips backwards before it goes, circOut starts fast and glides to rest.');

  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
