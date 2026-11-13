// ScrollTrigger.scrollerProxy: a hand-made smooth scroller (wheel + lerp + transform) that ScrollTriggers read and drive
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Mount } from '@/types.ts';
import { h, slider } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const mount: Mount = (el, { preview, signal }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  // overflow: hidden, so the browser never scrolls it: the position below is all there is.
  const view = h('div', 'view', '', wrap);
  const content = h('div', 'content', '', view);
  const cards = Array.from({ length: 6 }, (_, i) => h('div', 'card', `card ${i + 1}`, content));
  const bar = h('div', 'meter', '', wrap);
  const fill = h('div', 'fill', '', bar);
  const readout = h('p', 'readout', '', wrap);

  let pos = 0; // what is drawn
  let target = 0; // where the wheel wants to be
  const max = (): number => Math.max(0, content.offsetHeight - view.clientHeight);

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context(() => {
    const setY = gsap.quickSetter(content, 'y', 'px');
    const apply = (): void => {
      setY(-pos);
      ScrollTrigger.update(); // tell every trigger the (proxied) scroll position changed
    };

    // ScrollTrigger now asks these functions instead of view.scrollTop / scrollHeight.
    ScrollTrigger.scrollerProxy(view, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          pos = target = value; // setter: jump, no easing
          setY(-pos);
        }
        return pos; // getter
      },
      scrollHeight: () => content.offsetHeight,
      getBoundingClientRect: () => view.getBoundingClientRect(),
    });

    cards.forEach((card) => {
      gsap.fromTo(card, { x: -60, rotation: -6, opacity: 0.3 }, {
        x: 0,
        rotation: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: { scroller: view, trigger: card, start: 'top 90%', end: 'top 45%', scrub: true },
      });
    });
    const setFill = gsap.quickSetter(fill, 'scaleX');
    ScrollTrigger.create({
      scroller: view,
      trigger: content,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setFill(self.progress);
        readout.textContent = `proxy scrollTop() ${Math.round(pos)}px   target ${Math.round(target)}px   progress ${self.progress.toFixed(2)}`;
      },
    });

    // The "scroller": ease the drawn position toward the target every frame.
    const tick = (): void => {
      if (Math.abs(target - pos) < 0.2) return;
      pos += (target - pos) * 0.12;
      apply();
    };
    gsap.ticker.add(tick);
    cleanups.push(() => gsap.ticker.remove(tick));

    if (preview) {
      const drive = { y: 0 };
      gsap.to(drive, { y: () => max(), duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: () => { target = drive.y; } });
    } else {
      view.addEventListener('wheel', (e) => {
        e.preventDefault();
        target = Math.min(max(), Math.max(0, target + e.deltaY));
      }, { passive: false, signal });
      slider('scroll', 0, 1, 0.01, 0, (v) => { target = v * max(); }, wrap);
      readout.textContent = 'Use the wheel over the box or the slider: the box has no native scrollbar.';
    }
  }, el);

  return () => {
    for (const c of cleanups) c();
    ctx.revert();
  };
};

export default mount;
