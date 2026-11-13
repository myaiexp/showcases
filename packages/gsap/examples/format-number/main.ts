// Counters that tween a plain number and format it on every update with formatNumber and getFormatter
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { formatNumber, getFormatter } from './formatNumber.ts';
import './style.css';

const money = getFormatter(0.01, true); // increment by 0.01, always pad to 2 decimals
const wholeStep = getFormatter(5); // snaps to multiples of 5, with commas

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const rows = [
    { label: 'formatNumber(n, 2)', fmt: (n: number) => '$' + formatNumber(n, 2) },
    { label: 'getFormatter(0.01, true)', fmt: (n: number) => '$' + money(n) },
    { label: 'getFormatter(5)', fmt: (n: number) => wholeStep(n) },
  ].map((r) => {
    const row = h('div', 'row', '', root);
    const value = h('div', 'value', '', row);
    h('span', 'tag', r.label, row);
    return { ...r, value };
  });
  if (preview) rows.pop();

  const state = { num: 0 };
  const render = (): void => {
    for (const r of rows) r.value.textContent = r.fmt(state.num);
  };

  const ctx = gsap.context(() => {
    if (preview) {
      gsap.to(state, { num: 10500.254145, duration: 3, ease: 'power2.inOut', repeat: -1, yoyo: true, repeatDelay: 0.4, onUpdate: render });
    } else {
      gsap.to(state, { num: 10500.254145, duration: 2, ease: 'power2.out', onUpdate: render });
    }
    render();
  }, el);

  if (!preview) {
    const bar = h('div', 'controls', '', root);
    for (const target of [1000.254145, 987654.321, 4.999, 0]) {
      // handlers run outside the context, so the tween is made through ctx.add
      btn(`count to ${target}`, () => ctx.add(() => gsap.to(state, { num: target, duration: 1.5, ease: 'power2.out', overwrite: true, onUpdate: render })), bar);
    }
  }

  return () => ctx.revert();
};

export default mount;
