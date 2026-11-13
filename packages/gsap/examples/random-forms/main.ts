// Each form of gsap.utils.random() fills a row of chips; the last row uses the string form in a tween
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const random = gsap.utils.random;
const COUNT = 7;

// Reusable functions are created once; each call returns a fresh random value.
const snappedFn = random(-200, 500, 10, true);
const pickFn = random([0, 100, 200], true);
const rangeFn = random(-10, 50, true);

const FORMS: Array<{ code: string; get: () => string }> = [
  { code: 'random(0, 100)', get: () => random(0, 100).toFixed(1) },
  { code: 'random(0, 500, 5)', get: () => String(random(0, 500, 5)) },
  { code: 'random(["red", "blue", "green"])', get: () => random(['red', 'blue', 'green']) },
  { code: 'random(-200, 500, 10, true)()', get: () => String(snappedFn()) },
  { code: 'random([0, 100, 200], true)()', get: () => String(pickFn()) },
  { code: 'random(-10, 50, true)()', get: () => rangeFn().toFixed(1) },
];

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const forms = preview ? FORMS.slice(0, 4) : FORMS;
  const rows = forms.map((f) => {
    const row = document.createElement('div');
    row.className = 'row';
    const code = document.createElement('code');
    code.textContent = f.code;
    const chips = document.createElement('div');
    chips.className = 'chips';
    const els = Array.from({ length: COUNT }, () => {
      const c = document.createElement('span');
      c.className = 'chip';
      chips.append(c);
      return c;
    });
    row.append(code, chips);
    root.append(row);
    return els;
  });

  // last row: the string form, resolved by GSAP once per target
  const strRow = document.createElement('div');
  strRow.className = 'row';
  const strCode = document.createElement('code');
  strCode.textContent = 'x: "random(-50, 50, 10)"';
  const strChips = document.createElement('div');
  strChips.className = 'chips dots';
  const dots = Array.from({ length: COUNT }, () => {
    const d = document.createElement('i');
    strChips.append(d);
    return d;
  });
  strRow.append(strCode, strChips);
  root.append(strRow);
  el.append(root);

  const roll = (): void => {
    forms.forEach((f, i) => {
      for (const chip of rows[i] ?? []) {
        const v = f.get();
        chip.textContent = v;
        chip.style.background = i === 2 ? v : '';
        chip.style.color = i === 2 ? '#111' : '';
      }
    });
    // Created from a handler/timer, outside any context: killed by target in the cleanup.
    gsap.to(dots, { x: 'random(-50, 50, 10)', duration: 0.5, ease: 'power2.out', overwrite: true });
  };
  roll();

  let timer = 0;
  if (preview) timer = window.setInterval(roll, 1500);
  else {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Roll again';
    btn.addEventListener('click', roll);
    root.append(btn);
  }

  return () => {
    window.clearInterval(timer);
    gsap.killTweensOf(dots);
  };
};

export default mount;
