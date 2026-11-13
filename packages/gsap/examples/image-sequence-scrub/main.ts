// A canvas shows one of 30 generated frames, chosen by how far a scroll box has been scrolled
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import { makeFrames } from './frames.ts';
import { imageSequence } from './imageSequence.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mount: Mount = (el, { preview }) => {
  const W = preview ? 220 : 320;
  const H = preview ? 130 : 200;
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const scroller = h('div', 'scroller', '', root);
  const content = h('div', 'content', '', scroller);
  const stage = h('div', 'stage', '', content);
  const canvas = h('canvas', '', '', stage);
  canvas.width = W;
  canvas.height = H;
  const readout = h('p', 'readout', '', root);
  h('span', 'hint', 'scroll', stage);

  // No image files: the frames are drawn on a canvas and handed over as data URLs.
  const urls = makeFrames(30, W, H);

  const ctx = gsap.context(() => {
    const seq = imageSequence({
      urls,
      canvas,
      scrollTrigger: { scroller, trigger: content, start: 'top top', end: 'bottom bottom', scrub: true },
      onUpdate: () => {
        readout.textContent = `scroll ${Math.round((scroller.scrollTop / Math.max(1, scroller.scrollHeight - scroller.clientHeight)) * 100)}%`;
      },
    });
    void seq;
    // The card has no pointer, so a looping tween scrolls the box for it.
    if (preview) {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }
  }, el);
  if (preview) readout.remove();

  return () => ctx.revert();
};

export default mount;
