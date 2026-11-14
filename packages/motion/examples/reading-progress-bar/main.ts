// An article with a progress bar along its top that fills as you read, via scroll(animation, { container })
import { animate, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { articleHtml } from '../../shared/article.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="reader">
      <div class="bar"><i></i></div>
      <div class="scroller"><article></article></div>
    </div>`;
  el.querySelector('article')!.innerHTML = articleHtml();
  el.querySelector('.reader')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  if (!preview) hint(el, 'Scroll the article. The bar is an ordinary animation of scaleX from 0 to 1, and scroll() plays it by how far you have read instead of by time.');

  const scope = scopeMotion(el, () => {
    // Linear easing: the bar should be exactly as full as the article is read.
    const fill = animate('.bar i', { scaleX: [0, 1] }, { ease: 'linear' });
    // Handing the animation to scroll() replaces its clock with the panel's scroll position.
    scroll(fill, { container: scroller });

    if (preview) autoScroll(scroller, { duration: 6 });
  });
  return () => scope.cancel();
};

export default mount;
