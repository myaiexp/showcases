// A notification bell whose tip wobbles when it appears, driven by element.animate()
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const WOBBLE: Keyframe[] = [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-9px) rotate(-5deg)', offset: 0.15 },
  { transform: 'translateX(7px) rotate(4deg)', offset: 0.35 },
  { transform: 'translateX(-5px) rotate(-3deg)', offset: 0.55 },
  { transform: 'translateX(3px) rotate(2deg)', offset: 0.75 },
  { transform: 'translateX(0)', offset: 1 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Hover the bell.' });

  const bell = document.createElement('button');
  bell.className = 'bell';
  bell.textContent = '🔔';
  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = '3';
  bell.append(badge);
  stage.root.append(bell);

  const running = new Map<unknown, Animation>();

  stage.own(
    tippy(bell, {
      content: 'You have 3 new messages',
      placement: 'bottom',
      appendTo: stage.root,
      // Same pattern as the docs' CSS animation, with the Web Animations API
      // in place of a class and @keyframes: start it on mount, drop it on hidden.
      onMount(instance) {
        const box = instance.popper.firstElementChild as HTMLElement;
        requestAnimationFrame(() => {
          running.set(instance, box.animate(WOBBLE, { duration: 700, easing: 'ease-out' }));
        });
      },
      onHidden(instance) {
        running.get(instance)?.cancel();
        running.delete(instance);
      },
    }),
  );
  stage.onDispose(() => {
    for (const a of running.values()) a.cancel();
    running.clear();
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(bell, 650);
      await wait(1900);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 60, y: 160 }, 600);
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
