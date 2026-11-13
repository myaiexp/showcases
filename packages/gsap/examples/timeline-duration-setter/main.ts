// tl.duration(seconds) fits the content into that time by changing timeScale, not duration
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h, slider } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const dots = [0, 1, 2].map(() => h('div', 'box', '', track));
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2, defaults: { ease: 'power2.inOut' } });
    dots.forEach((d, i) => {
      gsap.set(d, { position: 'absolute', left: i * 40, top: 6, scale: 0.8 });
      tl.to(d, { x: () => track.clientWidth - 140, rotation: 360, duration: 1 }, i * 0.8);
    });

    const show = (): void => {
      out.textContent =
        `duration() ${tl.duration().toFixed(2)}  <- the content, unchanged\n` +
        `timeScale() ${tl.timeScale().toFixed(2)}  <- what duration(n) changes\n` +
        `plays in ${(tl.duration() / tl.timeScale()).toFixed(2)}s per loop`;
    };
    show();

    if (preview) {
      let fast = false;
      timer = window.setInterval(() => {
        fast = !fast;
        tl.duration(fast ? 1.2 : 3.6);
        show();
      }, 2500);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    slider('tl.duration(seconds)', 1, 8, 0.5, tl.duration(), (v) => { tl.duration(v); show(); }, bar);
    h(
      'p',
      'note',
      'A timeline\'s duration is dictated by its children. Used as a setter, duration(n) leaves that alone and sets timeScale so the whole thing fits into n seconds.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
