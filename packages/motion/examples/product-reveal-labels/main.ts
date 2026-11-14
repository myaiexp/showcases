// A product launch reveal where three segments hang off one label that you can move
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="product">
      <div class="shoe"></div>
      <div class="info">
        <b class="name">Aero Runner</b>
        <span class="price">$129</span>
        <span class="badge">New</span>
        <span class="buy">Pre-order</span>
      </div>
    </div>`;

  const scope = scopeMotion(el, (s) => {
    let timeline: ReturnType<typeof animate> | undefined;
    const play = (revealAt: number): void => {
      timeline?.cancel();
      timeline = animate(
        [
          ['.shoe', { opacity: [0, 1], scale: [0.6, 1], rotate: [-20, 0] }, { duration: 0.7 }],
          // A label with its own `at`: the time is set here, not where it sits in the array.
          { name: 'reveal', at: revealAt },
          ['.name', { opacity: [0, 1], y: [10, 0] }, { duration: 0.4, at: 'reveal' }],
          // Offsets from the label: half a second after it, and a fifth of a second before it.
          ['.price', { opacity: [0, 1], y: [10, 0] }, { duration: 0.4, at: 'reveal+0.5' }],
          ['.badge', { scale: [0, 1] }, { type: 'spring', bounce: 0.5, visualDuration: 0.4, at: 'reveal-0.2' }],
          { name: 'cta', at: revealAt + 1.2 },
          ['.buy', { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.3, at: 'cta' }],
          // The card repeats: fade everything out after a pause.
          ...(preview ? ([['.product', { opacity: [1, 1, 0] }, { duration: 1.6, at: '+0.2' }]] as const) : []),
        ],
        { repeat: preview ? Infinity : 0 },
      );
    };
    play(preview ? 0.4 : 0.6);
    if (preview) return;

    const p = panel(el);
    const show = p.readout('label "reveal" at', '0.6s');
    let at = 0.6;
    p.slider('reveal at (s)', { min: 0, max: 1.5, step: 0.1, value: 0.6 }, (v) => {
      at = v;
      show(`${v.toFixed(1)}s`);
      s.run(() => play(at));
    });
    p.button('Replay', () => s.run(() => play(at)));
    hint(el, 'The name, price and badge are timed from the "reveal" label. Drag the slider and all three move together, because they point at the label, not at a clock time.');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
