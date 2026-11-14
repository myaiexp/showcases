// A burst of toasts scheduled with delay(): locked to Motion's frame loop, cancellable before they fire
import { animate, delay, frame, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const LINES = ['Photo uploaded', 'Link copied', 'Draft saved', 'Invite sent', 'Backup finished', 'Profile updated'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="toasts${preview ? '' : ' full'}">
      <div class="status"><span class="queued"></span></div>
      <div class="stack"></div>
    </div>`;
  const stack = el.querySelector<HTMLElement>('.stack')!;
  const status = el.querySelector<HTMLElement>('.queued')!;
  let count = 5;
  let gap = 0.4;
  let queued = 0;
  let fired = 0;
  let cancelled = 0;
  let n = 0;
  let cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;
  let setPending: ((v: string | number) => void) | undefined;

  const show = (): void => {
    status.textContent = `scheduled ${queued} · fired ${fired} · cancelled ${cancelled}`;
    setPending?.(queued - fired - cancelled);
  };

  const scope = scopeMotion(el, () => {
    const toast = (): void => {
      // delay() fires on the "read" step of the frame loop, so measuring is safe here.
      const before = stack.getBoundingClientRect().height;
      // Writes go to the render step of this same frame: reads first, then writes, no thrash.
      frame.render(() => {
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = `${LINES[n++ % LINES.length]}`;
        t.title = `The stack was ${Math.round(before)}px tall when this toast was scheduled to appear`;
        stack.prepend(t);
        animate(t, { opacity: [0, 1], x: [30, 0] }, { type: 'spring', bounce: 0.3, visualDuration: 0.35 });
        // A delay() replaces the usual setTimeout: it is collected by the scope too.
        delay(() => {
          animate(t, { opacity: 0, x: 30 }, { duration: 0.25 }).then(() => t.remove());
        }, 1.8);
      });
      fired++;
      show();
    };

    const burst = (): void => {
      queued += count;
      for (let i = 0; i < count; i++) cancels.push(delay(toast, i * gap));
      show();
    };
    const cancelPending = (): void => {
      // Every delay() returns a function that cancels it. Ones that already ran do nothing.
      for (const c of cancels) c();
      cancelled = queued - fired;
      cancels = [];
      show();
    };
    const reset = (): void => { queued = fired = cancelled = 0; cancels = []; };

    if (preview) {
      const loop = (): void => {
        reset();
        burst();
        delay(cancelPending, gap * 2.5);
        delay(loop, 4.6);
      };
      delay(loop, 0.3);
    } else {
      show();
      hint(el, 'Fire a burst of five toasts, 0.4s apart. Hit Cancel before the last ones appear: their delay() is cancelled and they never show.');
      p = panel(el);
      p.button('Send burst', () => { reset(); burst(); });
      p.button('Cancel pending', cancelPending);
      p.slider('gap (s)', { min: 0.1, max: 1, step: 0.1, value: gap }, (v) => { gap = v; });
      setPending = p.readout('pending', '0');
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
