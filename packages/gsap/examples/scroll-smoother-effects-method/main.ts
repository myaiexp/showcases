// ScrollSmoother effects(): function-based speed and lag, the getter, removal by defaults, and clamp() speeds
import type { ScrollSmoother as SmootherType } from 'gsap/ScrollSmoother';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { gsapFrame } from '../../shared/frame.ts';
import { PAGE_CSS, PAGE_HTML } from './page.ts';
import './style.css';

const mount: Mount = async (el, { preview, signal }) => {
  const frame = await gsapFrame(el, { plugins: ['ScrollTrigger', 'ScrollSmoother'], css: PAGE_CSS, signal });
  frame.iframe.classList.toggle('preview', preview);
  frame.doc.body.innerHTML = PAGE_HTML;
  const { gsap, ScrollTrigger, win } = frame;

  // effects: true picks up the two data-speed columns at the top of the page.
  const smoother: SmootherType = frame.ScrollSmoother.create({ smooth: 1, effects: true });

  const readout = h('p', 'readout', '', el);
  const say = (text: string): void => {
    readout.textContent = `${text}   |   effects() holds ${smoother.effects().length} ScrollTriggers`;
  };
  const speedFn = (i: number): number => 0.5 + i * 0.12;
  const lagFn = (i: number): number => 0.15 + i * 0.12;

  // Function values get (index, element), as in most places in GSAP.
  const actions: Array<[string, () => void]> = [
    ['speed: 0.5 + index * 0.12', () => smoother.effects('.fx', { speed: speedFn })],
    ['lag: 0.15 + index * 0.12', () => smoother.effects('.fx', { lag: lagFn })],
    ['both', () => smoother.effects('.fx', { speed: speedFn, lag: lagFn })],
    ['reset ({ speed: 1, lag: 0 })', () => smoother.effects('.fx', { speed: 1, lag: 0 })],
  ];
  const run = (i: number): void => {
    const a = actions[i];
    if (!a) return;
    a[1]();
    say(`effects(".fx", ...) ${a[0]}`);
  };
  say('effects() with no arguments is a getter');

  const pos = { y: 0 };
  let timer = 0;
  if (preview) {
    // Cycle the effects on a timer while the page scrolls itself.
    let i = 0;
    timer = window.setInterval(() => run(i++ % actions.length), 2200);
    run(2);
    frame.gsap.to(pos, { y: () => ScrollTrigger.maxScroll(win) * 0.55, duration: 4.4, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: () => win.scrollTo(0, pos.y) });
  } else {
    const bar = h('div', 'bar', '', el);
    actions.forEach(([label], i) => btn(label, () => run(i), bar));
    btn('effects().forEach(t => t.kill())', () => {
      for (const t of smoother.effects()) t.kill();
      say('killed every effect ScrollTrigger');
    }, bar);
    h('p', 'note', 'Scroll the page: columns reach the reference column at the dashed centre line. The two columns at the top compare data-speed 0.5 (starts shifted) with clamp(0.5) (starts in its natural place).', el);
  }

  return () => {
    clearInterval(timer);
    gsap.killTweensOf('*');
    smoother.kill();
    frame.iframe.remove();
  };
};

export default mount;
