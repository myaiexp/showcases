// A plain skewX next to the same skewX with compensatedSkew applied through onUpdate
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import { compensatedSkew } from './compensatedSkew.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const row = h('div', 'row', '', root);
  const mkCell = (label: string): HTMLElement => {
    const cell = h('div', 'cell', '', row);
    const slot = h('div', 'slot', '', cell);
    h('div', 'ghost', '', slot);
    const box = h('div', 'box', 'A', slot);
    h('span', 'tag', label, cell);
    return box;
  };
  const plain = mkCell('skewX');
  const comp = mkCell('skewX + compensatedSkew');
  if (!preview) {
    h('p', 'readout', 'The dashed outline is the unskewed box. Plain skewX keeps scaleX/scaleY, so the box gets wider; the compensated one squeezes scaleY by cos(skew), the way GSAP 2 did.', root);
  }

  const ctx = gsap.context(() => {
    const vars = { skewX: 55, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true };
    gsap.fromTo(plain, { skewX: -55 }, vars);
    gsap.fromTo(comp, { skewX: -55 }, { ...vars, onUpdate: compensatedSkew });
  }, el);

  return () => ctx.revert();
};

export default mount;
