// ScrollTrigger mistake: two to() tweens on one property from different scroll ranges, beside three documented fixes
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// The first move runs over scroll 50-200px, the second over 250-450px.
const FIRST = { start: 50, end: 200, x: 90 };
const SECOND = { start: 250, end: 450, x: 180 };

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const stage = h('div', 'stage', '', scroller);
  h('div', 'content', '', scroller);
  const lane = (label: string, bad = false): HTMLElement => {
    const row = h('div', bad ? 'lane bad' : 'lane', '', stage);
    h('span', 'label', label, row);
    const track = h('div', 'track', '', row);
    return h('div', 'dot', '', track);
  };
  const lanes = {
    bad: lane('to() + to()', true),
    later: lane('immediateRender: false'),
    fromTo: lane('fromTo() for the second'),
    timeline: lane('one timeline'),
  };
  const readout = h('p', 'readout', 'Scroll the box and watch the first lane jump back to 0 before the second move.', wrap);

  const ctx = gsap.context(() => {
    const st = (start: number, end: number): ScrollTrigger.Vars => ({ scroller, start, end, scrub: true });

    // The mistake: the second tween records its start value (x: 0) when created and renders it
    // straight away, so it overwrites the first tween's result until its own range begins.
    gsap.to(lanes.bad, { x: FIRST.x, ease: 'none', scrollTrigger: st(FIRST.start, FIRST.end) });
    gsap.to(lanes.bad, { x: SECOND.x, ease: 'none', scrollTrigger: st(SECOND.start, SECOND.end) });

    // Fix 1: do not render the later tween until it starts.
    gsap.to(lanes.later, { x: FIRST.x, ease: 'none', scrollTrigger: st(FIRST.start, FIRST.end) });
    gsap.to(lanes.later, { x: SECOND.x, ease: 'none', immediateRender: false, scrollTrigger: st(SECOND.start, SECOND.end) });

    // Fix 2: state the starting value of the later tween.
    gsap.to(lanes.fromTo, { x: FIRST.x, ease: 'none', scrollTrigger: st(FIRST.start, FIRST.end) });
    gsap.fromTo(lanes.fromTo, { x: FIRST.x }, { x: SECOND.x, ease: 'none', scrollTrigger: st(SECOND.start, SECOND.end) });

    // Fix 3: one timeline with one ScrollTrigger over the whole range. Durations are the
    // proportions of the scroll distance: 150px move, 50px pause, 200px move.
    gsap
      .timeline({ scrollTrigger: st(FIRST.start, SECOND.end) })
      .to(lanes.timeline, { x: FIRST.x, duration: 3, ease: 'none' })
      .to(lanes.timeline, { duration: 1 })
      .to(lanes.timeline, { x: SECOND.x, duration: 4, ease: 'none' });

    if (preview) {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 6, ease: 'none', repeat: -1, yoyo: true });
      readout.remove();
    }
  }, el);

  return () => ctx.revert();
};

export default mount;
