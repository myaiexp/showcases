// A bell shaking with repeat: Infinity and a repeatDelay between shakes
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="app">
      <div class="bell">
        <svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0-6 6v4l-2 3h16l-2-3V9a6 6 0 0 0-6-6zM10 19a2 2 0 0 0 4 0"/></svg>
        <span class="badge">1</span>
      </div>
      <span class="label">1 unread message</span>
    </div>`;
  const label = el.querySelector('.label') as HTMLElement;
  const badge = el.querySelector('.badge') as HTMLElement;

  let rest = preview ? 1.2 : 3;
  let shake: { stop: () => void } | undefined;

  const scope = scopeMotion(el, () => {
    const nudge = (): void => {
      shake?.stop();
      label.textContent = '1 unread message';
      badge.style.opacity = '1';
      // A short shake, then repeatDelay of rest, forever.
      shake = animate('.bell svg', { rotate: [0, -16, 14, -10, 6, 0] }, {
        duration: 0.7,
        repeat: Infinity,
        repeatDelay: rest,
      });
    };
    nudge();

    if (preview) return;
    const p = panel(el);
    p.slider('repeatDelay (s)', { min: 0, max: 6, step: 0.5, value: rest }, (v) => { rest = v; nudge(); });
    p.button('Mark as read', () => {
      shake?.stop();
      label.textContent = 'All caught up';
      badge.style.opacity = '0';
    });
    p.button('New message', nudge);
    hint(el, 'Set repeatDelay to 0 and the bell shakes without a break. Mark as read stops the animation; New message starts a fresh one.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
