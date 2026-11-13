// utils.roundPad(): fixed decimal length for a tweened number, plus fixed samples
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const lcd = document.createElement('pre');
  lcd.className = 'lcd';
  lcd.textContent = '0';
  const label = document.createElement('div');
  label.className = 'label';
  el.append(label, lcd);
  const table = document.createElement('pre');
  table.className = 'table';
  if (!preview) el.append(table);

  let decimals = 3;
  let anim: ReturnType<typeof animate> | null = null;
  const build = (): void => {
    anim?.revert();
    label.textContent = `modifier: utils.roundPad(${decimals})`;
    anim = animate(lcd, {
      innerHTML: [0, 8.1],
      modifier: utils.roundPad(decimals),
      duration: 5000,
      ease: 'linear',
      loop: true,
      alternate: true,
    });
    const pad = utils.roundPad(decimals);
    const snapPad = utils.snap(50).roundPad(2);
    table.textContent = [90.12345, 120, 15.9].map((n) => `roundPad(${n}, ${decimals}) -> '${pad(n)}'`).join('\n')
      + `\nsnap(50).roundPad(2)(123.456) -> '${snapPad(123.456)}'`;
  };
  build();

  if (!preview) {
    const panel = document.createElement('label');
    panel.className = 'panel';
    const text = document.createElement('span');
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '0';
    range.max = '6';
    range.value = String(decimals);
    const sync = (): void => {
      decimals = +range.value;
      text.textContent = `decimalLength ${decimals}`;
      build();
    };
    range.addEventListener('input', sync);
    text.textContent = `decimalLength ${decimals}`;
    panel.append(text, range);
    el.append(panel);
  }

  return () => {
    anim?.revert();
  };
};

export default mount;
