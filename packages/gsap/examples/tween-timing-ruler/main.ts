// A child tween drawn three ways on a ruler: inside its timeline, and converted to global time
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h, slider } from '../../shared/ui.ts';
import './style.css';

const SPAN = 9; // seconds the ruler covers

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const box = h('div', 'box', '', track);
  const ruler = h('div', 'ruler', '', wrap);
  const bar = (label: string): { span: HTMLElement; b: HTMLElement } => {
    const row = h('div', 'rrow', '', ruler);
    return { b: h('b', '', '', row), span: h('span', '', label, row) };
  };
  const inInner = bar('');
  const inGlobal = bar('');
  const inMaster = bar('');
  const head = h('div', 'head', '', ruler);
  const out = h('pre', 'readout', '', wrap);

  const ctx = gsap.context(() => {
    const master = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.6,
      onUpdate: () => {
        head.style.left = `${(Math.min(master.time(), SPAN) / SPAN) * 100}%`;
      },
    });
    const inner = gsap.timeline();
    const tween = gsap.to(box, {
      x: () => track.clientWidth - 36,
      duration: 2,
      delay: 0.5,
      ease: 'none',
    });
    inner.add(tween, 1); // placed at 1s inside inner, delay pushes startTime to 1.5s
    master.add(inner, 1); // inner starts at 1s on master

    const place = (b: HTMLElement, from: number, to: number): void => {
      b.style.left = `${(from / SPAN) * 100}%`;
      b.style.width = `${((to - from) / SPAN) * 100}%`;
    };
    const draw = (): void => {
      const s = tween.startTime();
      const e = tween.endTime();
      // globalTime() is documented but missing from gsap's type definitions
      const gt = (tween as unknown as { globalTime(t: number): number }).globalTime.bind(tween);
      const gs = gt(0);
      const ge = gt(tween.duration());
      place(inInner.b, s, e);
      place(inGlobal.b, gs, ge);
      place(inMaster.b, inner.startTime(), inner.endTime());
      inInner.span.textContent = `tween.startTime() ${s.toFixed(2)}  endTime() ${e.toFixed(2)}  (inner time)`;
      inGlobal.span.textContent = `tween.globalTime(0) ${gs.toFixed(2)}  to ${ge.toFixed(2)}`;
      inMaster.span.textContent = `inner timeline ${inner.startTime().toFixed(2)} to ${inner.endTime().toFixed(2)}`;
      out.textContent =
        `delay() ${tween.delay().toFixed(2)}   inner.timeScale() ${inner.timeScale().toFixed(2)}\n` +
        `duration() ${tween.duration()}   (inner as unknown as { globalTime(t: number): number }).globalTime(0) ${(inner as unknown as { globalTime(t: number): number }).globalTime(0).toFixed(2)}`;
    };
    draw();

    if (preview) return;
    const bar2 = h('div', 'bar', '', wrap);
    slider('delay()', 0, 2, 0.1, 0.5, (v) => { tween.delay(v); draw(); }, bar2);
    slider('inner timeScale()', 0.5, 3, 0.1, 1, (v) => { inner.timeScale(v); draw(); }, bar2);
    slider('tween.startTime()', 0, 4, 0.1, tween.startTime(), (v) => { tween.startTime(v); draw(); }, bar2);
    h(
      'p',
      'note',
      'startTime() and endTime() are in the parent timeline\'s own time. globalTime() converts through every parent, including the timeScale of the inner timeline, onto the global timeline.',
      wrap,
    );
  }, el);

  return () => ctx.revert();
};

export default mount;
