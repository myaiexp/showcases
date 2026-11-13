// ScrollSmoother in its own page: smoothed scroll, data-speed parallax and data-lag
import type { Mount } from '@/types.ts';
import { gsapFrame } from '../../shared/frame.ts';
import './style.css';

// The iframe is a page of its own, so ScrollSmoother can own its body scroll the way the
// docs set it up: #smooth-wrapper > #smooth-content, with the scrollbar on <body>.
const PAGE_CSS = `
#smooth-content { height: 2200px; position: relative; }
.col { position: absolute; top: 700px; width: 18%; height: 120px; border-radius: 10px;
  display: grid; place-items: center; font: 600 13px/1.2 var(--font-mono, monospace);
  color: #111; text-align: center; }
.ref { left: 4%; background: var(--fg-3); }
.slow { left: 28%; background: var(--cyan, #5bd); }
.fast { left: 52%; background: var(--orange, #f93); }
.lag { left: 76%; background: var(--accent); }
.mid { position: fixed; left: 0; right: 0; top: 50%; border-top: 1px dashed var(--fg-3); }
.hint { padding: 16px; color: var(--fg-2); }
.window { position: absolute; top: 1300px; left: 10%; right: 10%; height: 220px; overflow: hidden;
  border-radius: 12px; }
.window .tall { height: 440px; background: repeating-linear-gradient(0deg, var(--bg-raised, #333) 0 22px,
  var(--bg-surface, #222) 22px 44px); }
.window p { position: absolute; inset: 0; margin: 0; display: grid; place-items: center; color: var(--fg-1); }
`;

const PAGE_HTML = `
<div id="smooth-wrapper"><div id="smooth-content">
  <p class="hint">Scroll this page. The dashed line is the viewport centre: every column
  lines up with "ref" when it crosses it.</p>
  <div class="col ref">ref<br>speed 1</div>
  <div class="col slow" data-speed="0.5">speed<br>0.5</div>
  <div class="col fast" data-speed="1.5">speed<br>1.5</div>
  <div class="col lag" data-lag="0.8">lag<br>0.8s</div>
  <div class="window"><div class="tall" data-speed="auto"></div><p>data-speed="auto"</p></div>
</div></div>
<div class="mid"></div>`;

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, {
    plugins: ['ScrollTrigger', 'ScrollSmoother'],
    css: PAGE_CSS,
    signal,
  });
  frame.iframe.classList.toggle('preview', preview);
  frame.doc.body.innerHTML = PAGE_HTML;

  // Create the smoother before any ScrollTriggers, as the docs advise.
  const smoother = frame.ScrollSmoother.create({
    smooth: 1.2,
    effects: true,
  });

  // A card has no pointer input, so a tween scrolls the iframe's native scrollbar and the
  // smoother catches up to it. Built once with repeat, so nothing new is created per loop.
  if (preview) {
    const native = { y: 0 };
    frame.gsap.to(native, {
      y: () => frame.ScrollTrigger.maxScroll(frame.win) * 0.7,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      onUpdate: () => frame.win.scrollTo(0, native.y),
    });
  }

  return () => {
    smoother.kill();
    frame.gsap.killTweensOf('*');
    frame.iframe.remove();
  };
};

export default mount;
