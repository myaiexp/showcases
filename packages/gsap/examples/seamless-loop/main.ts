// A row of cards that loops forever with the horizontalLoop helper; next, previous and click-to-jump
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import { horizontalLoop } from './horizontalLoop.ts';
import './style.css';

const COLORS = ['var(--accent)', 'var(--cyan)', 'var(--green)', 'var(--orange)', 'var(--purple)', 'var(--red)'];

const mount: Mount = (el, { preview }) => {
  const root = h('div', preview ? 'root compact' : 'root', '', el);
  const view = h('div', 'viewport', '', root);
  const track = h('div', 'track', '', view);
  const cards = COLORS.map((c, i) => {
    const card = h('div', 'card', String(i + 1), track);
    card.style.background = c;
    return card;
  });
  const readout = h('p', 'readout', '', root);
  const controls = h('div', 'controls', '', root);

  const ctx = gsap.context((self) => {
    // Preview: loops by itself. Full view: paused, driven by next/previous/toIndex (tweenTo).
    const loop = horizontalLoop(cards, { paused: !preview, speed: preview ? 0.8 : 1, paddingRight: 12 });
    if (preview) return;
    const show = (): void => {
      readout.textContent = `loop.current() = ${loop.current()}  (times: ${loop.times.map((t) => t.toFixed(2)).join(', ')})`;
    };
    const opts = { duration: 1, ease: 'power1.inOut' };
    // DOM handlers run later and outside the context, so tweens are made through ctx.add
    btn('previous()', () => { self.add(() => loop.previous(opts)); show(); }, controls);
    btn('next()', () => { self.add(() => loop.next(opts)); show(); }, controls);
    cards.forEach((card, i) =>
      card.addEventListener('click', () => { self.add(() => loop.toIndex(i, opts)); show(); }),
    );
    show();
    readout.title = 'Click a card to bring it to the first slot';
  }, el);
  if (preview) readout.remove();
  if (preview) controls.remove();

  return () => ctx.revert();
};

export default mount;
