// ScrollTrigger start and end in every form the docs list, with the calculated pixel values read back
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { presets } from './presets.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const content = h('div', 'content', '', scroller);
  const box = h('div', 'target', 'trigger', content);
  const fill = h('div', 'fill', '', box);
  const readout = h('pre', 'readout', '', wrap);

  const calls = { n: 0 };
  const list = presets(box, scroller, calls);
  let index = 0;
  let st: ScrollTrigger | undefined;
  let timer = 0;

  const show = (): void => {
    const p = list[index];
    if (!p || !st) return;
    readout.textContent =
      `start: ${p.label.split(' to ')[0]}   end: ${p.label.split(' to ')[1] ?? p.label}\n` +
      `st.start ${Math.round(st.start)}px   st.end ${Math.round(st.end)}px   progress ${st.progress.toFixed(2)}\n` +
      `${p.note}${index === 6 ? `   [function calls: ${calls.n}]` : ''}`;
  };

  const ctx = gsap.context(() => {
    const build = (i: number): void => {
      index = i;
      const p = list[i];
      if (!p) return;
      st?.kill();
      st = ScrollTrigger.create({
        scroller,
        trigger: box,
        start: p.start,
        end: p.end,
        markers: !preview,
        animation: gsap.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none' }),
        scrub: true,
        onUpdate: show,
        onRefresh: show,
      });
      show();
    };
    build(0);

    if (preview) {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
      timer = window.setInterval(() => ctx.add(() => build((index + 1) % list.length)), 2600);
    } else {
      const bar = h('div', 'bar', 'start / end ', wrap);
      const select = h('select', '', '', bar);
      list.forEach((p, i) => (h('option', '', p.label, select).value = String(i)));
      select.addEventListener('change', () => ctx.add(() => build(Number(select.value))));
      btn('shrink the box + ScrollTrigger.refresh()', () => {
        scroller.style.height = scroller.style.height === '150px' ? '' : '150px';
        ScrollTrigger.refresh();
      }, bar);
    }
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
