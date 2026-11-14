// A "34% read, 2 min left" counter fed by the progress number scroll() passes to a callback
import { scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { ARTICLE_WORDS, articleHtml } from '../../shared/article.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="reader">
      <div class="head"><b class="pct">0% read</b><span class="left"></span></div>
      <div class="scroller"><article></article></div>
    </div>`;
  el.querySelector('article')!.innerHTML = articleHtml();
  el.querySelector('.reader')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const pct = el.querySelector<HTMLElement>('.pct')!;
  const left = el.querySelector<HTMLElement>('.left')!;

  let wpm = 200;
  let progress = 0;
  const show = (): void => {
    pct.textContent = `${Math.round(progress * 100)}% read`;
    const minutes = (ARTICLE_WORDS * (1 - progress)) / wpm;
    left.textContent = progress >= 0.995 ? 'finished' : minutes < 1 ? 'under a minute left' : `about ${Math.ceil(minutes)} min left`;
  };

  const controls = !preview ? panel(el) : undefined;
  controls?.slider('words per minute', { min: 80, max: 400, step: 10, value: wpm }, (v) => {
    wpm = v;
    show();
  });
  if (!preview) hint(el, `This article is ${ARTICLE_WORDS} words. Scroll it: the callback gets progress from 0 to 1 and turns it into a percentage and a time left. A slower reader gets a bigger number.`);

  const scope = scopeMotion(el, () => {
    // scroll() with a plain function calls it on every scroll with the latest progress, 0 to 1.
    scroll((p) => {
      progress = p;
      show();
    }, { container: scroller });
    if (preview) {
      wpm = 40; // a slow reader, so the minutes are visibly counting down in a short card
      autoScroll(scroller, { duration: 7 });
    }
  });
  show();
  return () => {
    scope.cancel();
    controls?.dispose();
  };
};

export default mount;
