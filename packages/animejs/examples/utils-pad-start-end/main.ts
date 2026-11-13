// utils.padStart() and utils.padEnd() chained after round() as animation modifiers
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const mkLcd = (name: string) => {
    const wrap = document.createElement('div');
    wrap.className = 'lcd-wrap';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = name;
    const lcd = document.createElement('pre');
    lcd.className = 'lcd';
    lcd.textContent = '0';
    wrap.append(label, lcd);
    el.append(wrap);
    return { label, lcd };
  };
  const start = mkLcd('');
  const end = mkLcd('');

  let total = 6;
  let pad = '-';
  let anims: ReturnType<typeof animate>[] = [];
  const build = (): void => {
    anims.forEach((a) => a.revert());
    start.label.textContent = `round(0).padStart(${total}, '${pad}')`;
    end.label.textContent = `round(3).padEnd(${total}, '${pad}')`;
    anims = [
      animate(start.lcd, {
        innerHTML: [0, 10000],
        modifier: utils.round(0).padStart(total, pad),
        duration: 6000,
        ease: 'linear',
        loop: true,
      }),
      animate(end.lcd, {
        innerHTML: [0, 1],
        modifier: utils.round(3).padEnd(total, pad),
        duration: 6000,
        ease: 'linear',
        loop: true,
      }),
    ];
  };
  build();

  if (!preview) {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const len = document.createElement('input');
    len.type = 'range';
    len.min = '3';
    len.max = '10';
    len.value = String(total);
    const txt = document.createElement('input');
    txt.type = 'text';
    txt.maxLength = 1;
    txt.value = pad;
    txt.className = 'pad-input';
    const lenLabel = document.createElement('span');
    const sync = (): void => {
      total = +len.value;
      pad = txt.value || '-';
      lenLabel.textContent = `totalLength ${total}`;
      build();
    };
    len.addEventListener('input', sync);
    txt.addEventListener('input', sync);
    panel.append(lenLabel, len, 'padString', txt);
    el.append(panel);
    lenLabel.textContent = `totalLength ${total}`;
  }

  return () => {
    anims.forEach((a) => a.revert());
  };
};

export default mount;
