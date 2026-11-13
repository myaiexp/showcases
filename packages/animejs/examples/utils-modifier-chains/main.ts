// Each row spins a plain square beside one whose rotation passes through a utils modifier
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

interface Row {
  label: string;
  turns: number;
  modifier: (v: number) => number;
}

// A call without its value argument returns a chain-able function, usable as a modifier.
const ROWS: Row[] = [
  { label: 'snap(.25)', turns: 1, modifier: utils.snap(0.25) },
  { label: 'clamp(.25, .75)', turns: 1, modifier: utils.clamp(0.25, 0.75) },
  { label: 'wrap(-.25, .25)', turns: 1, modifier: utils.wrap(-0.25, 0.25) },
  { label: 'round(1)', turns: 1, modifier: utils.round(1) },
  { label: 'lerp(0, 12)', turns: 1, modifier: utils.lerp(0, 12) },
  { label: 'mapRange(0, 12, 0, 1)', turns: 12, modifier: utils.mapRange(0, 12, 0, 1) },
  { label: 'clamp(.2, .8).snap(.1)', turns: 1, modifier: utils.clamp(0.2, 0.8).snap(0.1) },
  { label: 'wrap(0, .5).round(1)', turns: 1, modifier: utils.wrap(0, 0.5).round(1) },
];

const mount: Mount = (el, { preview }) => {
  const rows = preview ? ROWS.slice(0, 4) : ROWS;
  const table = document.createElement('div');
  table.className = 'table';
  const anims: { revert(): unknown }[] = [];

  const duration = preview ? 2400 : 3000;
  for (const row of rows) {
    const line = document.createElement('div');
    line.className = 'line';
    const label = document.createElement('code');
    label.textContent = row.label;
    const plain = document.createElement('div');
    plain.className = 'sq plain';
    const mod = document.createElement('div');
    mod.className = 'sq mod';
    line.append(label, plain, mod);
    table.append(line);
    const t = `${row.turns}turn`;
    anims.push(
      animate(plain, { rotate: t, duration: duration * row.turns, loop: true, ease: 'inOut' }),
      animate(mod, { rotate: t, modifier: row.modifier, duration: duration * row.turns, loop: true, ease: 'inOut' }),
    );
  }
  if (!preview) {
    const head = document.createElement('div');
    head.className = 'line head';
    for (const t of ['modifier', 'plain', 'modified']) {
      const s = document.createElement('span');
      s.textContent = t;
      head.append(s);
    }
    table.prepend(head);
  }
  el.append(table);

  return () => anims.forEach((a) => a.revert());
};

export default mount;
