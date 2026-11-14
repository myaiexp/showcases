// A feed you pull down past its top: pixel constraints with per-edge elastic, and a refresh test on release
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const POSTS = ['Ana posted a photo', 'Weekly digest is ready', 'Ville liked your reply', 'New follower: Sam', 'Mia shared a link', 'Reminder: stand-up', 'Jon joined the group'];
const THRESHOLD = 70;

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="phone${preview ? '' : ' big'}">
      <div class="spinner"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /></svg><span>Release to refresh</span></div>
      <div class="feed"></div>
    </div>`;
  const phone = el.querySelector<HTMLElement>('.phone')!;
  const feed = el.querySelector<HTMLElement>('.feed')!;
  const ring = el.querySelector<SVGElement>('.spinner svg')!;
  const label = el.querySelector<HTMLElement>('.spinner span')!;
  const spinner = el.querySelector<HTMLElement>('.spinner')!;
  if (!preview) hint(el, `Pull the feed down. Past ${THRESHOLD}px it refreshes with a new post on top; any less and it springs home.`);

  let n = 0;
  const addPost = (): void => {
    const row = document.createElement('div');
    row.className = 'post';
    row.textContent = POSTS[n++ % POSTS.length]!;
    feed.prepend(row);
    while (feed.children.length > (preview ? 5 : 8)) feed.lastElementChild?.remove();
  };
  for (let i = 0; i < 6; i++) addPost();

  let busy = false;
  const scope = scopeMotion(el, ({ bind }) => {
    drag(feed, {
      axis: 'y',
      // The feed can't move up from rest; pulling down stretches with elastic bottom.
      constraints: { top: 0, bottom: 0 },
      elastic: { top: 0, bottom: 0.7 },
      momentum: false, // release is animated by hand below, so the feed can park under the spinner
      onMove: (_e, info) => {
        if (busy) return;
        const k = Math.min(1, Math.max(0, info.offset.y) / THRESHOLD);
        spinner.style.opacity = String(k);
        label.textContent = k >= 1 ? 'Release to refresh' : 'Pull to refresh';
      },
      onEnd: bind((_e, info) => {
        if (busy) return;
        if (info.offset.y < THRESHOLD) {
          animate(spinner, { opacity: [Number(spinner.style.opacity || 0), 0] }, { duration: 0.2 });
          animate(feed, { y: 0 }, { type: 'spring', bounce: 0.3, visualDuration: 0.35 });
          return;
        }
        busy = true;
        label.textContent = 'Refreshing...';
        animate(feed, { y: 50 }, { type: 'spring', bounce: 0.2, visualDuration: 0.3 });
        const spin = animate(ring, { rotate: [0, 360] }, { duration: 0.8, ease: 'linear', repeat: Infinity });
        animate(0, 1, {
          duration: 1.2,
          onComplete: bind(async () => {
            addPost();
            await animate(feed, { y: 0 }, { type: 'spring', bounce: 0, visualDuration: 0.35 });
            spin.stop();
            animate(spinner, { opacity: 0 }, { duration: 0.2 });
            busy = false;
            label.textContent = 'Pull to refresh';
          }),
        });
      }),
    });
  });

  if (preview) {
    loopGesture(el, signal, async (g) => {
      const from = at(el, feed, 0.5, 0.25);
      await g.drag(feed, from, { x: from.x, y: from.y + 100 }, 0.55);
      await g.wait(2.2);
    }, 0.5);
  }

  return () => scope.cancel();
};

export default mount;
