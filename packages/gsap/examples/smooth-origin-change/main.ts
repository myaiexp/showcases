// Two boxes shrink from the bottom-right, then the origin moves to top-left: one jumps, one stays put
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import { smoothOriginChange } from './smoothOriginChange.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const row = h('div', 'row', '', root);
  const mkCell = (label: string): HTMLElement => {
    const cell = h('div', 'cell', '', row);
    const slot = h('div', 'slot', '', cell);
    const box = h('div', 'box', '', slot);
    h('span', 'tag', label, cell);
    return box;
  };
  const naive = mkCell("gsap.set({ transformOrigin })");
  const smooth = mkCell('smoothOriginChange()');
  const readout = h('p', 'readout', '', root);
  if (preview) readout.remove();

  const ctx = gsap.context((self) => {
    const both = [naive, smooth];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
    tl.call(() => { readout.textContent = '1. scale to 0.5 around "right bottom"'; })
      .to(both, { scale: 0.5, transformOrigin: 'right bottom', duration: 1.4, ease: 'sine.out' })
      .call(() => {
        readout.textContent = '2. origin changes to "left top"';
        // These helpers call gsap.set(), so run them outside the context's record.
        self.ignore(() => {
          gsap.set(naive, { transformOrigin: 'left top' }); // left: the box jumps
          smoothOriginChange(smooth, 'left top'); // right: compensated, no jump
        });
      })
      .to({}, { duration: 0.9 }) // hold so the jump is easy to see
      .call(() => { readout.textContent = '3. scale back to 1 around the new origin'; })
      .to(both, { scale: 1, duration: 1.4, ease: 'sine.inOut' })
      .to(both, { x: 0, y: 0, duration: 0.8, ease: 'power2.inOut' }, '+=0.3')
      .call(() => self.ignore(() => { gsap.set(both, { clearProps: 'transform,transformOrigin' }); }));
  }, el);

  return () => ctx.revert();
};

export default mount;
