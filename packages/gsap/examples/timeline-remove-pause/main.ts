// Pauses added with addPause() are removed again with removePause(time); play() resumes
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const STOPS: [number, number] = [1, 2];

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const box = h('div', 'box', '', track);
  const stops = h('div', 'stops', '', wrap);
  const marks = STOPS.map((t) => {
    const i = h('i', 'on', '', stops);
    i.style.left = `${(t / 3) * 100}%`;
    return i;
  });
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  const ctx = gsap.context(() => {
    const present = new Set<number>(STOPS);
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: 'none' },
      onUpdate: show,
      onComplete: show,
    });
    const to = (i: number): number => ((i + 1) * (track.clientWidth - 36)) / 3;
    tl.to(box, { x: () => to(0) })
      .to(box, { x: () => to(1) })
      .to(box, { x: () => to(2) });
    // addPause() puts a zero-duration pause at that time in the sequence
    STOPS.forEach((t) => tl.addPause(t));

    function show(): void {
      marks.forEach((m, i) => m.classList.toggle('on', present.has(STOPS[i]!)));
      out.textContent =
        `time() ${tl.time().toFixed(2)}   paused() ${tl.paused()}   progress() ${tl.progress().toFixed(2)}\n` +
        `pauses in place at: ${[...present].join(', ') || 'none'}`;
    }
    const toggle = (i: number): void => {
      const t = STOPS[i]!;
      if (present.has(t)) {
        tl.removePause(t);
        present.delete(t);
      } else {
        tl.addPause(t);
        present.add(t);
      }
      show();
    };
    show();

    if (preview) {
      let n = 0;
      timer = window.setInterval(() => {
        n++;
        if (tl.progress() === 1) tl.restart();
        else if (tl.paused()) tl.play();
        if (n % 9 === 0) toggle(0);
        show();
      }, 800);
      tl.play();
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    btn('play()', () => { tl.play(); show(); }, bar);
    btn('restart()', () => { tl.restart(); show(); }, bar);
    btn('toggle pause at 1s', () => ctx.add(() => toggle(0)), bar);
    btn('toggle pause at 2s', () => ctx.add(() => toggle(1)), bar);
    h(
      'p',
      'note',
      'play() resumes a timeline that stopped at a pause. removePause(1) deletes the pause added at 1 second, so the box runs straight through; the dots mark the pauses still in place.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
