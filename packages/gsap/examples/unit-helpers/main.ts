// unitize() and getUnit() on a table of inputs, checkPrefix() on property names, and a unitized modifier on a looping box
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const u = gsap.utils;
// unitize(fn, unit): strips the unit off the input, runs fn, puts a unit back on the result
const clampPx = u.unitize(u.clamp(0, 100), 'px');
// no unit given: the input's own unit is reapplied to the result
const wrapKeep = u.unitize(u.wrap(0, 100));

const INPUTS: Array<string | number> = [132, '-20%', '150px', '130vw', 50];
const PROPS = ['filter', 'transform', 'mask', 'notAProperty'];

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';

  const strip = document.createElement('div');
  strip.className = 'strip';
  const box = document.createElement('div');
  box.className = 'box';
  strip.append(box);
  const caption = document.createElement('code');
  caption.className = 'cap';
  caption.textContent = 'x: 1000, modifiers: { x: unitize(wrap(0, W), "px") }';

  const table = document.createElement('table');
  const head = table.insertRow();
  for (const h of ['input', 'unitize(clamp(0,100),"px")', 'unitize(wrap(0,100))', 'getUnit']) {
    const th = document.createElement('th');
    th.textContent = h;
    head.append(th);
  }
  const addRow = (input: string | number): void => {
    const tr = table.insertRow();
    const text = typeof input === 'string' ? input : String(input);
    const values = [JSON.stringify(input), clampPx(input as number), wrapKeep(input as number), JSON.stringify(u.getUnit(text))];
    for (const v of values) tr.insertCell().textContent = String(v);
  };
  for (const i of preview ? INPUTS.slice(0, 3) : INPUTS) addRow(i);

  root.append(strip, caption, table);
  if (!preview) {
    const pre = document.createElement('p');
    pre.className = 'prefix';
    pre.textContent = PROPS.map((p) => `checkPrefix("${p}") -> ${String(u.checkPrefix(p))}`).join('   ');
    const field = document.createElement('input');
    field.className = 'field';
    field.placeholder = 'try a value like 250% or 80px, press Enter';
    field.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && field.value.trim()) {
        addRow(field.value.trim());
        while (table.rows.length > 9) table.deleteRow(1); // cap the table
        field.value = '';
      }
    });
    root.append(field, pre);
  }
  el.append(root);

  const ctx = gsap.context(() => {
    const W = (preview ? 220 : 440) - 28;
    // the modifier receives "123.4px"; unitize strips it, wrap loops the number, "px" goes back on
    gsap.to(box, {
      x: 1000,
      duration: 4,
      ease: 'none',
      repeat: -1,
      modifiers: { x: u.unitize(u.wrap(0, W), 'px') },
    });
  }, el);

  return () => ctx.revert();
};

export default mount;
