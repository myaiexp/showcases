// One tip recomputes its text in onShow; the other keeps its first text
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const timeAgo = (minutes: number): string => {
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const h = Math.floor(minutes / 60);
  return `${h} hour${h === 1 ? '' : 's'} ago`;
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover each "posted" label, leave, and come back later.' });

  // A fake page clock: one real second is one minute, so staleness shows within seconds.
  let minutes = 3;
  const clock = document.createElement('div');
  clock.className = 'clock';
  const drawClock = (): void => {
    clock.textContent = `Page clock: posted ${minutes} min ago`;
  };
  drawClock();
  stage.every(1000, () => {
    minutes += 1;
    drawClock();
  });
  stage.root.append(clock);

  const makeStamp = (title: string): HTMLElement => {
    const post = document.createElement('div');
    post.className = 'post';
    const text = document.createElement('span');
    text.textContent = title;
    const stamp = document.createElement('span');
    stamp.className = 'stamp';
    stamp.textContent = 'posted';
    stamp.tabIndex = 0;
    post.append(text, stamp);
    stage.root.append(post);
    return stamp;
  };
  const fresh = makeStamp('Fresh: recomputed on open');
  const stale = makeStamp('Stale: filled in once');

  stage.own(
    tippy(fresh, {
      content: timeAgo(minutes),
      placement: 'bottom-end',
      appendTo: stage.root,
      // Runs every time the tip is about to open, so the text always matches the clock.
      onShow: (instance) => instance.setContent(timeAgo(minutes)),
    }),
  );
  stage.own(tippy(stale, { content: timeAgo(minutes), placement: 'bottom-end', appendTo: stage.root }));

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(fresh, 700);
      await wait(1500);
      stage.ghost.leave();
      await wait(600);
      await stage.ghost.hover(stale, 700);
      await wait(1500);
      stage.ghost.leave();
      await wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
