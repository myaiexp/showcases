// Feed cards that reveal the first time they scroll into view, using inView with a scrollable root
import { animate, inView, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const NAMES = ['Ada', 'Bram', 'Chen', 'Dara', 'Eli', 'Fay', 'Gus', 'Hana', 'Ivo', 'Jun'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="feed${preview ? '' : ' full'}"></div>`;
  const feed = el.querySelector<HTMLElement>('.feed')!;
  NAMES.forEach((name, i) => {
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = '<div class="avatar"></div><div class="lines"><b></b><i></i><i style="width:70%"></i></div>';
    post.querySelector('b')!.textContent = `${name} posted an update`;
    post.querySelector<HTMLElement>('.avatar')!.style.background = `hsl(${i * 36} 60% 55%)`;
    feed.append(post);
  });
  const posts = [...feed.querySelectorAll<HTMLElement>('.post')];

  let replay = preview; // cards hide again when they leave, so the card loop keeps revealing
  let stop: VoidFunction = () => {};
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    const arm = bind((): void => {
      stop();
      for (const post of posts) post.style.opacity = '0';
      // root: the panel's own viewport decides what is "in view", not the window.
      stop = inView(posts, bind((post: Element) => {
        animate(post, { opacity: [0, 1], y: [28, 0] }, { duration: 0.5, ease: 'easeOut' });
        // Returning a function makes inView keep watching and call it on leave.
        if (replay) return () => { animate(post, { opacity: 0 }, { duration: 0.2 }); };
      }), { root: feed, amount: 0.5 });
    });
    arm();
    if (preview) autoScroll(feed, { duration: 4 });
    else {
      hint(el, 'Scroll the feed. Each card animates in once. Tick the box to make cards hide again as they leave, then re-reveal.');
      p = panel(el);
      p.toggle('Hide again on leave', false, (v) => { replay = v; arm(); });
      p.button('Reset', arm);
    }
  });
  return () => { scope.cancel(); stop(); p?.dispose(); };
};

export default mount;
