// Weighted random picker: the official weightedRandom() helper drawn as a live histogram
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { weightedRandom } from './weightedRandom.ts';
import './style.css';

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];
const EASES = ['none', 'power1', 'power4', 'power4.out', 'sine.inOut'];

const mount: Mount = (el, { preview }) => {
  const chart = document.createElement('div');
  chart.className = 'chart';
  const bars = LABELS.map((label) => {
    const col = document.createElement('div');
    col.className = 'col';
    const bar = document.createElement('div');
    bar.className = 'bar';
    const name = document.createElement('span');
    name.textContent = label;
    col.append(bar, name);
    chart.append(col);
    return bar;
  });
  el.append(chart);

  const counts = LABELS.map(() => 0);
  let pick = weightedRandom(LABELS, preview ? 'power4' : 'power1');
  const readout = document.createElement('p');
  readout.className = 'readout';

  // One quickTo per bar, created once: it retargets the same tween on every draw instead of
  // making a new one (a context records every new animation until it is reverted).
  const ctx = gsap.context(() => {}, el);
  const scaleTo = bars.map((bar) => ctx.add(() => gsap.quickTo(bar, 'scaleY', { duration: 0.2 })) as unknown as gsap.QuickToFunc);
  const draw = (): void => {
    const max = Math.max(...counts, 1);
    scaleTo.forEach((to, i) => to((counts[i] ?? 0) / max));
  };
  const reset = (): void => {
    counts.fill(0);
    draw();
  };

  const sample = (n: number): void => {
    for (let i = 0; i < n; i++) {
      const idx = LABELS.indexOf(pick());
      counts[idx] = (counts[idx] ?? 0) + 1;
    }
    draw();
  };

  const timer = window.setInterval(() => sample(preview ? 4 : 6), 100);

  if (!preview) {
    const select = document.createElement('select');
    for (const e of EASES) select.append(new Option(e, e));
    const apply = (): void => {
      pick = weightedRandom(LABELS, select.value);
      reset();
      readout.textContent = `weightedRandom(["A".."F"], "${select.value}"): each bar is how often that item was picked`;
    };
    select.addEventListener('change', apply);
    const clear = document.createElement('button');
    clear.className = 'btn';
    clear.textContent = 'Clear counts';
    clear.addEventListener('click', reset);
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append('Ease ', select, clear);
    el.append(controls, readout);
    apply();
  }

  return () => {
    window.clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
