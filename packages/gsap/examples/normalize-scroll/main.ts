// ScrollTrigger.normalizeScroll: scrolling moved onto the JS thread, toggled and configured at runtime
import type { Mount } from '@/types.ts';
import { check, h } from '../../shared/ui.ts';
import { gsapFrame } from '../../shared/frame.ts';
import { PAGE_CSS, PAGE_HTML } from './page.ts';
import './style.css';

const DRAG = { type: 'touch,wheel,pointer' };

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: ['ScrollTrigger'], css: PAGE_CSS, signal });
  frame.iframe.classList.toggle('preview', preview);
  frame.doc.body.innerHTML = PAGE_HTML;
  const { gsap, ScrollTrigger } = frame;

  // The pinned, scrubbed section is the thing normalizing keeps from jumping.
  const st = ScrollTrigger.create({
    trigger: frame.doc.querySelector('.pin') as HTMLElement,
    pin: true,
    start: 'top 20%',
    end: '+=800',
    animation: gsap.fromTo('.fill', { scaleX: 0 }, { scaleX: 1, ease: 'none' }),
    scrub: true,
  });

  let dragMode = false;
  const apply = (on: boolean): void => {
    // true: normalize with defaults. An object configures the Observer it uses internally.
    if (on) ScrollTrigger.normalizeScroll(dragMode ? DRAG : true);
    else ScrollTrigger.normalizeScroll(false);
  };
  apply(true);

  const readout = h('pre', 'readout', '', el);
  const show = (): void => {
    const n = ScrollTrigger.normalizeScroll(); // getter: the Observer doing the work, or undefined
    readout.textContent =
      `normalizeScroll(): ${n ? `Observer, type "${String(n.vars.type)}"` : 'undefined (native scrolling)'}\n` +
      `scroll ${Math.round(st.scroll() ?? 0)} / ${Math.round(ScrollTrigger.maxScroll(frame.win))}px   velocity ${Math.round(st.getVelocity())} px/s`;
  };
  gsap.ticker.add(show);

  if (preview) {
    // Scroll through the pinned section and back, via the ScrollTrigger's own scroll() setter.
    const pos = { y: 0 };
    gsap.to(pos, { y: 900, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: () => st.scroll(pos.y) });
  } else {
    const bar = h('div', 'bar', '', el);
    const master = check('normalizeScroll on', (on) => { apply(on); drag.disabled = !on; }, bar);
    master.checked = true;
    const drag = check('type "touch,wheel,pointer": drag the page with the mouse', (on) => {
      dragMode = on;
      apply(true);
    }, bar);
  }

  return () => {
    gsap.ticker.remove(show);
    ScrollTrigger.normalizeScroll(false);
    gsap.killTweensOf('*');
    st.kill();
    frame.iframe.remove();
  };
};

export default mount;
