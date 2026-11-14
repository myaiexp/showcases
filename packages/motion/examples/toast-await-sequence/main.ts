// A toast whose enter, hold and leave steps are awaited one after another
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="screen">
      <div class="toast"><span class="tick">✓</span> Changes saved</div>
      <small class="status">idle</small>
    </div>`;
  const status = el.querySelector('.status') as HTMLElement;
  const toast = el.querySelector('.toast') as HTMLElement;
  toast.style.opacity = '0';

  let alive = true;
  let hold = 1.2;

  const scope = scopeMotion(el, (s) => {
    // After an await the scope is no longer active, so each step runs through s.run().
    const showToast = async (): Promise<void> => {
      status.textContent = '1. entering';
      await s.run(() => animate(toast, { y: [-60, 0], opacity: [0, 1] }, { type: 'spring', bounce: 0.35, visualDuration: 0.45 }));
      if (!alive) return;
      status.textContent = '2. visible, then leaving';
      // delay on the exit makes it a wait: nothing changes until the hold is over.
      await s.run(() => animate(toast, { y: -60, opacity: 0 }, { delay: hold, duration: 0.3, ease: 'easeIn' }));
      if (!alive) return;
      status.textContent = '3. gone';
    };

    if (preview) {
      const loop = (): void => {
        void showToast().then(() => {
          if (alive) s.run(() => delay(loop, 1));
        });
      };
      delay(loop, 0.3);
      return;
    }
    const p = panel(el);
    let busy = false;
    p.slider('stays for (s)', { min: 0, max: 4, step: 0.2, value: hold }, (v) => { hold = v; });
    p.button('Save changes', () => {
      if (busy) return;
      busy = true;
      void showToast().then(() => { busy = false; });
    });
    hint(el, 'The status line moves on only when the previous animation has finished: that is await animation. The same works with animation.then(() => ...).');
    return () => p.dispose();
  });

  return () => {
    alive = false;
    scope.cancel();
  };
};

export default mount;
