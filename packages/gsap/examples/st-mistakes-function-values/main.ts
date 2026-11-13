// ScrollTrigger mistake: values computed once at creation, beside function-based start/end and invalidateOnRefresh
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const row = (title: string, bad: boolean): { box: HTMLElement; ball: HTMLElement } => {
    h('div', bad ? 'title bad' : 'title', title, scroller);
    const box = h('div', bad ? 'box bad' : 'box', '', scroller);
    return { box, ball: h('div', 'ball', '', box) };
  };
  const fixed = row('hard-coded: end `+=${box.offsetHeight}`, x: 150', true);
  const live = row('functions: end () => `+=${box.offsetHeight}`, x: () => ..., invalidateOnRefresh', false);
  h('div', 'tail', '', scroller);
  const readout = h('pre', 'readout', '', wrap);

  let big = false;
  const st: ScrollTrigger[] = [];

  const show = (): void => {
    const [a, b] = st;
    if (!a || !b) return;
    readout.textContent =
      `box ${fixed.box.offsetWidth}px wide, ${fixed.box.offsetHeight}px tall\n` +
      `hard-coded:  end - start = ${Math.round(a.end - a.start)}px   ball x = ${Math.round(Number(gsap.getProperty(fixed.ball, 'x')))}\n` +
      `functions:   end - start = ${Math.round(b.end - b.start)}px   ball x = ${Math.round(Number(gsap.getProperty(live.ball, 'x')))}`;
  };

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context(() => {
    const make = (r: { box: HTMLElement; ball: HTMLElement }, end: ScrollTrigger.Vars['end'], x: number | (() => number), invalidate: boolean): void => {
      const tw = gsap.fromTo(r.ball, { x: 0 }, {
        x,
        ease: 'none',
        scrollTrigger: { scroller, trigger: r.box, start: 'top 85%', end, scrub: true, invalidateOnRefresh: invalidate, onUpdate: show, onRefresh: show },
      });
      if (tw.scrollTrigger) st.push(tw.scrollTrigger);
    };
    make(fixed, `+=${fixed.box.offsetHeight}`, 150, false);
    make(live, () => `+=${live.box.offsetHeight}`, () => live.box.offsetWidth - 28, true);
    show();

    // Resizing an element is not a window resize, so nothing refreshes by itself.
    const resize = (large: boolean): void => {
      big = large;
      scroller.classList.toggle('big', large);
      ScrollTrigger.refresh();
    };
    if (preview) {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true });
      const id = window.setInterval(() => resize(!big), 3500);
      cleanups.push(() => clearInterval(id));
    } else {
      const bar = h('div', 'bar', '', wrap);
      btn('make the boxes bigger + ScrollTrigger.refresh()', () => resize(true), bar);
      btn('back to small + refresh()', () => resize(false), bar);
    }
  }, el);

  return () => {
    for (const c of cleanups) c();
    ctx.revert();
  };
};

export default mount;
