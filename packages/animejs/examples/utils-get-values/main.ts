// utils.get() reading one animated x three ways: raw string, converted unit, number without unit
import { animate, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el) => {
  const rows = [
    { name: "get($sq, 'x')", note: 'raw string with px' },
    { name: "get($sq, 'x', 'rem')", note: 'converted to rem' },
    { name: "get($sq, 'x', false)", note: 'number, unit removed' },
  ].map((r) => {
    const row = document.createElement('div');
    row.className = 'lane';
    const sq = document.createElement('div');
    sq.className = 'sq';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = r.name;
    const value = document.createElement('span');
    value.className = 'value';
    label.append(' -> ', value);
    row.append(label, sq);
    el.append(row);
    return { sq, value };
  });

  const [r0, r1, r2] = rows as [(typeof rows)[number], (typeof rows)[number], (typeof rows)[number]];
  const animation = animate(rows.map((r) => r.sq), {
    x: 200,
    duration: 2400,
    ease: 'inOutQuad',
    loop: true,
    alternate: true,
    onUpdate: () => {
      r0.value.textContent = String(utils.get(r0.sq, 'x'));
      r1.value.textContent = String(utils.get(r1.sq, 'x', 'rem'));
      r2.value.textContent = String(utils.get(r2.sq, 'x', false));
    },
  });

  return () => {
    animation.revert();
  };
};

export default mount;
