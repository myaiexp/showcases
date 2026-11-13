// shiftChildren(amount, adjustLabels, ignoreBeforeTime) moves a timeline's children along a ruler
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const SPAN = 9;

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const ruler = h('div', 'ruler', '', wrap);
  const rows = [0, 1, 2, 3].map(() => h('div', 'rrow', '', ruler));
  const bars = rows.map((r) => h('b', '', '', r));
  const tick = h('div', 'tick', '', ruler);
  const tickText = h('i', '', 'mid', tick);
  const head = h('div', 'head', '', ruler);
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      defaults: { duration: 1.2, ease: 'none' },
      onUpdate: () => {
        head.style.left = `${(Math.min(tl.time(), SPAN) / SPAN) * 100}%`;
      },
    });
    const fill = (): void => {
      tl.to({}, { x: 1 })
        .to({}, { x: 1 })
        .addLabel('mid')
        .to({}, { x: 1 })
        .to({}, { x: 1 });
    };
    fill();

    const draw = (note: string): void => {
      const kids = tl.getChildren(false);
      kids.forEach((k, i) => {
        bars[i]!.style.left = `${(k.startTime() / SPAN) * 100}%`;
        bars[i]!.style.width = `${((k.endTime() - k.startTime()) / SPAN) * 100}%`;
      });
      tick.style.left = `${((tl.labels.mid ?? 0) / SPAN) * 100}%`;
      tickText.textContent = `mid ${(tl.labels.mid ?? 0).toFixed(1)}`;
      out.textContent = `starts: ${kids.map((k) => k.startTime().toFixed(1)).join(', ')}   duration() ${tl.duration().toFixed(1)}\n${note}`;
    };
    draw('children start one after another; label "mid" sits between the pairs');

    const shift = (amount: number, labels: boolean, from: number): void => {
      tl.shiftChildren(amount, labels, from);
      draw(`shiftChildren(${amount}, ${labels}, ${from})`);
    };
    const reset = (): void => {
      tl.clear(true);
      fill();
      draw('clear(true), then the four tweens added again');
    };

    if (preview) {
      let n = 0;
      const steps = [() => shift(1, false, 0), () => shift(1, true, 0), reset];
      timer = window.setInterval(() => steps[n++ % steps.length]!(), 1600);
      return;
    }
    const bar = h('div', 'bar', '', wrap);
    btn('shiftChildren(1)', () => shift(1, false, 0), bar);
    btn('shiftChildren(1, true)', () => shift(1, true, 0), bar);
    btn('shiftChildren(1, false, 2.4)', () => shift(1, false, 2.4), bar);
    btn('reset', () => ctx.add(reset), bar);
    h(
      'p',
      'note',
      'The second argument also moves the labels. The third leaves children that start before that time alone, which splices a gap into the middle of a timeline.',
      wrap,
    );
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
