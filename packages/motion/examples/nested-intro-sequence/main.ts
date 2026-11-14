// A small intro sequence, defined once and nested inside a page sequence with { sequence, at }
import { animate, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const PLACEMENTS = ['<', '<+0.4', '+0.2'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="page">
      <div class="nav"><i></i><i></i><i></i></div>
      <div class="intro"><div class="logo"></div><div class="tag">Hello, Orbit</div></div>
      <div class="cards"><i></i><i></i><i></i></div>
    </div>`;

  const scope = scopeMotion(el, (s) => {
    // The reusable intro. Its times are relative to wherever it is placed.
    const intro: AnimationSequence = [
      ['.logo', { scale: [0, 1], rotate: [-90, 0] }, { duration: 0.5 }],
      ['.tag', { opacity: [0, 1], x: [-16, 0] }, { duration: 0.4, at: 0.2 }],
    ];

    let timeline: ReturnType<typeof animate> | undefined;
    const play = (at: string): void => {
      timeline?.cancel();
      timeline = animate(
        [
          ['.nav i', { opacity: [0, 1], y: [-10, 0] }, { duration: 0.5 }],
          { sequence: intro, at },
          ['.cards i', { opacity: [0, 1], y: [20, 0] }, { duration: 0.4, at: '-0.1' }],
          ...(preview ? ([['.page', { opacity: [1, 1, 0] }, { duration: 1.4, at: '+0.2' }]] as const) : []),
        ],
        { repeat: preview ? Infinity : 0 },
      );
    };
    play(preview ? '<+0.4' : '<');
    if (preview) return;

    let at: string = '<';
    const p = panel(el);
    p.select('Intro placed at', PLACEMENTS, '<', (v) => s.run(() => play((at = v))));
    p.button('Replay', () => s.run(() => play(at)));
    hint(el, 'The intro is one array reused as a block. { sequence: intro, at: "<" } starts it with the nav bar; change the placement and the whole block moves.');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
