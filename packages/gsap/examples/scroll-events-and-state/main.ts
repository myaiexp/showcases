// Global ScrollTrigger events and state: addEventListener, removeEventListener, isScrolling, update and refresh
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { btn, check, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const EVENTS = ['scrollStart', 'scrollEnd', 'refreshInit', 'revert', 'refresh'] as const;
type Ev = (typeof EVENTS)[number];

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const content = h('div', 'content', '', scroller);
  const side = h('div', 'side', '', wrap);
  const lamp = h('div', 'lamp', 'isScrolling()', side);
  const log = h('pre', 'log', '', side);

  const lines: string[] = [];
  const t0 = performance.now();
  const note = (text: string): void => {
    lines.push(`${((performance.now() - t0) / 1000).toFixed(1).padStart(5)}s  ${text}`);
    if (lines.length > 8) lines.shift();
    log.textContent = lines.join('\n');
  };
  // One handler per event type so each can be removed on its own.
  const handlers = new Map<Ev, () => void>(EVENTS.map((type) => [type, () => note(type)]));
  const attach = (type: Ev, on: boolean): void => {
    const fn = handlers.get(type);
    if (!fn) return;
    if (on) ScrollTrigger.addEventListener(type, fn);
    else ScrollTrigger.removeEventListener(type, fn);
  };

  const showScrolling = (): void => {
    const on = ScrollTrigger.isScrolling();
    lamp.classList.toggle('on', on);
    lamp.textContent = `isScrolling() ${on}`;
  };

  const ctx = gsap.context(() => {
    // A trigger on the box makes it a ScrollTrigger-related scroller, so its scrolling is reported.
    ScrollTrigger.create({ scroller, trigger: content, start: 'top top', end: 'bottom bottom' });
    gsap.ticker.add(showScrolling);
    for (const type of EVENTS) attach(type, true);

    if (preview) {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 1.4, ease: 'power2.inOut', repeat: -1, yoyo: true, repeatDelay: 1.2 });
    } else {
      note('listening to all five (global, so other scrollers on the page can show up too)');
      const bar = h('div', 'bar', '', wrap);
      for (const type of EVENTS) {
        const box = check(type, (on) => attach(type, on), bar);
        box.checked = true;
      }
      btn('ScrollTrigger.refresh()', () => ScrollTrigger.refresh(), bar);
      btn('refresh(true)', () => ScrollTrigger.refresh(true), bar);
      btn('ScrollTrigger.update()', () => { ScrollTrigger.update(); note('update(): re-read scroll, no recalculation'); }, bar);
    }
  }, el);

  return () => {
    gsap.ticker.remove(showScrolling);
    for (const type of EVENTS) attach(type, false);
    ctx.revert();
  };
};

export default mount;
