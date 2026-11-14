// A page timeline with a separate intro timeline added to it, and edits to the child that lengthen the parent
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="site">
      <div class="top"><i></i><i></i><i></i></div>
      <div class="hero"><div class="logo"></div><b class="title">Orbit</b><span class="badge">Beta</span></div>
      <div class="cards"><i></i><i></i></div>
    </div>`;

  const scope = scopeMotion(el, (s) => {
    // The child: its own timeline, built paused.
    const intro = animate(
      [
        ['.logo', { scale: [0, 1] }, { duration: 0.5 }],
        ['.title', { opacity: [0, 1], x: [-14, 0] }, { duration: 0.4 }],
      ],
      { autoplay: false },
    );
    const badge = ['.badge', { opacity: [0, 1], scale: [0.5, 1] }, { duration: 0.4 }] as const;

    // The parent: nav and cards, then the intro is added so it starts with the first segment.
    const page = animate(
      [
        ['.top i', { opacity: [0, 1], y: [-8, 0] }, { duration: 0.4 }],
        ['.cards i', { opacity: [0, 1], y: [14, 0] }, { duration: 0.3 }],
      ],
      { autoplay: false },
    );
    page.add(intro, '<');

    const replay = (): void => {
      page.time = 0;
      page.play();
    };
    if (preview) {
      let withBadge = false;
      const tick = (): void => {
        if (withBadge) intro.remove(badge as never);
        else intro.add(badge as never, '+0.1');
        withBadge = !withBadge;
        replay();
        delay(tick, 3);
      };
      tick();
      return;
    }

    const p = panel(el);
    const lenParent = p.readout('page timeline length');
    const update = (): void => {
      lenParent(`${page.duration.toFixed(1)}s`);
    };
    // Edits to the child are picked up by the parent on the next microtask.
    let added = false;
    // Edits are applied on the next microtask, so read the new lengths a moment later.
    const edited = (): void => {
      delay(() => {
        update();
        replay();
      }, 0.05);
    };
    p.button('Add a badge to the intro', () => s.run(() => {
      if (added) return;
      added = true;
      intro.add(badge as never, '+0.6');
      edited();
    }));
    p.button('Remove it', () => s.run(() => {
      added = false;
      intro.remove(badge as never);
      edited();
    }));
    p.button('Replay', () => s.run(replay));
    update();
    replay();
    hint(el, 'The intro is a timeline of its own, added to the page timeline with page.add(intro, "<"). Add a badge to the intro and the page timeline grows to fit it.');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
