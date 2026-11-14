// A page-wide reading progress bar: scroll() with no container tracks the window, here inside its own iframe
import type { Mount } from '@/types.ts';
import { articleHtml } from '../../shared/article.ts';
import { motionFrame } from '../../shared/frame.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

// This CSS styles the iframe's own page. Its window is the one scroll() tracks.
const PAGE_CSS = `
  body { padding: 20px 18px 40px; }
  .bar { position: fixed; inset: 0 0 auto 0; height: 4px; background: #2a2a38; z-index: 2; }
  .bar i { display: block; height: 100%; background: #8aa4ff; transform-origin: left; transform: scaleX(0); }
  .badge { position: fixed; right: 8px; bottom: 8px; padding: 2px 8px; border-radius: 10px; background: #2a2a38; font-size: 12px; font-variant-numeric: tabular-nums; z-index: 2; }
  h2 { margin: 28px 0 0; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: #8a8a9a; }
  h3 { margin: 4px 0 8px; font-size: 18px; }
  p { margin: 0 0 10px; font-size: 13px; line-height: 1.55; color: #c8c8d0; }
`;

const mount: Mount = async (el, { preview, signal }) => {
  el.innerHTML = '<div class="holder"></div>';
  const holder = el.querySelector<HTMLElement>('.holder')!;
  holder.classList.toggle('full', !preview);

  let frame;
  try {
    frame = await motionFrame(holder, { css: PAGE_CSS, signal });
  } catch (err) {
    if (signal.aborted) return () => undefined;
    throw err;
  }
  const { Motion, doc, win } = frame;
  doc.body.innerHTML = `<div class="bar"><i></i></div><div class="badge">0%</div>${[1, 2, 3].map((n) => `<h2>Part ${n}</h2>${articleHtml()}`).join('')}`;
  const fill = doc.querySelector<HTMLElement>('.bar i')!;
  const badge = doc.querySelector<HTMLElement>('.badge')!;

  // No container option: scroll() tracks the window of the document it runs in, and this
  // Motion lives in the iframe, so the "window" is the iframe's page.
  Motion.scroll(Motion.animate(fill, { scaleX: [0, 1] }, { ease: 'linear' }));
  Motion.scroll((progress) => {
    badge.textContent = `${Math.round(progress * 100)}%`;
  });

  let controls: ReturnType<typeof panel> | undefined;
  if (preview) {
    // The card's page scrolls itself: one animated number written to the window's scroll position.
    Motion.animate(0, 1, {
      duration: 8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      onUpdate: (v) => win.scrollTo(0, v * (doc.documentElement.scrollHeight - win.innerHeight)),
    });
  } else {
    controls = panel(el);
    controls.button('Back to top', () => win.scrollTo({ top: 0, behavior: 'smooth' }));
    hint(el, 'Scroll the page inside the frame. There is no container option: scroll() tracks the window, which is why this runs in an iframe of its own and leaves the gallery page alone.');
  }

  return () => {
    controls?.dispose();
    frame.iframe.remove(); // takes the frame's Motion, its scroll listeners and its loop with it
  };
};

export default mount;
