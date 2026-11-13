// utils.degToRad() and utils.radToDeg(): each clock drives a twin in the other unit
import { animate, createAnimatable, utils } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const mk = (name: string) => {
    const col = document.createElement('div');
    col.className = 'col';
    const clock = document.createElement('div');
    clock.className = 'clock';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = name;
    col.append(clock, label);
    return { col, clock };
  };
  const a = mk('degrees (source)');
  const b = mk('radians (degToRad)');
  const c = mk('radians (source)');
  const d = mk('degrees (radToDeg)');
  const rowA = document.createElement('div');
  rowA.className = 'pair';
  rowA.append(a.col, b.col);
  const rowB = document.createElement('div');
  rowB.className = 'pair';
  rowB.append(c.col, d.col);
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.append(rowA, rowB);
  el.append(stage);
  const readout = document.createElement('pre');
  readout.className = 'readout';
  if (!preview) el.append(readout);

  const radTwin = createAnimatable(b.clock, { rotate: { unit: 'rad', duration: 0 } });
  const degTwin = createAnimatable(d.clock, { rotate: { unit: 'deg', duration: 0 } });
  const lines = ['', ''];
  const paint = (): void => { readout.textContent = lines.join('\n'); };
  const toRad2 = utils.degToRad().round(2);
  const toDeg2 = utils.radToDeg().round(2);

  const degAnim = animate(a.clock, {
    rotate: '360deg',
    ease: 'linear',
    duration: 5000,
    loop: true,
    onUpdate: () => {
      const degrees = utils.get(a.clock, 'rotate', false) as number;
      radTwin.rotate?.(utils.degToRad(degrees));
      lines[0] = `degToRad(${utils.roundPad(degrees, 1)}) = ${utils.roundPad(utils.degToRad(degrees), 4)}`
        + `   chained .round(2): ${toRad2(degrees)}`;
      paint();
    },
  });
  const radAnim = animate(c.clock, {
    rotate: Math.PI * 2 + 'rad',
    ease: 'linear',
    duration: 5000,
    loop: true,
    onUpdate: () => {
      const radians = utils.get(c.clock, 'rotate', false) as number;
      degTwin.rotate?.(utils.radToDeg(radians));
      lines[1] = `radToDeg(${utils.roundPad(radians, 3)}) = ${utils.roundPad(utils.radToDeg(radians), 2)}`
        + `   chained .round(2): ${toDeg2(radians)}`;
      paint();
    },
  });

  return () => {
    degAnim.revert();
    radAnim.revert();
    radTwin.revert();
    degTwin.revert();
  };
};

export default mount;
