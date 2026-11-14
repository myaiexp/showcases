// A feed that grows as you read it: scroll() with trackContentSize keeps its progress bar honest
import { scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TOPICS = ['New photo in Hiking', 'Maya replied to you', 'Build finished', 'Weekly digest is ready', 'Sam shared a link', 'Reminder: standup', 'Price drop on your list', 'Lena joined the group'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="feed">
      <div class="bar"><i></i></div>
      <div class="scroller"></div>
    </div>`;
  el.querySelector('.feed')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  let count = 0;
  const addPosts = (n: number): void => {
    for (let i = 0; i < n; i++) {
      const post = document.createElement('div');
      post.className = 'post';
      post.textContent = `${++count}. ${TOPICS[count % TOPICS.length]}`;
      scroller.append(post);
    }
  };
  addPosts(preview ? 8 : 14);

  let track = true;
  let cancel: VoidFunction | undefined;
  let timer = 0;
  const controls = !preview ? panel(el) : undefined;
  const says = controls?.readout('scroll() says', '0%');
  const truly = controls?.readout('actual', '0%');
  const actual = (): number => scroller.scrollTop / Math.max(1, scroller.scrollHeight - scroller.clientHeight);
  const updateActual = (): void => truly?.(`${Math.round(actual() * 100)}%`);

  const attach = (): void => {
    cancel?.();
    // trackContentSize re-measures the scrollable area every frame, so progress follows content that grows.
    // It is documented in scroll.md; the exported ScrollOptions type omits it, hence the cast.
    cancel = scroll((progress) => {
      (el.querySelector('.bar i') as HTMLElement).style.transform = `scaleX(${progress})`;
      says?.(`${Math.round(progress * 100)}%`);
    }, { container: scroller, trackContentSize: track } as NonNullable<Parameters<typeof scroll>[1]>);
  };

  // The infinite part: near the bottom, load more.
  const onScroll = (): void => {
    if (scroller.scrollTop + scroller.clientHeight > scroller.scrollHeight - 12) {
      if (preview && count > 36) {
        scroller.replaceChildren();
        count = 0;
        addPosts(8);
        scroller.scrollTop = 0;
      } else addPosts(5);
    }
    updateActual();
  };
  scroller.addEventListener('scroll', onScroll);

  const scope = scopeMotion(el, () => {
    attach();
    if (preview) autoScroll(scroller, { duration: 5 });
  });

  if (controls) {
    controls.toggle('trackContentSize', track, (v) => {
      track = v;
      scope.run(attach);
    });
    controls.button('Add 5 posts', () => {
      addPosts(5);
      updateActual();
    });
    controls.toggle('new post every 2 s', false, (on) => {
      window.clearInterval(timer);
      if (on) timer = window.setInterval(() => { addPosts(1); updateActual(); }, 2000);
    });
    hint(el, 'Scroll to the middle, press Add 5 posts: the feed gets longer and the true position drops. With trackContentSize on, the bar follows at once; switch it off and scroll() keeps the old number until the next scroll event.');
  }

  return () => {
    window.clearInterval(timer);
    scroller.removeEventListener('scroll', onScroll);
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
