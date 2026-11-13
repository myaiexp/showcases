// A live table of gsap.getProperty() reads on a box that keeps resizing, with unit conversion
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const box = document.createElement('div');
  box.className = 'box';
  stage.append(box);
  root.append(stage);

  // the unit the user picks for the fourth row
  let unit = 'em';
  const select = document.createElement('select');
  select.className = 'unit';
  for (const u of ['em', 'rem', '%', 'vw', 'px']) select.add(new Option(u, u));

  const table = document.createElement('table');
  const cells: HTMLElement[] = [];
  const rows: Array<[string, (b: HTMLElement) => unknown]> = [
    ['getProperty(box, "width")', (b) => gsap.getProperty(b, 'width')],
    ['getProperty(box, "width", "px")', (b) => gsap.getProperty(b, 'width', 'px')],
    ['getProperty(box, "width", "%")', (b) => gsap.getProperty(b, 'width', '%')],
    ['getProperty(box, "width", unit)', (b) => gsap.getProperty(b, 'width', unit)],
    ['getProperty(box, "x")', (b) => gsap.getProperty(b, 'x')],
    ['getProperty(box, "backgroundColor")', (b) => gsap.getProperty(b, 'backgroundColor')],
    ['getter("y", "em")', (b) => gsap.getProperty(b)('y', 'em')], // the reusable getter form
  ];
  const shown = preview ? rows.slice(0, 5) : rows;
  for (const [code] of shown) {
    const tr = table.insertRow();
    const c0 = tr.insertCell();
    c0.textContent = code;
    c0.className = 'code';
    const c1 = tr.insertCell();
    c1.className = 'val';
    cells.push(c1);
  }
  if (!preview) {
    const bar = document.createElement('label');
    bar.className = 'pick';
    bar.append('unit for row 4: ', select);
    select.addEventListener('change', () => {
      unit = select.value;
      read();
    });
    root.append(table, bar);
  } else root.append(table);
  el.append(root);

  const read = (): void => {
    shown.forEach(([, fn], i) => {
      const v = fn(box);
      (cells[i] as HTMLElement).textContent = typeof v === 'number' ? String(Math.round(v * 100) / 100) : String(v);
    });
  };

  const ctx = gsap.context(() => {
    gsap.set(box, { width: '30%' });
    gsap.to(box, {
      width: '90%',
      x: 8,
      y: 10,
      backgroundColor: '#f4a261',
      duration: 2.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      onUpdate: read,
    });
  }, el);
  read();

  return () => ctx.revert();
};

export default mount;
