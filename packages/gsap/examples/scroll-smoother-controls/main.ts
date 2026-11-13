// ScrollSmoother instance controls: scrollTo, offset, scrollTop, paused, smooth, progress, getVelocity, kill and get
import type { ScrollSmoother as SmootherType } from 'gsap/ScrollSmoother';
import type { Mount } from '@/types.ts';
import { btn, check, h, slider } from '../../shared/ui.ts';
import { gsapFrame } from '../../shared/frame.ts';
import { PAGE_CSS, PAGE_HTML } from './page.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: ['ScrollTrigger', 'ScrollSmoother'], css: PAGE_CSS, signal });
  frame.iframe.classList.toggle('preview', preview);
  frame.doc.body.innerHTML = PAGE_HTML;
  const { gsap, ScrollSmoother, ScrollTrigger, win } = frame;

  const create = (): SmootherType => ScrollSmoother.create({ smooth: 1.2 });
  let smoother: SmootherType | undefined = create();

  const readout = h('pre', 'readout', '', el);
  const show = (): void => {
    const s = smoother;
    if (!s) {
      readout.textContent = `killed.  ScrollSmoother.get() ${String(ScrollSmoother.get())}`;
      return;
    }
    const lines = [
      `progress ${s.progress.toFixed(2)}   scrollTop() ${Math.round(s.scrollTop() ?? 0)}   getVelocity() ${Math.round(s.getVelocity())} px/s`,
      `native velocity ${Math.round(s.scrollTrigger.getVelocity())} px/s   (smoother.scrollTrigger)`,
    ];
    if (!preview) {
      lines.push(
        `smooth() ${s.smooth()}s   paused() ${s.paused()}   wrapper() #${s.wrapper().id}   content() #${s.content().id}`,
        `ScrollSmoother.get() === smoother: ${ScrollSmoother.get() === s}`,
      );
    }
    readout.textContent = lines.join('\n');
  };
  gsap.ticker.add(show);

  if (preview) {
    // Tween the smoother's own scrollTop, the form the docs give for a custom scroll animation.
    const to = smoother.offset('#box3', 'top 100px');
    gsap.to(smoother, { scrollTop: Math.min(ScrollTrigger.maxScroll(win), to), duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true });
  } else {
    const note = h('p', 'note', 'offset() and scrollTo() results show here', el);
    const bar = h('div', 'bar', '', el);
    const on = (fn: (s: SmootherType) => void): (() => void) => () => { if (smoother) fn(smoother); };
    btn('scrollTo("#box1", true, "top 100px")', on((s) => s.scrollTo('#box1', true, 'top 100px')), bar);
    btn('scrollTo("#box2", true, "center center")', on((s) => s.scrollTo('#box2', true, 'center center')), bar);
    btn('scrollTo("#box3", false)', on((s) => s.scrollTo('#box3', false)), bar);
    btn('scrollTo(500)', on((s) => s.scrollTo(500)), bar);
    btn('scrollTop(0)', on((s) => s.scrollTop(0)), bar);
    btn('offset("#box3", "top 100px")', on((s) => { note.textContent = `offset("#box3", "top 100px") = ${Math.round(s.offset('#box3', 'top 100px'))}px`; }), bar);
    btn('gsap.to(smoother, { scrollTop: offset })', on((s) => {
      gsap.to(s, { scrollTop: Math.min(ScrollTrigger.maxScroll(win), s.offset('#box2', 'top 100px')), duration: 1 });
    }), bar);
    const paused = check('paused(true): nothing scrolls, except via scrollTop()/scrollTo()', (v) => smoother?.paused(v), bar);
    slider('smooth()', 0.2, 4, 0.1, 1.2, (v) => smoother?.smooth(v), bar);
    btn('kill()', () => { smoother?.kill(); smoother = undefined; }, bar);
    btn('ScrollSmoother.create()', () => { smoother ??= create(); paused.checked = false; }, bar);
  }

  return () => {
    gsap.ticker.remove(show);
    gsap.killTweensOf('*');
    smoother?.kill();
    frame.iframe.remove();
  };
};

export default mount;
