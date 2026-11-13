// ScrollToPlugin.config({ autoKill }): the global switch that lets a manual scroll cancel a scrollTo tween
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { btn, check, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollToPlugin);

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const content = h('div', 'content', '', scroller);
  for (let i = 0; i < 8; i++) h('div', 'mark', `${i * 100}px`, content);
  const readout = h('pre', 'readout', '', wrap);

  let autoKill = false;
  let tween: gsap.core.Tween | undefined;
  let timers: number[] = [];

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context((self) => {
    const show = (): void => {
      readout.textContent =
        `ScrollToPlugin.config({ autoKill: ${autoKill} })\n` +
        `scrollTop ${Math.round(scroller.scrollTop)}   tween progress ${Math.round((tween?.progress() ?? 0) * 100)}%`;
    };
    gsap.ticker.add(show);
    cleanups.push(() => gsap.ticker.remove(show));

    // The tween sets no autoKill of its own, so the global config decides.
    const start = (): void => {
      // A new tween each press: keep it out of the context and kill the old one by hand.
      self.ignore(() => {
        tween?.kill();
        ScrollToPlugin.config({ autoKill });
        tween = gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 4, ease: 'none' });
      });
    };
    // Stands in for the user dragging the scrollbar: any change of scrollTop made outside the tween.
    const nudge = (): void => { scroller.scrollTop -= 140; };

    if (preview) {
      let n = 0;
      const cycle = (): void => {
        scroller.scrollTop = 0;
        autoKill = n++ % 2 === 0;
        start();
        timers.push(window.setTimeout(nudge, 1600));
      };
      cycle();
      timers.push(window.setInterval(cycle, 5200));
    } else {
      check('ScrollToPlugin.config({ autoKill: true })', (on) => { autoKill = on; }, wrap);
      const bar = h('div', 'bar', '', wrap);
      btn('scroll to max (4s, linear)', () => { scroller.scrollTop = 0; start(); }, bar);
      btn('scroll up 140px, as a user would', nudge, bar);
      h('p', 'note', 'The setting is read when a tween starts. With autoKill off the tween carries on and drags the box back down; with it on, the tween notices the outside change and drops the scroll.', wrap);
    }
  }, el);

  return () => {
    for (const t of timers) { clearTimeout(t); clearInterval(t); }
    timers = [];
    for (const c of cleanups) c();
    tween?.kill();
    ScrollToPlugin.config({ autoKill: false });
    ctx.revert();
  };
};

export default mount;
