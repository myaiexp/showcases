// Viewport helpers: isInViewport, positionInViewport, maxScroll, st.scroll(), isTouch and clearScrollMemory
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { gsapFrame } from '../../shared/frame.ts';
import { PAGE_CSS, PAGE_HTML } from './page.ts';
import './style.css';

// These helpers measure against the window's viewport, so they run in an iframe whose window
// is the example's own page rather than the gallery's.
const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: ['ScrollTrigger'], css: PAGE_CSS, signal });
  frame.iframe.classList.toggle('preview', preview);
  frame.doc.body.innerHTML = PAGE_HTML;
  const { gsap, ScrollTrigger, win } = frame;
  const box = frame.doc.getElementById('box') as HTMLElement;
  const drift = frame.doc.getElementById('drift') as HTMLElement;
  const f = (n: number): string => n.toFixed(2);

  let st: ScrollTriggerType | undefined;
  const readout = h('pre', 'readout', '', el);
  const show = (): void => {
    const lines = [
      `isInViewport(box) ${ScrollTrigger.isInViewport(box)}   isInViewport(box, 0.5) ${ScrollTrigger.isInViewport(box, 0.5)}`,
      `positionInViewport(box) ${f(ScrollTrigger.positionInViewport(box))}   "top" ${f(ScrollTrigger.positionInViewport(box, 'top'))}   "bottom" ${f(ScrollTrigger.positionInViewport(box, 'bottom'))}`,
      `horizontal: positionInViewport(drift, "center", true) ${f(ScrollTrigger.positionInViewport(drift, 'center', true))}   isInViewport(drift, 1, true) ${ScrollTrigger.isInViewport(drift, 1, true)}`,
    ];
    if (!preview) {
      lines.push(
        `maxScroll(window) ${ScrollTrigger.maxScroll(win)}   maxScroll(window, true) ${ScrollTrigger.maxScroll(win, true)}   st.scroll() ${Math.round(st?.scroll() ?? 0)}`,
        `ScrollTrigger.isTouch ${ScrollTrigger.isTouch}   history.scrollRestoration "${win.history.scrollRestoration}"`,
      );
    }
    readout.textContent = lines.join('\n');
  };

  // A trigger over the whole page: its onUpdate refreshes the readout whenever the page scrolls.
  st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: show });
  // The drifting box moves without scrolling, so the ticker keeps the horizontal readout live.
  gsap.to(drift, { x: () => win.innerWidth - 44, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
  gsap.ticker.add(show);

  if (preview) {
    const pos = { y: 0 };
    gsap.to(pos, { y: () => ScrollTrigger.maxScroll(win), duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: () => st?.scroll(pos.y) });
  } else {
    const bar = h('div', 'bar', '', el);
    btn('st.scroll(0)', () => st?.scroll(0), bar);
    btn('st.scroll(600)', () => st?.scroll(600), bar);
    btn('st.scroll(maxScroll)', () => st?.scroll(ScrollTrigger.maxScroll(win)), bar);
    btn('clearScrollMemory("manual")', () => ScrollTrigger.clearScrollMemory('manual'), bar);
    btn('clearScrollMemory("auto")', () => ScrollTrigger.clearScrollMemory('auto'), bar);
  }

  return () => {
    gsap.ticker.remove(show);
    gsap.killTweensOf('*');
    st?.kill();
    frame.iframe.remove();
  };
};

export default mount;
