// One sequence animating an HTML card, a motion value that drives a colour and a plain object shown as text
import { animate, motionValue, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="stats">
      <div class="card">
        <span class="num">0</span><span class="unit">visitors today</span>
        <div class="swatch"></div>
      </div>
      <ol class="legend"><li>HTML element</li><li>motion value</li><li>plain object</li></ol>
    </div>`;
  const num = el.querySelector<HTMLElement>('.num')!;
  const swatch = el.querySelector<HTMLElement>('.swatch')!;

  // A motion value holds one changing value. Here it holds a colour, and a listener paints it.
  const colour = motionValue('#475569');
  const paint = colour.on('change', (v) => {
    swatch.style.background = String(v);
  });
  const counter = { visitors: 0 };

  const scope = scopeMotion(el, () => {
    const sequence: AnimationSequence = [
      ['.card', { opacity: [0, 1], y: [16, 0] }, { duration: 0.5 }],
      // A motion value is a subject like any other: its colour keyframes are tweened here.
      [colour, ['#475569', '#22c55e'], { duration: 0.8 }],
      // A plain object: its `visitors` property is animated, and onUpdate below renders it.
      [counter, { visitors: [0, 1280] }, { duration: 1.2, ease: 'easeOut', at: '<' }],
    ];
    if (preview) sequence.push(['.card', { opacity: [1, 1, 0] }, { duration: 1.4, at: '+0.2' }]);
    const timeline = animate(sequence, {
      repeat: preview ? Infinity : 0,
      onUpdate: () => {
        num.textContent = Math.round(counter.visitors).toLocaleString('en-US');
      },
    });
    if (preview) return;
    const p = panel(el);
    p.button('Replay', () => {
      timeline.time = 0;
      timeline.play();
    });
    hint(el, 'Three kinds of subject in one array: a DOM selector, a motion value (colour swatch) and a plain object (the number). They share the one timeline and scrub together.');
    return () => p.dispose();
  });

  return () => {
    scope.cancel();
    paint();
    colour.destroy();
  };
};

export default mount;
