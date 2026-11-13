// Two from() tweens on one property of one box, with and without immediateRender: false on the second
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const T = preview ? 120 : 260;

  const lane = (code: string): HTMLElement => {
    const wrap = document.createElement('div');
    wrap.className = 'lane';
    const label = document.createElement('code');
    label.textContent = code;
    const track = document.createElement('div');
    track.className = 'track';
    const box = document.createElement('div');
    box.className = 'box';
    track.append(box);
    wrap.append(label, track);
    root.append(wrap);
    return box;
  };
  const a = lane('from(box, { x }); from(box, { x })');
  const b = lane('from(box, { x }); from(box, { x, immediateRender: false })');
  el.append(root);

  let timelines: gsap.core.Timeline[] = [];
  const build = (): void => {
    for (const t of timelines) t.kill();
    gsap.set([a, b], { clearProps: 'transform' });
    const make = (box: HTMLElement, secondImmediate: boolean): gsap.core.Timeline => {
      const tl = gsap.timeline();
      tl.from(box, { x: T, duration: 0.8, ease: 'power2.out' });
      // Default: this from() renders x = T the moment it is created, before the first one has played.
      tl.from(box, { x: T, duration: 0.8, ease: 'power2.out', immediateRender: secondImmediate }, '+=0.5');
      return tl;
    };
    // The second from() gets immediateRender: true (the default for from) in lane A.
    timelines = [make(a, true), make(b, false)];
  };
  build();

  // Built from a timer/handler, outside any context: the cleanup kills them by handle.
  const timer = preview ? window.setInterval(build, 4200) : 0;
  if (!preview) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Replay both';
    btn.addEventListener('click', build);
    root.append(btn);
  }

  return () => {
    window.clearInterval(timer);
    for (const t of timelines) t.kill();
  };
};

export default mount;
