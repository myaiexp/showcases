// Double-tap a photo to like it: press() with count: 2 and a countTimeout, heart burst where you tapped
import { animate, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3.1 1.7-1.9 3.2-3.1 5.3-3.1 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="post${preview ? '' : ' big'}">
      <div class="photo"></div>
      <p class="likes">0 likes</p>
    </div>`;
  const photo = el.querySelector<HTMLElement>('.photo')!;
  const likes = el.querySelector<HTMLElement>('.likes')!;
  let n = 0;
  let timeout = 0.35;

  let stop: VoidFunction = () => undefined;
  const scope = scopeMotion(el, () => undefined);
  const arm = (): void => {
    stop();
    // count and countTimeout are documented in the d.ts (PressOptions), next to press.md.
    stop = press(
      photo,
      () => (e, info) => {
        if (!info.success) return;
        likes.textContent = `${++n} like${n === 1 ? '' : 's'}`;
        const r = photo.getBoundingClientRect();
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = HEART;
        heart.style.left = `${e.clientX - r.left}px`;
        heart.style.top = `${e.clientY - r.top}px`;
        photo.append(heart);
        scope.run(async () => {
          await animate(heart, { scale: [0, 1.3, 1], opacity: [1, 1, 1], y: [0, -6, -6] }, { duration: 0.35 });
          await animate(heart, { opacity: 0, y: -40 }, { duration: 0.4 });
          heart.remove();
        });
      },
      { count: 2, countTimeout: timeout },
    );
  };
  scope.run(arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Double-click the photo quickly. One click alone does nothing; two within the window like it, with a heart where you clicked.');
    p = panel(el);
    p.slider('countTimeout (s)', { min: 0.1, max: 1, step: 0.05, value: 0.35 }, (v) => {
      timeout = v;
      scope.run(arm);
    });
  } else {
    loopGesture(el, signal, async (g) => {
      const a = at(el, photo, 0.3 + Math.random() * 0.4, 0.3 + Math.random() * 0.4);
      await g.tap(photo, a, 0.05);
      await g.wait(0.12);
      await g.tap(photo, a, 0.05);
      await g.wait(1.4);
    }, 0.2);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;
