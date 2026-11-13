// ScrollTrigger.matchMedia (the pre-3.11 form): per-breakpoint triggers, saveStyles, teardown, clearMatchMedia
import type { Mount } from '@/types.ts';
import { btn, check, h } from '../../shared/ui.ts';
import { gsapFrame } from '../../shared/frame.ts';
import { PAGE_CSS, PAGE_HTML } from './page.ts';
import './style.css';

const WIDE = '(min-width: 480px)';
const NARROW = '(max-width: 479px)';

// Resizing is what flips a media query, and an iframe's width is its own viewport width,
// so the breakpoints run in an iframe the example can resize.
const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: ['ScrollTrigger'], css: PAGE_CSS, signal });
  frame.iframe.classList.toggle('preview', preview);
  frame.doc.body.innerHTML = PAGE_HTML;
  const { gsap, ScrollTrigger, win } = frame;

  const readout = h('pre', 'readout', '', el);
  let active = 'none yet';
  let teardowns = 0;
  let events = 0;
  const show = (): void => {
    readout.textContent =
      `active: ${active}   (${frame.iframe.clientWidth}px wide)\n` +
      `ScrollTrigger.getAll(): ${ScrollTrigger.getAll().length}   teardown calls: ${teardowns}   "matchMedia" events: ${events}`;
  };
  const onMatch = (): void => { events++; show(); };
  ScrollTrigger.addEventListener('matchMedia', onMatch);

  // Record the panel's inline styles so each revert puts back a clean element, not the last breakpoint's leftovers.
  ScrollTrigger.saveStyles('.panel');

  ScrollTrigger.matchMedia({
    [WIDE]: () => {
      active = `wide ${WIDE}: panel slides sideways`;
      gsap.to('.panel', { xPercent: 260, ease: 'none', scrollTrigger: { trigger: '.panel', scrub: true, start: 'top 90%', end: 'top 20%' } });
      const spin = gsap.to('.dot', { rotation: 360, duration: 1.5, ease: 'none', repeat: -1 });
      // Not a ScrollTrigger animation, so ScrollTrigger won't kill it: return a teardown function.
      return () => {
        spin.kill();
        teardowns++;
      };
    },
    [NARROW]: () => {
      active = `narrow ${NARROW}: panel scales and spins`;
      gsap.to('.panel', { scale: 1.7, rotation: 180, ease: 'none', scrollTrigger: { trigger: '.panel', scrub: true, start: 'top 90%', end: 'top 20%' } });
    },
    // "all" is not tied to a query, so this one persists across breakpoints.
    all: () => {
      gsap.to('.tail i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.tail', scrub: true, start: 'top bottom', end: 'top 55%' } });
    },
  });
  show();

  const widths = { wide: '100%', narrow: '380px' };
  let narrow = false;
  const setWidth = (n: boolean): void => {
    narrow = n;
    frame.iframe.style.width = n ? widths.narrow : widths.wide;
    window.setTimeout(show, 450);
  };

  const pos = { y: 0 };
  gsap.to(pos, { y: 650, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: () => win.scrollTo(0, pos.y) });

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => setWidth(!narrow), 2600);
  } else {
    const bar = h('div', 'bar', '', el);
    btn('wide', () => setWidth(false), bar);
    btn('narrow (380px)', () => setWidth(true), bar);
    btn(`clearMatchMedia("${WIDE}")`, () => { ScrollTrigger.clearMatchMedia(WIDE); show(); }, bar);
    btn('clearMatchMedia()', () => { ScrollTrigger.clearMatchMedia(); show(); }, bar);
    btn('ScrollTrigger.killAll()', () => { ScrollTrigger.killAll(); show(); }, bar);
    const auto = check('auto-resize every 3s', (on) => {
      clearInterval(timer);
      if (on) timer = window.setInterval(() => setWidth(!narrow), 3000);
    }, bar);
    auto.checked = false;
  }

  return () => {
    clearInterval(timer);
    ScrollTrigger.removeEventListener('matchMedia', onMatch);
    ScrollTrigger.clearMatchMedia();
    gsap.killTweensOf('*');
    ScrollTrigger.killAll();
    frame.iframe.remove();
  };
};

export default mount;
