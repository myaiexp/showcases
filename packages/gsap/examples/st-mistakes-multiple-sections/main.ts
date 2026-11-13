// ScrollTrigger mistake: one tween and one trigger for many boxes, beside a loop with one of each per box
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mount: Mount = (el, { preview, signal }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const column = (title: string, bad: boolean): { scroller: HTMLElement; boxes: HTMLElement[] } => {
    const col = h('div', bad ? 'col bad' : 'col', '', wrap);
    h('div', 'title', title, col);
    const scroller = h('div', 'scroller', '', col);
    const boxes = [1, 2, 3].map((n) => h('div', 'box', String(n), scroller));
    h('div', 'tail', '', scroller);
    return { scroller, boxes };
  };
  const left = column('one tween for all (mistake)', true);
  const right = column('one tween per box (fix)', false);

  // Keep the two boxes scrolled together so one gesture compares both. Setting the same
  // value again fires no event, so the pair cannot ping-pong.
  const link = (a: HTMLElement, b: HTMLElement): void => {
    a.addEventListener('scroll', () => { if (b.scrollTop !== a.scrollTop) b.scrollTop = a.scrollTop; }, { signal });
  };
  link(left.scroller, right.scroller);
  link(right.scroller, left.scroller);

  const ctx = gsap.context(() => {
    const move = { x: 120, ease: 'none' };
    // The mistake: every pass animates ALL the boxes, and every trigger is the FIRST box,
    // so all of them travel together as the first box crosses the viewport.
    left.boxes.forEach(() => {
      gsap.to(left.boxes, { ...move, scrollTrigger: { scroller: left.scroller, trigger: left.boxes[0], scrub: true } });
    });
    // The fix: a plain loop, each tween with its own target and its own trigger.
    right.boxes.forEach((box) => {
      gsap.to(box, { ...move, scrollTrigger: { scroller: right.scroller, trigger: box, scrub: true } });
    });

    if (preview) {
      gsap.to(left.scroller, { scrollTo: { y: 'max' }, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true });
    } else {
      h('p', 'note', 'Scroll either box: the other follows. On the left every box moves at once; on the right each moves as it crosses the box.', el);
    }
  }, el);

  return () => ctx.revert();
};

export default mount;
